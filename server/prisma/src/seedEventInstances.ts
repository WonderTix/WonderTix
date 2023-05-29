const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

import parseDateTime from './../src/parseDateTime';

/**
 * Import event instances from YAML file to database
 */
async function seedEventInstances() {
  try {
    const eventinstancesCount = await prisma.eventinstances.count();
    if (eventinstancesCount > 0) {
      console.log('Event Instances table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/eventinstances.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      eventinstanceid: item.eventinstanceid,
      eventid_fk: item.eventid_fk,
      eventdate: item.eventdate,
      eventtime: parseDateTime(item.eventtime),
      salestatus: item.salestatus === 'true',
      totalseats: item.totalseats,
      availableseats: item.availableseats,
      purchaseuri: item.purchaseuri,
      ispreview: item.ispreview === 'true',
      defaulttickettype: item.defaulttickettype,
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
