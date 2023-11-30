import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import contacts from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedPPHContacts(prisma: PrismaClient) {
  let totalContactsCount = 0;
  let missingAccountsCount = 0;

  try {
    const contactsCount = await prisma.pphContacts.count();
    if (contactsCount > 0) {
      console.log('PPH_Contacts table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/PPH_contacts.yaml', 'utf8');
    const data = yaml.load(yamlData);

    for (const item of data) {
      totalContactsCount++;
      let canInsert = true;

      if (item.account_id) {
        const accountExists = await prisma.pphAccounts.findUnique({
          where: {account_id: item.account_id},
        });

        if (!accountExists) {
          missingAccountsCount++; // Increment missing accounts counter
          canInsert = false;

          if (process.env.ENV === 'local') {
            console.log(`Skipping contact with ID ${item.contact_id} due to non-existing account with ID ${item.account_id}`);
          }
        }
      }

      if (canInsert) {
        await prisma.pphContacts.create({
          data: {
            contact_id: item.contact_id,
            account_id: item.account_id || null,
            is_deleted: item.is_deleted || 0,
            salutation: item.salutation,
            first_name: item.first_name,
            middle_name: item.middle_name,
            last_name: item.last_name,
            suffix: item.suffix,
            pronouns: isNaN(item.pronouns) ? null : item.pronouns,
            gender_identity: isNaN(item.gender_identity) ? null : item.gender_identity,
            birth_date: item.birth_date ? new Date(item.birth_date) : null,
            email: item.email,
            other_email: item.other_email,
            phone: String(item.phone),
            mobile_phone: String(item.mobile_phone),
            home_phone: String(item.home_phone),
            other_phone: String(item.other_phone),
            fax: item.fax,
            mailing_street: item.mailing_street,
            mailing_city: item.mailing_city,
            mailing_state: item.mailing_state,
            mailing_postal_code: String(item.mailing_postal_code),
            mailing_country: item.mailing_country,
            other_street: item.other_street,
            other_city: item.other_city,
            other_state: item.other_state,
            other_postal_code: String(item.other_postal_code),
            other_country: item.other_country,
            title: item.title,
            department: item.department,
            company: item.company,
            donate_date_entered: item.donate_date_entered ? new Date(item.donate_date_entered) : null,
            donor_recognition: item.donor_recognition,
            formal_salutation: item.formal_salutation,
            informal_salutation: item.informal_salutation,
            informal_address_name: item.informal_address_name,
            volunteer_interests: item.volunteer_interests,
            has_opted_out_of_email: item.has_opted_out_of_email || 0,
            has_opted_out_of_fax: item.has_opted_out_of_fax || 0,
            do_not_call: item.do_not_call || 0,
            do_not_mail: item.do_not_mail || 0,
            email_status: item.email_status,
            email_list_notes: item.email_list_notes,
            email_lists: item.email_lists,
            created_date: item.created_date ? new Date(item.created_date) : new Date(),
            created_by_id: item.created_by_id,
            last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : null,
            last_modified_by_id: item.last_modified_by_id,
            system_modstamp: item.system_modstamp ? new Date(item.system_modstamp) : null,
            last_activity_date: item.las_tactivity_date ? new Date(item.las_tactivity_date) : null,
            email_bounce_reason: item.email_bounce_reason,
            email_bounce_date: item.email_bounce_date ? new Date(item.email_bounce_date) : null,
            current_season_subscriber: item.current_season_subscriber || 0.0,
            board_member: item.board_member || 0.0,
            seating_accomodation: item.seating_accomodation || 0.0,
            reserved_seating: item.reserved_seating || 0.0,
            attending_next_dinner: item.attending_next_dinner || 0.0,
            chocolate_and_card: item.chocolate_and_card || 0.0,
            legacy_membership_circle: isNaN(item.legacy_membership_circle) ? null : item.legacy_membership_circle || 0.0,
            // The relations like donations, orders, notes, ticketorders, and ticketorderitems would be seeded separately and then linked by their respective foreign keys.
          },
        });
      }
    }

    console.log(`PPH_Contacts seeding completed. Total contacts processed: ${totalContactsCount}. Contacts skipped due to missing accounts: ${missingAccountsCount}`);
  } catch (error) {
    console.error('Failed to seed PPH_contacts:', error);
  }
}

module.exports = seedPPHContacts;
