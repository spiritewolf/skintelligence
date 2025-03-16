import { Context } from '@skintelligence/backend/context';
import { User } from '@skintelligence/backend/types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { FieldResolver } from 'nexus';
import { setCookie } from 'nookies';

const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'super-secret-key';

export const getUserResolver: FieldResolver<'Query', 'user'> = async (
  _parent,
  { where },
  ctx: Context
): Promise<User> => {
  return await ctx.prismaDb.user.findUniqueOrThrow({ where });
};

export const createUserResolver: FieldResolver<
  'Mutation',
  'createUser'
> = async (_parent, { data }, { prismaDb, res }: Context): Promise<User> => {
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
};
