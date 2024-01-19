import {Prisma} from '@prisma/client';


export default Prisma.defineExtension((prisma) => {
  return prisma.$extends({
    name: 'eventsAvailableSeatsService',
    result: {
      eventinstances: {
        soldseats: {
          needs: {eventinstanceid: true},
          compute({eventinstanceid}) {
            return () => prisma.eventtickets.aggregate({
              where: {
                eventinstanceid_fk: eventinstanceid,
                singleticketid_fk: {not: null},
              },
              _count: {
                eventticketid: true,
              },
            });
          },
        },
      },
    },
  });
});
