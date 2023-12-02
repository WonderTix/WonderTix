import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import seasons from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedSeasons(prisma: PrismaClient) {
  try {
    const seasonsCount = await prisma.seasons.count();
    if (seasonsCount > 0) {
      console.log('Seasons table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./yaml-seeder-data/seasons.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      seasonid: item.seasonid,
      name: item.name,
      startdate: item.startdate,
      enddate: item.enddate,
      imageurl: item.imageurl,
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
