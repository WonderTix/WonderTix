import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import ticket restrictions from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedTicketRestrictions(prisma: PrismaClient) {
  try {
    const ticketResCount= await prisma.ticketrestrictions.count();
    const ticketTypes = new Map((await prisma.tickettype.findMany({})).map((type) => [type.tickettypeid, type]));
    const eventInstances = await prisma.eventinstances.findMany({});
    const evenInstanceMap = new Map<number, any>();
    if (ticketResCount > 0) {
      console.log('Ticket Restrictions table already seeded.');
      return;
    } else if (ticketTypes.size === 0) {
      console.log('Ticket types have not been seeded');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/ticketrestrictions.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);
    const queryBatch: any[] = [];
    eventInstances.forEach((instance) => {
      const type = ticketTypes.get(instance.defaulttickettype ?? 1);
      evenInstanceMap.set(instance.eventinstanceid, instance);
      if (!type) return;
      queryBatch.push(prisma.ticketrestrictions.create({
        data: {
          eventinstanceid_fk: instance.eventinstanceid,
          tickettypeid_fk: type.tickettypeid,
          ticketlimit: instance.totalseats ?? 100,
          price: type.price,
          concessionprice: type.concessions,
          eventtickets: {
            create: Array(instance.totalseats ?? 100).fill({
              eventinstanceid_fk: instance.eventinstanceid,
            }),
          },
        },
      }));
    });
    data.forEach((item) => {
      const type = ticketTypes.get(+item.tickettypeid_fk);
      const instance = evenInstanceMap.get(+item.eventinstanceid_fk);
      if (!instance || !type || type.tickettypeid === instance.defaulttickettype) return;
      queryBatch.push(prisma.ticketrestrictions.create({
        data: {
          eventinstanceid_fk: +item.eventinstanceid_fk,
          tickettypeid_fk: item.tickettypeid_fk,
          ticketlimit: Math.min(item.ticketlimit, instance.totalseats),
          price: type.price,
          concessionprice: type.concessions,
          eventtickets: {
            create: Array(Math.min(item.ticketlimit, instance.totalseats)).fill({
              eventinstanceid_fk: item.eventinstanceid_fk,
            }),
          },
        },
      }));
    });

    await prisma.$transaction(queryBatch);
    console.log('Ticket Restrictions seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedTicketRestrictions;
