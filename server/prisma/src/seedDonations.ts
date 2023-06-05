import {freq, PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');
const prisma = new PrismaClient();

/**
 * Import events from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedDonations(prisma: PrismaClient) {
  try {
    const donationsCount = await prisma.donations.count();
    if (donationsCount > 0) {
      console.log('Donations table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/donations.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const frequencyMapping = {
      'yearly': freq.yearly,
      'monthly': freq.monthly,
      'weekly': freq.weekly,
      'one-time': freq.one_time,
    };

    const preparedData = data.map((item) => ({
      donationid: item.donationid,
      contactid_fk: item.contactid_fk,
      isanonymous: item.isanonymous,
      amount: parseFloat(item.amount.replace('$', '')),
      donorname: item.donorname,
      frequency: frequencyMapping[item.frequency.toLowerCase() as keyof typeof frequencyMapping],
      comments: item.comments,
      payment_intent: item.payment_intent,
      refund_intent: item.refund_intent,
      donationdate: item.donationdate,
    }));

    await prisma.donations.createMany({
      data: preparedData,
    });

    console.log('Donations seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedDonations;
