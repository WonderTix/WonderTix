const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const seedContacts = require('./src/seedContacts');
const seedDates = require('./src/seedDates');
const seedDiscounts = require('./src/seedDiscounts');
const seedDonations = require('./src/seedDonations');
const seedEvents = require('./src/seedEvents');
const seedEventInstances = require('./src/seedEventInstances');
const seedEventTickets = require('./src/seedEventTickets');
const seedOrders = require('./src/seedOrders');
const seedOrderItems = require('./src/seedOrderItems');
const seedSeasons = require('./src/seedSeasons');
const seedSeasonTickets = require('./src/seedSeasonTickets');
const seedSeasonTicketTypes = require('./src/seedSeasonTicketTypes');
const seedSingleTickets = require('./src/seedSingleTickets');
const seedTicketRestrictions = require('./src/seedTicketRestrictions');
const seedTicketTypes = require('./src/seedTicketTypes');
const seedUsers = require('./src/seedUsers');

/**
 * Seed database
 */
async function main() {
  await seedDates();
  await seedUsers();
  await seedContacts();
  await seedDonations();
  await seedSeasons();
  await seedDiscounts();
  await seedTicketTypes();
  await seedTicketRestrictions();
  await seedEvents();
  await seedEventInstances();
  await seedEventTickets();
  await seedOrders();
  await seedOrderItems();
  await seedSeasonTicketTypes();
  await seedSeasonTickets();
  await seedSingleTickets();
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
