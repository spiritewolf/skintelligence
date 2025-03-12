import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { setCookie } from 'nookies';
import { Context } from '../context';
const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'super-secret-key';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('username');
    t.nullable.string('email');
    t.nonNull.list.nonNull.field('sessions', { type: Session });
  },
});

export const Session = objectType({
  name: 'Session',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.id('userId');
    t.nonNull.string('token');
    t.nonNull.string('expiresAt');
  },
});

export const Questionnaire = objectType({
  name: 'Questionnaire',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.id('userId');
    t.nullable.list.nonNull.field('responses', { type: QuestionnaireResponse });
  },
});

export const QuestionnaireResponse = objectType({
  name: 'QuestionnaireResponse',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('questionId');
    t.nonNull.string('answer');
  },
});

export const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nullable.string('email');
    t.nonNull.string('username');
  },
});

export const UserWhereInput = inputObjectType({
  name: 'UserWhereInput',
  definition(t) {
    t.nonNull.id('id');
  },
});

// export const UserQueries = queryType({
//   definition(t) {
//     // 'me' query returns the current authenticated user.
//     t.field('getUser', {
//       type: User,
//       args: { where: nonNull(UserWhereInput) },
//       resolve: async (_parent, { where }, ctx: Context) => {
//         if (!ctx.session?.email) {
//           throw new Error('Not authenticated');
//         }
//         return await ctx.prismaDb.user.findUniqueOrThrow({
//           where,
//         });
//       },
//     });
//   },
// });

export const UserQueries = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: async (_parent, _args, ctx) => {
        return ctx.prismaDb.user.findMany();
      },
    });
    t.field('user', {
      type: User,
      args: { where: nonNull(UserWhereInput) },
      resolve: async (_parent, { where }, ctx: Context) => {
        // if (!ctx.session?.email) {
        //   throw new Error('Not authenticated');
        // }
        const user = await ctx.prismaDb.user.findUnique({ where });
        return user;
      },
    });
  },
});

export const UserMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: nonNull(User),
      args: { data: nonNull(CreateUserInput) },
      resolve: async (_parent, { data }, { prismaDb, res }: Context) => {
        const user = await prismaDb.user.create({ data });
        const rawToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
          expiresIn: '1d',
        });

        const hashedToken = await bcrypt.hash(rawToken, 10);

        await prismaDb.session.create({
          data: {
            userId: user.id,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 86400000),
          },
        });

        setCookie({ res }, 'session_token', rawToken, {
          httpOnly: true,
          maxAge: 86400,
          path: '/',
        });

        return user;
      },
    });
  },
});
