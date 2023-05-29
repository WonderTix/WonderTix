const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Import order items from YAML file to database
 */
async function seedOrderItems() {
  try {
    const oderItemsCount = await prisma.orderitems.count();
    if (oderItemsCount > 0) {
      console.log('Order Items table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/orderitems.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      orderitemid: item.orderitemid,
      orderid_fk: item.orderid_fk,
      price: parseFloat(item.price.replace('$', '')),
    }));

    await prisma.orderitems.createMany({
      data: preparedData,
    });

    console.log('Order Items seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedOrderItems;
