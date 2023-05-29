const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Import season ticket types from YAML file to database
 */
async function seedSeasonTicketTypes() {
  try {
    const seasonTicketTypesCount = await prisma.seasontickettype.count();
    if (seasonTicketTypesCount > 0) {
      console.log('Season Ticket Types table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/seasontickettypes.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      seasontickettypeid: item.seasontickettypeid,
      description: item.description,
      price: parseFloat(item.price.replace('$', '')),
    }));

    await prisma.seasontickettype.createMany({
      data: preparedData,
    });

    console.log('Season Ticket Types seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedSeasonTicketTypes;
