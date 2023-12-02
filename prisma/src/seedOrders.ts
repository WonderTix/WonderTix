import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

import parseTime from './../src/parseTime';

/**
 * Import orders from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedOrders(prisma: PrismaClient) {
  try {
    const eventTicketsCount = await prisma.orders.count();
    if (eventTicketsCount > 0) {
      console.log('Orders table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/orders.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      orderid: item.orderid,
      contactid_fk: item.contactid_fk,
      orderdate: item.orderdate,
      ordertime: parseTime(item.ordertime),
      discountid_fk: item.discountid_fk,
      payment_intent: item.payment_intent,
      refund_intent: item.refund_intent,
      ordertotal: parseFloat(item.ordertotal.replace('$', '')),
    }));

    await prisma.orders.createMany({
      data: preparedData,
    });

    console.log('Orders seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedOrders;
