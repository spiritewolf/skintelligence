import { extendType, inputObjectType, nonNull, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('username');
  },
});

export const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nullable.string('email');
    t.nonNull.string('username');
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
  },
});

export const UserMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: nonNull('User'),
      args: { data: nonNull(CreateUserInput) },
      resolve: async (_parent, args, ctx) => {
        return ctx.prismaDb.user.create({ data: args });
      },
    });
  },
});

// export const UserMutation = mutationType({
//   definition(t) {
//     t.field('createUser', {
//       type: nonNull('User'),
//       args: { title: 'String', content: 'String', authorId: 'String' },
//       resolve: async (_parent, args, ctx) => {
//         return ctx.prisma.post.create({ data: args });
//       },
//     });
//   },
// });
