import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import notes from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedTicketOrderItems(prisma: PrismaClient) {
  try {
    const ticketOrderItemsCount = await prisma.ticketorderitem.count();
    if (ticketOrderItemsCount > 0) {
      console.log('TicketOrderItems table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/ticketorderitems.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      ticket_order_item_id: item.ticket_order_item_id,
      ticket_order_id: item.ticket_order_id,
      account_id: item.account_id,
      contact_id: item.contact_id,
      status: item.status,
      season: item.season,
      event_id: item.event_id,
      subscription_order_item_id: item.subscription_order_item_id,
      price_level_id: item.price_level_id,
      quantity: item.quantity || 1.0,
      ticket_price: item.ticket_price || 0.0,
      unit_price: item.unit_price || 0.0,
      amount_paid: item.amount_paid || 0.0,
      sales_tax: item.sales_tax || 0.0,
      discount_code_id: item.discount_code_id,
      discount_amount: item.discount_amount || 0.0,
      discount_type: item.discount_type,
      unit_fee: item.unit_fee || 0.0,
      ticket_notes: item.ticket_notes,
      barcode: item.barcode,
      create_date: item.create_date ? new Date(item.create_date) : new Date(),
      last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : new Date(),
      entry_date: item.entry_date ? new Date(item.entry_date) : null,
    }));


    await prisma.ticketorderitem.createMany({
      data: preparedData,
    });

    console.log('TicketOrderItems seeding completed.');
  } catch (error) {
    console.error('Failed to seed ticketorderitems:', error);
  }
}

module.exports = seedTicketOrderItems;
