import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import events from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedDiscounts(prisma: PrismaClient) {
  try {
    const discountsCount = await prisma.discounts.count();
    if (discountsCount > 0) {
      console.log('Discounts table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/discounts.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      code: item.code,
      active: item.active,
      amount: item.amount,
      percent: item.percent,
      tickettypeid_fk: item.tickettypeid,
      usagelimit: item.usagelimit,
      min_tickets: item.min_tickets,
      min_events: item.min_events,
    }));

    await prisma.discounts.createMany({
      data: preparedData,
    });

    console.log('Discounts seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedDiscounts;
