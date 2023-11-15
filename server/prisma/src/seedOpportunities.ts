import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import opportunities from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedOpportunities(prisma: PrismaClient) {
  try {
    const opportunitiesCount = await prisma.opportunity.count();
    if (opportunitiesCount > 0) {
      console.log('Opportunities table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/opportunities.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      id: item.id,
      is_deleted: item.is_deleted || 0,
      accountid: item.accountid,
      record_type_id: item.record_type_id,
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
      contactid: item.contactid,
      is_anonymous: item.is_anonymous || 0,
      amount_paid: item.amount_paid || 0.00,
      dedication_honoree_name: item.dedication_honoree_name,
      dedication_type: item.dedication_type,
      donor_id: item.donor_id,
      fund_type: item.fund_type,
      grant_amount: item.grant_amount || 0.00,
      payment_type: item.payment_type,
      sub_type: item.sub_type,
      fiscal_year_season: item.fiscal_year_season,
      grant_ask_amount: item.grant_ask_amount || 0.00,
      appeal: item.appeal,
      tax_deductible_amount: item.tax_deductible_amount || 0.00,
      acknowledged_by_letter: item.acknowledged_by_letter || 0.0,
    }));

    await prisma.opportunity.createMany({
      data: preparedData,
    });

    console.log('Opportunities seeding completed.');
  } catch (error) {
    console.error('Failed to seed opportunities:', error);
  }
}

module.exports = seedOpportunities;
