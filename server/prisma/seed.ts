const {PrismaClient} = require('@prisma/client');
const importAccounts = require('./src/seedAccounts');
const importContacts = require('./src/seedContacts');
const importDates = require('./src/seedDates');
const importDiscounts = require('./src/seedDiscounts');
const importDonations = require('./src/seedDonations');
const importEvents = require('./src/seedEvents');
const importEventInstances = require('./src/seedEventInstances');
const importEventTickets = require('./src/seedEventTickets');
const importNotes = require('./src/seedNotes');
const importOpportunities = require('./src/seedOpportunities');
const importOrders = require('./src/seedOrders');
const importRecordTypes = require('./src/seedRecordTypes');
const importSeasons = require('./src/seedSeasons');
const importSeasonTickets = require('./src/seedSeasonTickets');
const importTickerOrders = require('./src/seedTicketOrders');
const importTicketOrderItems = require('./src/seedTicketOrderItems');
const importSeasonTicketTypes = require('./src/seedSeasonTicketTypes');
const importTicketRestrictions = require('./src/seedTicketRestrictions');
const importTicketTypes = require('./src/seedTicketTypes');
const importTransactions = require('./src/seedTransactions');
const importUsers = require('./src/seedUsers');
const importOrderItems = require('./src/seedOrderItems');


const prisma = new PrismaClient();

/**
 * Seed database
 */
async function main() {
  // await importDates(prisma);
  // await importUsers(prisma);
  // await importContacts(prisma);
  // await importDonations(prisma);
  // await importSeasons(prisma);
  // await importDiscounts(prisma);
  // await importTicketTypes(prisma);
  // await importEvents(prisma);
  // await importEventInstances(prisma);
  // await importTicketRestrictions(prisma);
  // await importEventTickets(prisma);
  // await importOrders(prisma);
  // await importOrderItems(prisma);
  // await importSeasonTicketTypes(prisma);
  // await importSeasonTickets(prisma);
  // await importAccounts(prisma);
  // await importNotes(prisma);
  // await importOpportunities(prisma);
  // await importRecordTypes(prisma);
  // await importTickerOrders(prisma);
  // await importTickerOrderItems(prisma)
  // await importTransactions
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
