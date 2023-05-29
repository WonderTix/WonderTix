import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import single tickets from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedSingleTickets(prisma: PrismaClient) {
  try {
    const singleTicketsCount = await prisma.singletickets.count();
    if (singleTicketsCount > 0) {
      console.log('Single Tickets table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/singletickets.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      singleticketid: item.singleticketid,
      eventticketid_fk: item.eventticketid_fk,
      orderitemid_fk: item.orderitemid_fk,
      ticketwasswapped: item.ticketwasswapped === 'true',
    }));

    await prisma.singletickets.createMany({
      data: preparedData,
    });

    console.log('Single Tickets seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedSingleTickets;
