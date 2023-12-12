import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import ticket orders from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedPPHTicketOrders(prisma: PrismaClient) {
  let totalTicketOrderCount = 0;
  let missingAccountCount = 0;
  let missingContactCount = 0;
  let duplicateTicketOrderCount = 0;

  try {
    const ticketOrdersCount = await prisma.pphTicketorders.count();
    if (ticketOrdersCount > 0) {
      console.log('PPH_TicketOrders table already seeded.');
      return;
    }

    const yamlDataPath = process.env.SEED_DATA || './yaml-seeder-data';
    const yamlData = fs.readFileSync(`${yamlDataPath}/PPH_ticketorders.yaml`, 'utf8');
    const data = yaml.load(yamlData);

    for (const item of data) {
      totalTicketOrderCount++;
      let canInsert = true;

      // Check to see if the ticket order already exists in the table
      const existingTicketOrder = await prisma.pphTicketorders.findUnique({
        where: {ticket_order_id: item.ticket_order_id},
      });

      // Skip the ticket order if it already exists
      if (existingTicketOrder) {
        duplicateTicketOrderCount++;
        if (process.env.ENV === 'prd') {
          console.log(`Skipping existing ticket order with ID ${item.ticket_order_id}. It already exists in the table`);
        }
        continue;
      }

      if (item.account_id) {
        const accountExists = await prisma.pphAccounts.findUnique({
          where: {account_id: item.account_id},
        });
        if (!accountExists) {
          missingAccountCount++;
          canInsert = false;

          if (process.env.ENV === 'prd') {
            console.log(`Skipping ticket order with ID ${item.ticket_order_id} due to non-existing account with ID ${item.account_id}`);
          }
        }
      }

      if (item.contact_id) {
        const contactExists = await prisma.pphContacts.findUnique({
          where: {contact_id: item.contact_id},
        });
        if (!contactExists) {
          missingContactCount++;
          canInsert = false;

          if (process.env.ENV === 'prd') {
            console.log(`Skipping ticket order with ID ${item.ticket_order_id} due to non-existing contact with ID ${item.contact_id}`);
          }
        }
      }

      if (canInsert) {
        await prisma.pphTicketorders.create({
          data: {
            ticket_order_id: item.ticket_order_id,
            account_id: item.account_id || null,
            contact_id: item.contact_id || null,
            ticket_order_name: item.ticket_order_name,
            type: item.type,
            order_status: item.order_status,
            subscription_status: item.subscription_status,
            email: item.email,
            phone: String(item.phone),
            other_phone: String(item.other_phone),
            street_address: item.street_address,
            city: item.city,
            state: item.state,
            postal_code: String(item.postal_code),
            country: String(item.country),
            shipping_first_name: item.shipping_first_name,
            shipping_last_name: item.shipping_last_name,
            shipping_stress_address: item.shipping_stress_address,
            shipping_city: item.shipping_city,
            shipping_state: item.shipping_state,
            shipping_postal_code: String(item.shipping_postal_code),
            shipping_country: item.shipping_country,
            order_origin: item.order_origin,
            order_source: item.order_source,
            payment_method: item.payment_method,
            amount_paid: item.amount_paid || 0.0,
            fees: item.fees || 0.0,
            exchange_fee: isNaN(item.exchange_fee) ? null : item.exchange_fee || 0.0,
            donation_id: item.donation_id !== null ? parseInt(item.donation_id, 10) : null,
            donation_amount: isNaN(item.donation_amount) ? null : item.donation_amount || 0.0,
            delivery_method: item.delivery_method,
            salutation: item.salutation,
            shipping_salutation: item.shipping_salutation,
            email_opt_in: item.email_opt_in || 0,
            anonymous_purchase_flag: isNaN(item.anonymous_purchase_flag) ? null : item.anonymous_purchase_flag || 0,
            update_contact_record: isNaN(item.update_contact_record) ? null : item.update_contact_record || 0.0,
            send_confirmation_email_flag: isNaN(item.send_confirmation_email_flag) ? null : item.send_confirmation_email_flag || 0.0,
            request_accommodation: item.request_accommodation,
            external_id: item.external_id !== null ? parseInt(item.external_id, 10) : null,
            comments: item.comments,
            notes: item.notes,
            create_date: item.create_date ? new Date(item.create_date) : new Date(),
            last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : new Date(),
          },
        });
      }
    }
    console.log(`PPH_Ticket_Order seeding completed. Total Ticket Order Items processed: ${totalTicketOrderCount}. Ticket Orders skipped due to missing accounts: ${missingAccountCount}. Ticket Orders skipped due to missing contacts: ${missingContactCount}. Ticket Orders skipped due to duplicate Ticket Order ID's: ${duplicateTicketOrderCount}.`);
  } catch (error) {
    console.error('Failed to seed PPH_ticketorders:', error);
  }
}

module.exports = seedPPHTicketOrders;
