import { PrismaClient } from '@prisma/client';
import { SkintelligenceDb } from '../prisma/client';

export type Context = {
  prismaDb: PrismaClient;
};

export function createContext(): Context {
  return { prismaDb: SkintelligenceDb };
}
