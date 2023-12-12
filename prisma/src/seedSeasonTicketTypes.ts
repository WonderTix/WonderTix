import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import season ticket types from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedSeasonTicketTypes(prisma: PrismaClient) {
  try {
    const seasonTicketTypesCount = await prisma.seasontickettype.count();
    if (seasonTicketTypesCount > 0) {
      console.log('Season Ticket Types table already seeded.');
      return;
    }

    const yamlDataPath = process.env.SEED_DATA || './yaml-seeder-data';
    const yamlData = fs.readFileSync(`${yamlDataPath}/seasontickettypes.yaml`, 'utf8');
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
