import { Context } from '@skintelligence/backend/context';
import { Session, User } from '@skintelligence/backend/types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { FieldResolver } from 'nexus';
import { parseCookies, setCookie } from 'nookies';

const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'super-secret-key';

export const getUserResolver: FieldResolver<'Query', 'user'> = async (
  _parent,
  _args,
  { prismaDb, req }: Context
): Promise<User | null> => {
  try {
    const cookies = parseCookies({ req });
    if (!cookies.session_token) {
      return null;
    }

    const decoded = jwt.verify(cookies.session_token, SECRET_KEY);

    if (typeof decoded === 'string') {
      throw new Error('Failed to fetch user.');
    }
    return await prismaDb.user.findUniqueOrThrow({
      where: {
        id: decoded.userId,
      },
    });
  } catch (error) {
    console.error('Error in getUserResolver:', error);
    throw new Error('Failed to fetch user.');
  }
};

export const getUserSessionResolver: FieldResolver<'User', 'session'> = async (
  _parent,
  { where },
  { prismaDb }: Context
): Promise<Session | null> => {
  const session = await prismaDb.session.findFirst({
    where: {
      userId: _parent.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  });
  return session;
};

export const createUserResolver: FieldResolver<
  'Mutation',
  'createUser'
> = async (_parent, { data }, { prismaDb, res }: Context): Promise<User> => {
  try {
    const user = await prismaDb.user.create({ data });
    const rawToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    const hashedToken = await bcrypt.hash(rawToken, 10);

    await prismaDb.session.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour (60 * 60 * 1000 ms)
      },
    });

    setCookie({ res }, 'session_token', rawToken, {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
    });

    return user;
  } catch (error) {
    console.error('Error in createUserResolver:', error);
    throw new Error('Failed to create user.');
  }
};
