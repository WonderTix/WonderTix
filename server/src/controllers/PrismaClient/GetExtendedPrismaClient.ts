import {PrismaClient} from '@prisma/client';
import eventsSoftDeleteService from './eventsSoftDeleteService';
import eventsAvailableSeatsService from './eventsAvailableSeatsService';
export const extendPrismaClient = () => {
  return new PrismaClient()
      .$extends(eventsSoftDeleteService)
      .$extends(eventsAvailableSeatsService);
};

export type ExtendedPrismaClient = ReturnType<typeof extendPrismaClient>;
