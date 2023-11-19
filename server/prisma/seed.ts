const {PrismaClient} = require('@prisma/client');
const importContacts = require('./src/seedContacts');
const importDates = require('./src/seedDates');
const importDiscounts = require('./src/seedDiscounts');
const importDonations = require('./src/seedDonations');
const importEvents = require('./src/seedEvents');
const importEventInstances = require('./src/seedEventInstances');
const importEventTickets = require('./src/seedEventTickets');
const importOrders = require('./src/seedOrders');
const importSeasons = require('./src/seedSeasons');
const importSeasonTickets = require('./src/seedSeasonTickets');
const importSeasonTicketTypes = require('./src/seedSeasonTicketTypes');
const importTicketRestrictions = require('./src/seedTicketRestrictions');
const importTicketTypes = require('./src/seedTicketTypes');
const importUsers = require('./src/seedUsers');
const importOrderItems = require('./src/seedOrderItems');

const prisma = new PrismaClient();

/**
 * Seed database
 */
async function main() {
  await importDates(prisma);
  await importUsers(prisma);
  await importContacts(prisma);
  await importDonations(prisma);
  await importSeasons(prisma);
  await importDiscounts(prisma);
  await importTicketTypes(prisma);
  await importEvents(prisma);
  await importEventInstances(prisma);
  await importTicketRestrictions(prisma);
  await importOrders(prisma);
  await importOrderItems(prisma);
  await importSeasonTicketTypes(prisma);
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
