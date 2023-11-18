import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import ticket order items from YAML file to database
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
    const data = yaml.load(yamlData);

    for (const item of data) {
      let canInsert = true;

      // Check if the ticket order exists
      if (item.ticket_order_id) {
        const ticketOrderExists = await prisma.ticketorders.findUnique({
          where: {ticket_order_id: item.ticket_order_id},
        });

        if (!ticketOrderExists) {
          canInsert = false;
          console.log(`Skipping ticket order item with ID ${item.ticket_order_item_id} due to non-existing ticket order with ID ${item.ticket_order_id}`);
        }
      }

      // Check if the account exists
      if (item.account_id) {
        const accountExists = await prisma.accounts.findUnique({
          where: {account_id: item.account_id},
        });

        if (!accountExists) {
          canInsert = false;
          console.log(`Skipping ticket order item with ID ${item.ticket_order_item_id} due to non-existing account with ID ${item.account_id}`);
        }
      }

      // Check if the contact exists
      if (item.contact_id) {
        const contactExists = await prisma.contacts.findUnique({
          where: {contact_id: item.contact_id},
        });

        if (!contactExists) {
          canInsert = false;
          console.log(`Skipping ticket order item with ID ${item.ticket_order_item_id} due to non-existing contact with ID ${item.contact_id}`);
        }
      }

      if (canInsert) {
        await prisma.ticketorderitem.create({
          data: {
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
            discount_amount: isNaN(item.discount_amount) ? null : item.discount_amount || 0.0,
            discount_type: item.discount_type,
            unit_fee: item.unit_fee || 0.0,
            ticket_notes: isNaN(item.ticket_notes) ? null : item.ticket_notes,
            barcode: String(item.barcode),
            create_date: item.create_date ? new Date(item.create_date) : new Date(),
            last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : new Date(),
            entry_date: item.entry_date ? new Date(item.entry_date) : null,
          },
        });
      }
    }

    console.log('TicketOrderItems seeding completed.');
  } catch (error) {
    console.error('Failed to seed ticketorderitems:', error);
  }
}

module.exports = seedTicketOrderItems;
