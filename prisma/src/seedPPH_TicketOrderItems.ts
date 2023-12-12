import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import ticket order items from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedPPHTicketOrderItems(prisma: PrismaClient) {
  let totalTicketOrderItemsCount = 0;
  let missingTicketOrderCount = 0;
  let missingAccountCount = 0;
  let missingContactCount = 0;


  try {
    const ticketOrderItemsCount = await prisma.pphTicketorderitem.count();
    if (ticketOrderItemsCount > 0) {
      console.log('PPH_TicketOrderItems table already seeded.');
      return;
    }

    const yamlDataPath = process.env.SEED_DATA || './yaml-seeder-data';
    const yamlData = fs.readFileSync(`${yamlDataPath}/PPH_ticketorderitems.yaml`, 'utf8');
    const data = yaml.load(yamlData);

    for (const item of data) {
      totalTicketOrderItemsCount++;
      let canInsert = true;

      // Check if the ticket order exists
      if (item.ticket_order_id) {
        const ticketOrderExists = await prisma.pphTicketorders.findUnique({
          where: {ticket_order_id: item.ticket_order_id},
        });

        if (!ticketOrderExists) {
          missingTicketOrderCount++;
          canInsert = false;

          if (process.env.ENV === 'prd') {
            console.log(`Skipping ticket order item with ID ${item.ticket_order_item_id} due to non-existing ticket order with ID ${item.ticket_order_id}`);
          }
        }
      }

      // Check if the account exists
      if (item.account_id) {
        const accountExists = await prisma.pphAccounts.findUnique({
          where: {account_id: item.account_id},
        });

        if (!accountExists) {
          missingAccountCount++;
          canInsert = false;

          if (process.env.ENV === 'prd') {
            console.log(`Skipping ticket order item with ID ${item.ticket_order_item_id} due to non-existing account with ID ${item.account_id}`);
          }
        }
      }

      // Check if the contact exists
      if (item.contact_id) {
        const contactExists = await prisma.pphContacts.findUnique({
          where: {contact_id: item.contact_id},
        });

        if (!contactExists) {
          missingContactCount++;
          canInsert = false;

          if (process.env.ENV === 'prd') {
            console.log(`Skipping ticket order item with ID ${item.ticket_order_item_id} due to non-existing contact with ID ${item.contact_id}`);
          }
        }
      }

      if (canInsert) {
        await prisma.pphTicketorderitem.create({
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

    console.log(`PPH_Ticket_Order_Items seeding completed. Total Ticket Order Items processed: ${totalTicketOrderItemsCount}. Ticket Order Items skipped due to missing accounts: ${missingAccountCount}. Ticket Order Items skipped due to missing contacts: ${missingContactCount}. Ticket Order Items skipped due to missing Ticket Orders: ${missingTicketOrderCount}`);
  } catch (error) {
    console.error('Failed to seed PPH_ticketorderitems:', error);
  }
}

module.exports = seedPPHTicketOrderItems;
