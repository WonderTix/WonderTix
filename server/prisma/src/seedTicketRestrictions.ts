import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import ticket restrictions from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedTicketRestrictions(prisma: PrismaClient) {
  try {
    const tickettypeCount = await prisma.ticketrestrictions.count();
    if (tickettypeCount > 0) {
      console.log('Ticket Restrictions table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/ticketrestrictions.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      ticketrestrictionsid: item.ticketrestrictionsid,
      eventinstanceid_fk: item.eventinstanceid_fk,
      tickettypeid_fk: item.tickettypeid_fk,
      ticketlimit: item.ticketlimit,
      ticketssold: item.ticketssold,
    }));

    await prisma.ticketrestrictions.createMany({
      data: preparedData,
    });

    console.log('Ticket Restrictions seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedTicketRestrictions;
