const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Import contacts from YAML file to database
 */
async function seedContacts() {
  try {
    const contactsCount = await prisma.contacts.count();
    if (contactsCount > 0) {
      console.log('Contacts table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/contacts.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      contactid: item.contactid,
      firstname: item.firstname,
      lastname: item.lastname,
      address: item.address,
      email: item.email,
      phone: item.phone,
      donorbadge: item.donorbadge === 'true',
      seatingaccom: item.seatingaccom === 'true',
      vip: item.vip === 'true',
      volunteerlist: item.volunteerlist === 'true',
      newsletter: item.newsletter === 'true',
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
