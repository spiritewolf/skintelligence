import { extendType, nonNull, objectType } from 'nexus';
import { CreateUserInput, UserWhereInput } from './input';
import { createUserResolver, getUserResolver } from './resolvers';

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
      resolve: getUserResolver,
    });
  },
});

export const UserMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: nonNull(User),
      args: { data: nonNull(CreateUserInput) },
      resolve: createUserResolver,
    });
  },
});
