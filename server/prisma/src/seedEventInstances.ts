import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

import parseDateTime from './../src/parseDateTime';

/**
 * Import event instances from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedEventInstances(prisma: PrismaClient) {
  try {
    const eventinstancesCount = await prisma.eventinstances.count();
    if (eventinstancesCount > 0) {
      console.log('Event Instances table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/eventinstances.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      eventid_fk: item.eventid_fk,
      eventdate: item.eventdate,
      eventtime: parseDateTime(item.eventtime),
      salestatus: item.salestatus,
      totalseats: item.totalseats ?? 100,
      availableseats: item.totalseats ?? 100,
      purchaseuri: item.purchaseuri,
      ispreview: item.ispreview,
    }));

    await prisma.eventinstances.createMany({
      data: preparedData,
    });

    console.log('Events instances seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedEventInstances;
