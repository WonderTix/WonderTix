import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import contacts from YAML file to database
 * @param {PrismaClient} prisma
*/
async function seedContacts(prisma: PrismaClient) {
  try {
    const contactsCount = await prisma.contacts.count();
    if (contactsCount > 0) {
      console.log('Contacts table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/contacts.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    // You will need to ensure that the YAML data structure matches the fields expected by your Prisma model.
    const preparedData = data.map((item) => ({
      id: item.id,
      is_deleted: item.is_deleted || 0,
      account_id: item.account_id,
      salutation: item.salutation,
      firstname: item.firstname,
      lastname: item.lastname,
      otherstreet: item.otherstreet,
      othercity: item.othercity,
      otherstate: item.otherstate,
      otherpostalcode: item.otherpostalcode,
      othercountry: item.othercountry,
      mailingstreet: item.mailingstreet,
      mailingcity: item.mailingcity,
      mailingstate: item.mailingstate,
      mailingpostalcode: item.mailingpostalcode,
      mailingcountry: item.mailingcountry,
      phone: item.phone,
      fax: item.fax,
      mobilephone: item.mobilephone,
      homephone: item.homephone,
      otherphone: item.otherphone,
      email: item.email,
      title: item.title,
      department: item.department,
      birthdate: item.birthdate ? new Date(item.birthdate) : null,
      description: item.description,
      hasoptedoutofemail: item.hasoptedoutofemail || 0,
      hasoptedoutoffax: item.hasoptedoutoffax || 0,
      donnotcall: item.donnotcall || 0,
      createddate: item.createddate ? new Date(item.createddate) : new Date(),
      createdbyid: item.createdbyid,
      lastmodifieddate: item.lastmodifieddate ? new Date(item.lastmodifieddate) : null,
      lastmodifiedbyid: item.lastmodifiedbyid,
      systemmodstamp: item.systemmodstamp ? new Date(item.systemmodstamp) : null,
      lastactivitydate: item.lastactivitydate ? new Date(item.lastactivitydate) : null,
      emailbouncereason: item.emailbouncereason,
      emailbouncedate: item.emailbouncedate ? new Date(item.emailbouncedate) : null,
      pronouns: item.pronouns,
      genderidentity: item.genderidentity,
      donate_date_entered: item.donate_date_entered ? new Date(item.donate_date_entered) : null,
      deceased: item.deceased || 0,
      do_not_mail: item.do_not_mail || 0,
      donor_recognition: item.donor_recognition,
      formalsalutation: item.formalsalutation,
      informal_address_name: item.informal_address_name,
      informal_salutation: item.informal_salutation,
      volunteer_interests: item.volunteer_interests,
      other_email: item.other_email,
      company: item.company,
      middlename: item.middlename,
      suffix: item.suffix,
      contactorigin: item.contactorigin,
      emailstatus: item.emailstatus,
      current_season_subscriber: item.current_season_subscriber || 0.0,
      email_lists: item.email_lists,
      board_member: item.board_member || 0.0,
      seating_accomodation: item.seating_accomodation || 0.0,
      reserved_seating: item.reserved_seating || 0.0,
      attending_next_dinner: item.attending_next_dinner || 0.0,
      chocolate_and_card: item.chocolate_and_card || 0.0,
      legacy_membership_circle: item.legacy_membership_circle || 0.0,
      email_list_notes: item.email_list_notes,
      // The relations like donations, orders, notes, ticketorders, and ticketorderitems would be seeded separately and then linked by their respective foreign keys!
    }));

    await prisma.contacts.createMany({
      data: preparedData,
    });

    console.log('Contacts seeding completed.');
  } catch (error) {
    console.error('Failed to seed contacts:', error);
  }
}

module.exports = seedContacts;