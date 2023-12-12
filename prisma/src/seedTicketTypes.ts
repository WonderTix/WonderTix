import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import ticket types from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedTicketTypes(prisma: PrismaClient) {
  try {
    const tickettypeCount = await prisma.tickettype.count();
    if (tickettypeCount > 0) {
      console.log('Ticket Types table already seeded.');
      return;
    }

    const yamlDataPath = process.env.SEED_DATA || './yaml-seeder-data';
    const yamlData = fs.readFileSync(`${yamlDataPath}/tickettype.yaml`, 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      tickettypeid: item.tickettypeid,
      description: item.description,
      price: parseFloat(item.price.replace('$', '')),
      concessions: parseFloat(item.concessions.replace('$', '')),
      deprecated: item.deprecated,
    }));

    await prisma.tickettype.createMany({
      data: preparedData,
    });

    console.log('Ticket Types seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedTicketTypes;
