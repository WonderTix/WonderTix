const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Import season tickets from YAML file to database
 */
async function seedSeasonTickets() {
  try {
    const seasonTicketsCount = await prisma.seasontickets.count();
    if (seasonTicketsCount > 0) {
      console.log('Season Tickets table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/seasontickets.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      seasonticketid: item.seasonticketid,
      orderitemid_fk: item.orderitemid_fk,
      eventticketid_fk: item.eventticketid_fk,
      eventid_fk: item.eventid_fk,
      seasontickettypeid_fk: item.seasontickettypeid_fk,
      ticketwasswapped: item.ticketwasswapped === 'true',
    }));

    await prisma.seasontickets.createMany({
      data: preparedData,
    });

    console.log('Season Tickets seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedSeasonTickets;
