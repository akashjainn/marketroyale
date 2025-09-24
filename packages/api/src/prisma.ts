import { PrismaClient } from '@prisma/client';
import { env } from './env';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Only create Prisma client if DATABASE_URL is available
function createPrismaClient() {
  if (!env.DATABASE_URL) {
    console.warn('DATABASE_URL not found, Prisma client will not be available');
    return null;
  }
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma;
}
