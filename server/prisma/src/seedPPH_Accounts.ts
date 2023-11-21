import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import PPH_accounts from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedPPHAccounts(prisma: PrismaClient) {
  try {
    const accountsCount = await prisma.pphAccounts.count();
    if (accountsCount > 0) {
      console.log('PPH_Accounts table already seeded.');
      return;
    }


    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/PPH_accounts.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      account_id: item.account_id,
      is_deleted: item.is_deleted || 0,
      name: item.name,
      type: item.type,
      shipping_street: item.shipping_street,
      shipping_city: item.shipping_city,
      shipping_state: item.shipping_state,
      shipping_postal_code: isNaN(item.shipping_postal_code) ? null : String(item.shipping_postal_code),
      shipping_country: item.shipping_country,
      phone: String(item.phone),
      fax: item.fax,
      website: item.website,
      created_date: item.created_date ? new Date(item.created_date) : new Date(),
      last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : new Date(),
      last_modified_by_id: item.last_modified_by_id,
      last_activity_date: item.last_activity_date ? new Date(item.last_activity_date) : null,
      do_not_call: item.do_not_call || 0,
      do_not_mail: item.do_not_mail || 0,
      donor_recognition: item.donor_recognition,
      donor_email: item.donor_email,
      formal_salutation: item.formal_salutation,
      has_opted_out_of_email: item.has_opted_out_of_email || 0,
      informal_address_name: item.informal_address_name,
      informal_salutation: item.informal_salutation,
      attn: item.attn,
      grant_size: item.grant_size,
      will_give_it: item.will_give_it,
      first_donation_date: item.first_donation_date ? new Date(item.first_donation_date) : null,
      last_donation_date: item.last_donation_date ? new Date(item.last_donation_date) : null,
      lifetime_donation_history_amount: item.lifetime_donation_history_amount || 0.0,
      lifetime_donation_number: item.lifetime_donation_number || 0,
      this_year_donation_history_amount: item.this_year_donation_history_amount || 0.0,
      amount_donated_this_fiscal_year: item.amount_donated_this_fiscal_year || 0.0,
      last_donation_amount: item.last_donation_amount || 0.0,
      lifetime_single_ticket_amount: item.lifetime_single_ticket_amount || 0.0,
      lifetime_subscription_amount: item.lifetime_subscription_amount || 0.0,
      board_member: item.board_member || 0,
      show_sponsor: item.show_sponsor || 0,
      seating_accomodation: item.seating_accomodation || 0,
      amount_donated_CY20: item.amount_donated_CY20 || 0.0,
      amount_donated_CY18: item.amount_donated_CY18 || 0.0,
      sort_name: item.sort_name,
      amount_donated_last_fiscal_year: item.amount_donated_last_fiscal_year || 0.0,
      amount_donated_CY21: item.amount_donated_CY21 || 0.0,
      amount_donated_CY19: item.amount_donated_CY19 || 0.0,
      amount_donated_FY20: item.amount_donated_FY20 || 0.0,
      amount_donated_FY19: item.amount_donated_FY19 || 0.0,
      amount_donated_FY18: item.amount_donated_FY18 || 0.0,
      lifetime_donations_included_pledged: item.lifetime_donations_included_pledged || 0.0,
      first_donation_date_incl_pledged: item.first_donation_date_incl_pledged ? new Date(item.first_donation_date_incl_pledged) : null,
      amount_donated_FY21: item.amount_donated_FY21 || 0.0,
      first_donation_amount: item.first_donation_amount || 0.0,
      largest_donation_date: item.largest_donation_date ? new Date(item.largest_donation_date) : null,
      amount_donated_FY22: item.amount_donated_FY22 || 0.0,
      amount_Donated_FY23: item.amount_Donated_FY23 || 0.0,
      amount_Donated_FY24: item.amount_Donated_FY24 || 0.0
      // No relations like notes, contacts, ticketorders, and ticketorderitems in the seed data directly, these would be seeded separately and then linked by their respective foreign keys.
    }));

    await prisma.pphAccounts.createMany({
      data: preparedData,
    });

    console.log('PPH_Accounts seeding completed.');
  } catch (error) {
    console.error('Failed to seed PPH_accounts:', error);
  }
}

module.exports = seedPPHAccounts;
