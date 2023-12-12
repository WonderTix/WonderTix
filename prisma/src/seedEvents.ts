import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import events from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedEvents(prisma: PrismaClient) {
  try {
    const eventsCount = await prisma.events.count();
    if (eventsCount > 0) {
      console.log('Events table already seeded.');
      return;
    }

    const yamlDataPath = process.env.SEED_DATA || './yaml-seeder-data';
    const yamlData = fs.readFileSync(`${yamlDataPath}/events.yaml`, 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      eventid: item.eventid,
      seasonid_fk: item.seasonid_fk,
      eventname: item.eventname,
      eventdescription: item.eventdescription,
      active: item.active,
      seasonticketeligible: item.seasonticketeligible,
      imageurl: item.imageurl,
    }));

    await prisma.events.createMany({
      data: preparedData,
    });

    console.log('Events seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedEvents;
