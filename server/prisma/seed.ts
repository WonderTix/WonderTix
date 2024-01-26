const { PrismaClient } = require("@prisma/client");
const importContacts = require("./src/seedContacts");
const importDates = require("./src/seedDates");
const importDiscounts = require("./src/seedDiscounts");
const importEvents = require("./src/seedEvents");
const importEventInstances = require("./src/seedEventInstances");
const importSeasons = require("./src/seedSeasons");
const importTicketRestrictions = require("./src/seedTicketRestrictions");
const importTicketTypes = require("./src/seedTicketTypes");
const importUsers = require("./src/seedUsers");
// PPH IMPORT HERE
const importPPHAccounts = require("./src/seedPPH_Accounts");
const importPPHContacts = require("./src/seedPPH_Contacts");
const importPPHEvents = require("./src/seedPPH_Events");
const importPPHNotes = require("./src/seedPPH_Notes");
const importPPHOpportunity = require("./src/seedPPH_Opportunity");
const importPPHRecordTypes = require("./src/seedPPH_RecordTypes");
const importPPHTicketOrders = require("./src/seedPPH_TicketOrders");
const importPPHTicketOrderItems = require("./src/seedPPH_TicketOrderItems");
const importPPHTransactions = require("./src/seedPPH_Transactions");

const prisma = new PrismaClient();

/**
 * Seed database
 */
async function main() {
  const isCI = process.env.CI === 'true';
  const isMinimalSeed = process.env.MINIMAL_SEED === 'true';
  const shouldSeed = process.env.SHOULD_SEED === 'true';

  if (shouldSeed) {
    if (isCI || isMinimalSeed) {
      // In CI environment, seed only necessary data
      await importDates(prisma);
      await importDiscounts(prisma);
      await importTicketTypes(prisma);
    } else {
      // Full seeding process
      await importDates(prisma);
      await importUsers(prisma);
      await importContacts(prisma);
      await importSeasons(prisma);
      await importDiscounts(prisma);
      await importTicketTypes(prisma);
      await importEvents(prisma);
      await importEventInstances(prisma);
      await importTicketRestrictions(prisma);

      // PPH SEEDING HERE
      await importPPHAccounts(prisma);
      await importPPHContacts(prisma);
      await importPPHEvents(prisma);
      await importPPHNotes(prisma);
      await importPPHRecordTypes(prisma);
      await importPPHOpportunity(prisma);
      await importPPHTicketOrders(prisma);
      await importPPHTicketOrderItems(prisma);
      await importPPHTransactions(prisma);
    }
  } else {
    // There are two special ticketTypes ('pay what you can' and another default type) that have to be seeded with specific id values
    await importTicketTypes(prisma);
    await importDates(prisma);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
