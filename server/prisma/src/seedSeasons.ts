const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Import seasons from YAML file to database
 */
async function seedSeasons() {
  try {
    const seasonsCount = await prisma.seasons.count();
    if (seasonsCount > 0) {
      console.log('Seasons table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/seasons.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      seasonid: item.seasonid,
      name: item.name,
      startdate: item.startdate,
      enddate: item.enddate,
    }));

    await prisma.seasons.createMany({
      data: preparedData,
    });

    console.log('Seasons seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedSeasons;
