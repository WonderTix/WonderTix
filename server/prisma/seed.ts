const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const importContacts = require('./src/seedContacts');
const importDates = require('./src/seedDates');
const importDiscounts = require('./src/seedDiscounts');
const importDonations = require('./src/seedDonations');
const importEvents = require('./src/seedEvents');
const importEventInstances = require('./src/seedEventInstances');
const importEventTickets = require('./src/seedEventTickets');
const importOrders = require('./src/seedOrders');
const importOrderItems = require('./src/seedOrderItems');
const importSeasons = require('./src/seedSeasons');
const importSeasonTickets = require('./src/seedSeasonTickets');
const importSeasonTicketTypes = require('./src/seedSeasonTicketTypes');
const importSingleTickets = require('./src/seedSingleTickets');
const importTicketRestrictions = require('./src/seedTicketRestrictions');
const importTicketTypes = require('./src/seedTicketTypes');
const importUsers = require('./src/seedUsers');

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
  await importEventTickets(prisma);
  await importOrders(prisma);
  await importOrderItems(prisma);
  await importSeasonTicketTypes(prisma);
  await importSeasonTickets(prisma);
  await importSingleTickets(prisma);
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
