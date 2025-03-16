import { inputObjectType } from 'nexus';

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
