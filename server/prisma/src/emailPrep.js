import {PrismaClient} from '@prisma/client'
//const { PrismaClient } = require('@prisma/client');

async function getContacts() {
  const prisma = new PrismaClient();

  try {
    // Retrieve contacts where newsletter is true and select only firstname, lastname, and email
    const contacts = await prisma.contacts.findMany({
      where: {
        newsletter: { equals: true }
      },
      select: {
        firstname: true,
        lastname: true,
        email: true
      }
    });

    // show the retrieved contacts; make sure contacts showing
    console.log('Retrieved contacts:', contacts);

    return contacts.map(contact => ({
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email
    }));
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Disconnect from Prisma db
  }
}

module.exports = getContacts;