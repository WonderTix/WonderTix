import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import transactions from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedTransactions(prisma: PrismaClient) {
  try {
    const transactionsCount = await prisma.transactions.count();
    if (transactionsCount > 0) {
      console.log('Transactions table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/transactions.yaml', 'utf8');
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
          console.log(`Skipping transaction with ID ${item.transaction_id} due to non-existing ticket order with ID ${item.ticket_order_id}`);
        }
      }

      // Check if the ticket order item exists
      if (item.ticket_order_item_id) {
        const ticketOrderItemExists = await prisma.ticketorderitem.findUnique({
          where: {ticket_order_item_id: item.ticket_order_item_id},
        });

        if (!ticketOrderItemExists) {
          canInsert = false;
          console.log(`Skipping transaction with ID ${item.transaction_id} due to non-existing ticket order item with ID ${item.ticket_order_item_id}`);
        }
      }

      if (canInsert) {
        await prisma.transactions.create({
          data: {
            transaction_id: item.transaction_id,
            patron_transaction_id: item.patron_transaction_id,
            ticket_order_id: item.ticket_order_id,
            item_id: item.item_id,
            ticket_order_item_id: item.ticket_order_item_id,
            item_type: item.item_type,
            item_name: item.item_name,
            payment_method: item.payment_method,
            status: item.status,
            payment_processor: item.payment_processor,
            exchange_type: item.exchange_type,
            order_origin: item.order_origin,
            entry_method: item.entry_method,
            credit_card_entry_method: item.credit_card_entry_method,
            credit_card_last_four: isNaN(item.credit_card_last_four) ? null : item.credit_card_last_four,
            name_on_card: item.name_on_card,
            first_name: item.first_name,
            last_name: item.last_name,
            transaction_date: item.transaction_date ? new Date(item.transaction_date) : new Date(),
            create_date: item.create_date ? new Date(item.create_date) : new Date(),
            quantity: item.quantity || 0.0,
            buyer_unit_price: item.buyer_unit_price || 0.0,
            gross_unit_price: item.gross_unit_price || 0.0,
            buyer_unit_fee: item.buyer_unit_fee || 0.0,
            patron_tech_unit_fee: item.patron_tech_unit_fee || 0.0,
            unit_fee: item.unit_fee || 0.0,
            total_item_quantity: item.total_item_quantity || 0.0,
            buyer_fee_line_item_sub_total: item.buyer_fee_line_item_sub_total || 0.0,
            patron_tech_fee_line_item_sub_total: item.patron_tech_fee_line_item_sub_total || 0.0,
            shipping_fee: item.shipping_fee || 0.0,
            exchange_fee: isNaN(item.exchange_fee) ? null : item.exchange_fee || 0.0,
            discount_amount: item.discount_amount || 0.0,
            donation_amount: isNaN(item.donation_amount) ? null : item.donation_amount || 0.0,
            full_buyer_cost: item.full_buyer_cost || 0.0,
            full_gross_amount: item.full_gross_amount || 0.0,
            transaction_total: item.transaction_total || 0.0,
            amount_tendered: isNaN(item.amount_tendered) ? null : item.amount_tendered || 0.0,
            capture_transaction_id: item.capture_transaction_id || 0.0,
            // Relations like ticketorders and ticketorderitem are managed by Prisma and should not be included directly in the seeding.
          },
        });
      }
    }

    console.log('Transactions seeding completed.');
  } catch (error) {
    console.error('Failed to seed transactions:', error);
  }
}

module.exports = seedTransactions;
