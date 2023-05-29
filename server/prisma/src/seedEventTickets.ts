const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Import event tickets from YAML file to database
 */
async function seedEventTickets() {
  try {
    const eventTicketsCount = await prisma.eventtickets.count();
    if (eventTicketsCount > 0) {
      console.log('Event Tickets table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/eventtickets.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      eventticketid: item.eventticketid,
      eventinstanceid_fk: item.eventinstanceid_fk,
      tickettypeid_fk: item.tickettypeid_fk,
      purchased: item.purchased === 'true',
      redeemed: item.redeemed === 'true',
      redeemed_ts: item.redeemed_ts,
      donated: item.donated === 'true',
    }));

    await prisma.eventtickets.createMany({
      data: preparedData,
    });

    console.log('Events Tickets seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedEventTickets;
