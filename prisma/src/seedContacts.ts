import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import contacts from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedContacts(prisma: PrismaClient) {
  try {
    const contactsCount = await prisma.contacts.count();
    if (contactsCount > 0) {
      console.log('Contacts table already seeded.');
      return;
    }

    const yamlDataPath = process.env.SEED_DATA || './yaml-seeder-data';
    const yamlData = fs.readFileSync(`${yamlDataPath}/contacts.yaml`, 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      contactid: item.contactid,
      firstname: item.firstname,
      lastname: item.lastname,
      address: item.address,
      email: item.email,
      phone: item.phone,
      donorbadge: item.donorbadge,
      seatingaccom: item.seatingaccom,
      vip: item.vip,
      volunteerlist: item.volunteerlist,
      newsletter: item.newsletter,
    }));

    await prisma.contacts.createMany({
      data: preparedData,
    });

    console.log('Contacts seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedContacts;
