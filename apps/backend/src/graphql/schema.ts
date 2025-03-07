import { mutationType, objectType, queryType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('username');
  },
});

export const UserQuery = queryType({
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: async (_parent, _args, ctx) => {
        return ctx.prisma.user.findMany();
      },
    });
  },
});

// export const PostMutation = mutationType({
//   definition(t) {
//     t.field('createPost', {
//       type: 'Post',
//       args: { title: 'String', content: 'String', authorId: 'String' },
//       resolve: async (_parent, args, ctx) => {
//         return ctx.prisma.post.create({ data: args });
//       },
//     });
//   },
// });
