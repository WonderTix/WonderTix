import {Prisma} from '@prisma/client';

export default Prisma.defineExtension((prisma) => {
  return prisma.$extends({
    name: 'Events Soft Delete',
    model: {
      eventinstances: {
        async softDelete(eventInstanceID: number) {
          return await prisma.eventinstances.update({
            where: {
              eventinstanceid: eventInstanceID,
            },
            data: {
              deletedat: new Date(),
            },
          });
        },
        async softDeleteMany(eventInstanceIDs: number[]) {
          return await prisma.eventinstances.updateMany({
            where: {
              eventinstanceid: {in: eventInstanceIDs},
            },
            data: {
              deletedat: new Date(),
            },
          });
        },
        async restore(eventInstanceID: number) {
          return await prisma.eventinstances.update({
            where: {
              eventinstanceid: eventInstanceID,
            },
            data: {
              deletedat: null,
            },
          });
        },
        async restoreMany(eventInstanceIDs: number[]) {
          return await prisma.eventinstances.updateMany({
            where: {
              eventinstanceid: {in: eventInstanceIDs},
            },
            data: {
              deletedat: null,
            },
          });
        },
      },
      events: {
        async softDelete(eventID: number) {
          return (
            await prisma.$transaction([
              prisma.events.update({
                where: {
                  eventid: eventID,
                },
                data: {
                  deletedat: new Date(),
                },
              }),
              prisma.eventinstances.updateMany({
                where: {
                  eventid_fk: eventID,
                },
                data: {
                  deletedat: new Date(),
                },
              }),
            ])
          )[0];
        },
        async softDeleteMany(eventIDs: number[]) {
          return (
            await prisma.$transaction([
              prisma.events.updateMany({
                where: {
                  eventid: {in: eventIDs},
                },
                data: {
                  deletedat: new Date(),
                },
              }),
              prisma.eventinstances.updateMany({
                where: {
                  eventid_fk: {in: eventIDs},
                },
                data: {
                  deletedat: new Date(),
                },
              }),
            ])
          )[0];
        },
        async restore(eventID: number) {
          return await prisma.events.update({
            where: {
              eventid: eventID,
            },
            data: {
              deletedat: null,
            },
          });
        },
        async restoreMany(eventIDs: number[]) {
          return await prisma.events.updateMany({
            where: {
              eventid: {in: eventIDs},
            },
            data: {
              deletedat: null,
            },
          });
        },
      },
    },
    query: {
      eventinstances: {
        async findUnique({args}) {
          args.where = {deletedat: null, ...args.where};
          return await prisma.eventinstances.findFirst(args);
        },
        async findFirst({args, query}) {
          args.where = {deletedat: null, ...args.where};
          return await query(args);
        },
        async findMany({args, query}) {
          args.where = {deletedat: null, ...args.where};
          return await query(args);
        },
        async update({args}) {
          args.where = {deletedat: null, ...args.where};
          return await prisma.eventinstances.updateMany(args);
        },
        async updateMany({args, query}) {
          args.where = {deletedat: null, ...args.where};
          return await query(args);
        },
      },
      events: {
        async findUnique({args}) {
          args.where = {deletedat: null, ...args.where};
          if (args.include?.eventinstances) {
            args.include.eventinstances = {
              ...(typeof args.include.eventinstances === 'object' && args.include.eventinstances),
              where: {
                ...(typeof args.include.eventinstances === 'object' && args.include.eventinstances.where),
                deletedat: null,
              },
            };
          }
          return await prisma.events.findFirst(args);
        },
        async findFirst({args, query}) {
          args.where = {deletedat: null, ...args.where};
          if (args.include?.eventinstances) {
            args.include.eventinstances = {
              ...(typeof args.include.eventinstances === 'object' && args.include.eventinstances),
              where: {
                ...(typeof args.include.eventinstances === 'object' && args.include.eventinstances.where),
                deletedat: null,
              },
            };
          }
          return query(args);
        },
        async findMany({args, query}) {
          args.where = {deletedat: null, ...args.where};
          if (args.include?.eventinstances) {
            args.include.eventinstances = {
              ...(typeof args.include.eventinstances === 'object' && args.include.eventinstances),
              where: {
                ...(typeof args.include.eventinstances === 'object' && args.include.eventinstances.where),
                deletedat: null,
              },
            };
          }
          return query(args);
        },
        async update({args}) {
          args.where = {deletedat: null, ...args.where};
          if (args.include?.eventinstances) {
            args.include.eventinstances = {
              ...(typeof args.include.eventinstances === 'object' && args.include.eventinstances),
              where: {
                ...(typeof args.include.eventinstances === 'object' && args.include.eventinstances.where),
                deletedat: null,
              },
            };
          }
          const {where, ...everythingElse} = args;
          const event = await prisma.events.findFirst({where});
          if (!event) return null;
          return await prisma.events.update({where: {eventid: event.eventid}, ...everythingElse});
        },
        async updateMany({args, query}) {
          args.where = {deletedat: null, ...args.where};
          return query(args);
        },
      },
    },
  });
});
