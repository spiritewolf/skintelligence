import { PrismaClient } from '@prisma/client';
import { SkintelligenceDb } from '@skintelligence/backend/client';

import { NextApiRequest, NextApiResponse } from 'next';
import { getToken, JWT } from 'next-auth/jwt';

export type Context = {
  prismaDb: PrismaClient;
  session: JWT | null;
};

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
  })) as JWT | null;
  return {
    prismaDb: SkintelligenceDb,
    session: token,
  };
}
