import {PrismaClient} from '@prisma/client';
import eventsSoftDeleteService from './eventsSoftDeleteService';
const prisma = new PrismaClient();

export const extendPrismaClient = () => {
  return prisma
    .$extends(eventsSoftDeleteService);
};

export type ExtendedPrismaClient = ReturnType<typeof extendPrismaClient>;
