const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Import events from YAML file to database
 */
async function seedDiscounts() {
  try {
    const discountsCount = await prisma.discounts.count();
    if (discountsCount > 0) {
      console.log('Discounts table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/discounts.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      discountid: item.discountid,
      code: item.code,
      amount: item.amount,
      percent: item.percent,
      startdate: item.startdate,
      enddate: item.enddate,
      tickettypeid_fk: item.tickettypeid,
      createdby_fk: item.createdby,
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
