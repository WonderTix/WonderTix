import {extendPrismaClient} from '../src/controllers/PrismaClient/GetExtendedPrismaClient';
const importContacts = require('./src/seedContacts');
const importDates = require('./src/seedDates');
const importDiscounts = require('./src/seedDiscounts');
const importEvents = require('./src/seedEvents');
const importEventInstances = require('./src/seedEventInstances');
const importSeasons = require('./src/seedSeasons');
const importTicketRestrictions = require('./src/seedTicketRestrictions');
const importTicketTypes = require('./src/seedTicketTypes');
const importUsers = require('./src/seedUsers');
import importOrders from './src/seedOrders';
import importSubscriptionTypes from './src/seedSubscriptionTypes';

const prisma = extendPrismaClient();

/**
 * Seed database
 */
async function main() {
  const isCI = process.env.CI === 'true';
  const isMinimalSeed = process.env.MINIMAL_SEED === 'true';
  const shouldSeed = process.env.SHOULD_SEED === 'true';

  await importDates(prisma);
  await importTicketTypes(prisma);
  await importSubscriptionTypes(prisma);

  if (!shouldSeed) return;

  await importDiscounts(prisma);

  if (!isCI && !isMinimalSeed) {
    await importUsers(prisma);
    await importContacts(prisma);
    await importSeasons(prisma);
    await importEvents(prisma);
    await importEventInstances(prisma);
    await importTicketRestrictions(prisma);
    // await importOrders(prisma);
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
