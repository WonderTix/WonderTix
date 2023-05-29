const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Import ticket types from YAML file to database
 */
async function seedTicketTypes() {
  try {
    const tickettypeCount = await prisma.tickettype.count();
    if (tickettypeCount > 0) {
      console.log('Ticket Types table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/tickettype.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      tickettypeid: item.tickettypeid,
      description: item.description,
      price: parseFloat(item.price.replace('$', '')),
      concessions: parseFloat(item.concessions.replace('$', '')),
      deprecated: item.deprecated === 'true',
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
