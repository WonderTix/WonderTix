import {PrismaClient} from '@prisma/client';
import eventsSoftDeleteService from './eventsSoftDeleteService';
export const extendPrismaClient = () => {
  return new PrismaClient()
      .$extends(eventsSoftDeleteService);
};

export type ExtendedPrismaClient = ReturnType<typeof extendPrismaClient>;
