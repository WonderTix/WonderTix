import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import Opportunity from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedOpportunity(prisma: PrismaClient) {
  try {
    const OpportunityCount = await prisma.opportunity.count();
    if (OpportunityCount > 0) {
      console.log('Opportunity table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/Opportunity.yaml', 'utf8');
    const data = yaml.load(yamlData);

    for (const item of data) {
      let canInsert = true;

      if (item.record_type_id) {
        const recordTypeExists = await prisma.recordtype.findUnique({
          where: {record_type_id: item.record_type_id},
        });

        if (!recordTypeExists) {
          canInsert = false;
          console.log(`Skipping opportunity with ID ${item.opportunity_id} due to non-existing record type with ID ${item.record_type_id}`);
        }
      }

      if (canInsert) {
        await prisma.opportunity.create({
          data: {
            opportunity_id: item.opportunity_id,
            is_deleted: item.is_deleted || 0,
            account_id: item.account_id || null,
            record_type_id: item.record_type_id || null,
            is_private: item.is_private || 0,
            name: item.name,
            description: item.description,
            amount: item.amount || 0.00,
            close_date: item.close_date ? new Date(item.close_date) : new Date(),
            type: item.type,
            campaign_id: item.campaign_id,
            owner_id: item.owner_id,
            created_date: item.created_date ? new Date(item.created_date) : new Date(),
            last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : new Date(),
            fiscal_year: item.fiscal_year,
            fiscal_quarter: item.fiscal_quarter,
            contact_id: item.contactid || null,
            is_anonymous: item.is_anonymous || 0,
            amount_paid: item.amount_paid || 0.00,
            dedication_honoree_name: item.dedication_honoree_name,
            dedication_type: item.dedication_type,
            donor_id: item.donor_id,
            fund_type: item.fund_type,
            grant_amount: isNaN(item.grant_amount) ? null : item.grant_amount || 0.00,
            payment_type: item.payment_type,
            sub_type: item.sub_type,
            fiscal_year_season: item.fiscal_year_season,
            grant_ask_amount: isNaN(item.grant_ask_amount) ? null : item.grant_ask_amount || 0.00,
            appeal: item.appeal,
            tax_deductible_amount: isNaN(item.tax_deductible_amount) ? null : item.tax_deductible_amount || 0.00,
            acknowledged_by_letter: item.acknowledged_by_letter || 0.0,
          },
        });
      }
    }

    console.log('Opportunity seeding completed.');
  } catch (error) {
    console.error('Failed to seed Opportunity:', error);
  }
}

module.exports = seedOpportunity;
