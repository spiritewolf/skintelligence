import { PrismaClient } from '@prisma/client';
import { SkintelligenceDb } from '../prisma';

export type Context = {
  prismaDb: PrismaClient;
};

export function createContext(): Context {
  return { prismaDb: SkintelligenceDb };
}
