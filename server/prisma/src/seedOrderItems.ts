import {PrismaClient} from '@prisma/client';
// const fs = require('fs');
// const yaml = require('js-yaml');
//
// /**
//  * Import order items from YAML file to database
//  * @param {PrismaClient} prisma
// //  */
// // async function seedOrderItems(prisma: PrismaClient) {
//   try {
//     const oderItemsCount = await prisma.orderitems.count();
//     if (oderItemsCount > 0) {
//       console.log('Order Items table already seeded.');
//       return;
//     }
//
//     const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/orderitems.yaml', 'utf8');
//     const data: any[] = yaml.load(yamlData);
//
//     const preparedData = data.map((item) => ({
//       orderid_fk: item.orderid_fk,
//       price: parseFloat(item.price.replace('$', '')),
//     }));
//
//     await prisma.orderitems.createMany({
//       data: preparedData,
//     });
//
//     console.log('Order Items seeding completed.');
//   } catch (error) {
//     console.error(error);
//   }
// }
//
// module.exports = seedOrderItems;
