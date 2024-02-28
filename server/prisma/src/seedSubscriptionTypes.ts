import {ExtendedPrismaClient} from '../../src/controllers/PrismaClient/GetExtendedPrismaClient';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import Subscription types from YAML file to database
 * @param {ExtendedPrismaClient} prisma
 */
export default async function seedTicketTypes(prisma: ExtendedPrismaClient) {
  try {
    const subscriptionTypeCount = await prisma.subscriptiontypes.count();

    if (subscriptionTypeCount > 0) {
      console.log('Subscription Types table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/subscriptiontype.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      price: Number(item.price.replace('$', '')),
      description: item.description,
      previewonly: item.previewonly,
      name: item.name,
    }));

    await prisma.subscriptiontypes.createMany({
      data: preparedData,
    });

    console.log('Subscription Types seeding completed.');
  } catch (error) {
    console.error(error);
  }
}
