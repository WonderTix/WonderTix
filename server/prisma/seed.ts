import {freq} from '@prisma/client';

const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * parse date time string to a Date object
 * @param {string} timeString  20:00:00.000000 -08:00
 * @return {Date} Date object
 */
function parseDateTime(timeString: string): Date {
  const [time, timezone] = timeString.split(' ');
  const [hours, minutes, seconds] = time.split(':').map(Number);

  const date = new Date();

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(Math.floor(seconds));

  const [timezoneHours, timezoneMinutes] = timezone.split(':').map(Number);
  date.setHours(date.getHours() - timezoneHours);
  date.setMinutes(date.getMinutes() - timezoneMinutes);

  return date;
}

/**
 * parse date time string to a Date object
 * @param {string} timeString  21:00:00-08
 * @return {Date} Date object
 */
function parseTime(timeString: string): Date {
  const timePart = timeString.split('-')[0];
  return new Date(`1970-01-01T${timePart}Z`);
}

/**
 * Import dates from YAML file to database
 */
async function seedDates() {
  try {
    const datesCount = await prisma.date.count();
    if (datesCount > 0) {
      console.log('Dates table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/date.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      dateid: item.dateid,
      date_actual: new Date(item.date_actual),
      day_name: item.day_name,
      day_of_week: item.day_of_week,
      day_of_month: item.day_of_month,
      day_of_quarter: item.day_of_quarter,
      day_of_year: item.day_of_year,
      week_of_month: item.week_of_month,
      week_of_year: item.week_of_year,
      month_actual: item.month_actual,
      month_name: item.month_name,
      quarter: item.quarter,
      year_actual: item.year_actual,
      first_day_of_week: new Date(item.first_day_of_week),
      last_day_of_week: new Date(item.last_day_of_week),
      first_day_of_month: new Date(item.first_day_of_month),
      last_day_of_month: new Date(item.last_day_of_month),
      first_day_of_quarter: new Date(item.first_day_of_quarter),
      last_day_of_quarter: new Date(item.last_day_of_quarter),
      first_day_of_year: new Date(item.first_day_of_year),
      last_day_of_year: new Date(item.last_day_of_year),
      weekend: item.weekend,
    }));

    await prisma.date.createMany({
      data: preparedData,
    });

    console.log('Dates seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

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

/**
 * Import users from YAML file to database
 */
async function seedUsers() {
  try {
    const usersCount = await prisma.users.count();
    if (usersCount > 0) {
      console.log('Users table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/users.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      userid: item.userid,
      username: item.username,
      is_superadmin: item.is_superadmin === 'true',
      auth0_id: item.auth0_id,
    }));

    await prisma.users.createMany({
      data: preparedData,
    });

    console.log('Users seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import ticket types from YAML file to database
 */
async function seedTicketTypes() {
  try {
    const tickettypeCount = await prisma.tickettype.count();
    if (tickettypeCount > 0) {
      console.log('Ticket Types table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/tickettype.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      tickettypeid: item.tickettypeid,
      description: item.description,
      price: parseFloat(item.price.replace('$', '')),
      concessions: parseFloat(item.concessions.replace('$', '')),
      deprecated: item.deprecated === 'true',
    }));

    await prisma.tickettype.createMany({
      data: preparedData,
    });

    console.log('Ticket Types seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import ticket restrictions from YAML file to database
 */
async function seedTicketRestrictions() {
  try {
    const tickettypeCount = await prisma.ticketrestrictions.count();
    if (tickettypeCount > 0) {
      console.log('Ticket Restrictions table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/ticketrestrictions.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      ticketrestrictionsid: item.ticketrestrictionsid,
      eventinstanceid_fk: item.eventinstanceid_fk,
      tickettypeid_fk: item.tickettypeid_fk,
      ticketlimit: item.ticketlimit,
      ticketssold: item.ticketssold,
    }));

    await prisma.ticketrestrictions.createMany({
      data: preparedData,
    });

    console.log('Ticket Restrictions seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import seasons from YAML file to database
 */
async function seedSeasons() {
  try {
    const seasonsCount = await prisma.seasons.count();
    if (seasonsCount > 0) {
      console.log('Seasons table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/seasons.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      seasonid: item.seasonid,
      name: item.name,
      startdate: item.startdate,
      enddate: item.enddate,
    }));

    await prisma.seasons.createMany({
      data: preparedData,
    });

    console.log('Seasons seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import events from YAML file to database
 */
async function seedDiscounts() {
  try {
    const discountsCount = await prisma.discounts.count();
    if (discountsCount > 0) {
      console.log('Discounts table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/discounts.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      discountid: item.discountid,
      code: item.code,
      amount: item.amount,
      percent: item.percent,
      startdate: item.startdate,
      enddate: item.enddate,
      tickettypeid_fk: item.tickettypeid,
      createdby_fk: item.createdby,
      usagelimit: item.usagelimit,
      min_tickets: item.min_tickets,
      min_events: item.min_events,
    }));

    await prisma.discounts.createMany({
      data: preparedData,
    });

    console.log('Discounts seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import events from YAML file to database
 */
async function seedDonations() {
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
      isanonymous: item.isanonymous === 'true',
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

/**
 * Import events from YAML file to database
 */
async function seedEvents() {
  try {
    const eventsCount = await prisma.events.count();
    if (eventsCount > 0) {
      console.log('Events table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/events.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      eventid: item.eventid,
      seasonid_fk: item.seasonid_fk,
      eventname: item.eventname,
      eventdescription: item.eventdescription,
      active: item.active === 'true',
      seasonticketeligible: item.seasonticketeligible === 'true',
      imageurl: item.imageurl,
    }));

    await prisma.events.createMany({
      data: preparedData,
    });

    console.log('Events seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import event instances from YAML file to database
 */
async function seedEventInstances() {
  try {
    const eventinstancesCount = await prisma.eventinstances.count();
    if (eventinstancesCount > 0) {
      console.log('Event Instances table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/eventinstances.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      eventinstanceid: item.eventinstanceid,
      eventid_fk: item.eventid_fk,
      eventdate: item.eventdate,
      eventtime: parseDateTime(item.eventtime),
      salestatus: item.salestatus === 'true',
      totalseats: item.totalseats,
      availableseats: item.availableseats,
      purchaseuri: item.purchaseuri,
      ispreview: item.ispreview === 'true',
      defaulttickettype: item.defaulttickettype,
    }));

    await prisma.eventinstances.createMany({
      data: preparedData,
    });

    console.log('Events instances seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import event tickets from YAML file to database
 */
async function seedEventTickets() {
  try {
    const eventTicketsCount = await prisma.eventtickets.count();
    if (eventTicketsCount > 0) {
      console.log('Event Tickets table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/eventtickets.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      eventticketid: item.eventticketid,
      eventinstanceid_fk: item.eventinstanceid_fk,
      tickettypeid_fk: item.tickettypeid_fk,
      purchased: item.purchased === 'true',
      redeemed: item.redeemed === 'true',
      redeemed_ts: item.redeemed_ts,
      donated: item.donated === 'true',
    }));

    await prisma.eventtickets.createMany({
      data: preparedData,
    });

    console.log('Events Tickets seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import orders from YAML file to database
 */
async function seedOrders() {
  try {
    const eventTicketsCount = await prisma.orders.count();
    if (eventTicketsCount > 0) {
      console.log('Orders table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/orders.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      orderid: item.orderid,
      contactid_fk: item.contactid_fk,
      orderdate: item.orderdate,
      ordertime: parseTime(item.ordertime),
      discountid_fk: item.discountid_fk,
      payment_intent: item.payment_intent,
      refund_intent: item.refund_intent,
      ordertotal: parseFloat(item.ordertotal.replace('$', '')),
    }));

    await prisma.orders.createMany({
      data: preparedData,
    });

    console.log('Orders seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import order items from YAML file to database
 */
async function seedOrderItems() {
  try {
    const oderItemsCount = await prisma.orderitems.count();
    if (oderItemsCount > 0) {
      console.log('Order Items table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/orderitems.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      orderitemid: item.orderitemid,
      orderid_fk: item.orderid_fk,
      price: parseFloat(item.price.replace('$', '')),
    }));

    await prisma.orderitems.createMany({
      data: preparedData,
    });

    console.log('Order Items seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import season ticket types from YAML file to database
 */
async function seedSeasonTicketTypes() {
  try {
    const seasonTicketTypesCount = await prisma.seasontickettype.count();
    if (seasonTicketTypesCount > 0) {
      console.log('Season Ticket Types table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/seasontickettypes.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      seasontickettypeid: item.seasontickettypeid,
      description: item.description,
      price: parseFloat(item.price.replace('$', '')),
    }));

    await prisma.seasontickettype.createMany({
      data: preparedData,
    });

    console.log('Season Ticket Types seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import season tickets from YAML file to database
 */
async function seedSeasonTickets() {
  try {
    const seasonTicketsCount = await prisma.seasontickets.count();
    if (seasonTicketsCount > 0) {
      console.log('Season Tickets table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/seasontickets.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      seasonticketid: item.seasonticketid,
      orderitemid_fk: item.orderitemid_fk,
      eventticketid_fk: item.eventticketid_fk,
      eventid_fk: item.eventid_fk,
      seasontickettypeid_fk: item.seasontickettypeid_fk,
      ticketwasswapped: item.ticketwasswapped === 'true',
    }));

    await prisma.seasontickets.createMany({
      data: preparedData,
    });

    console.log('Season Tickets seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Import single tickets from YAML file to database
 */
async function seedSingleTickets() {
  try {
    const singleTicketsCount = await prisma.singletickets.count();
    if (singleTicketsCount > 0) {
      console.log('Single Tickets table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/singletickets.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      singleticketid: item.singleticketid,
      eventticketid_fk: item.eventticketid_fk,
      orderitemid_fk: item.orderitemid_fk,
      ticketwasswapped: item.ticketwasswapped === 'true',
    }));

    await prisma.singletickets.createMany({
      data: preparedData,
    });

    console.log('Single Tickets seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

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
