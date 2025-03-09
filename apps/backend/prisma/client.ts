import { PrismaClient } from '@prisma/client';

const dbUrl = process.env['DATABASE_URL'];

export const SkintelligenceDb: PrismaClient = new PrismaClient({
  datasources: {
    db: { url: dbUrl },
  },
});
