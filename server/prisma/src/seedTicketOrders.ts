import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import notes from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedTicketOrders(prisma: PrismaClient) {
  try {
    const ticketOrdersCount = await prisma.ticketorders.count();
    if (ticketOrdersCount > 0) {
      console.log('TicketOrders table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/ticketorders.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      ticket_order_id: item.ticket_order_id,
      account_id: item.account_id,
      contact_id: item.contact_id,
      ticket_order_name: item.ticket_order_name,
      type: item.type,
      order_status: item.order_status,
      subscription_status: item.subscription_status,
      email: item.email,
      phone: item.phone,
      other_phone: item.other_phone,
      street_address: item.street_address,
      city: item.city,
      state: item.state,
      postal_code: item.postal_code,
      country: item.country,
      shipping_first_name: item.shipping_first_name,
      shipping_last_name: item.shipping_last_name,
      shipping_stress_address: item.shipping_stress_address,
      shipping_city: item.shipping_city,
      shipping_state: item.shipping_state,
      shipping_postal_code: item.shipping_postal_code,
      shipping_country: item.shipping_country,
      order_origin: item.order_origin,
      order_source: item.order_source,
      payment_method: item.payment_method,
      amount_paid: item.amount_paid || 0.0,
      fees: item.fees || 0.0,
      exchange_fee: item.exchange_fee || 0.0,
      donation_id: item.donation_id,
      donation_amount: item.donation_amount || 0.0,
      delivery_method: item.delivery_method,
      salutation: item.salutation,
      shipping_salutation: item.shipping_salutation,
      email_opt_in: item.email_opt_in || 0,
      anonymous_purchase_flag: item.anonymous_purchase_flag,
      update_contact_record: item.update_contact_record || 0.0,
      send_confirmation_email_flag: item.send_confirmation_email_flag || 0.0,
      request_accommodation: item.request_accommodation,
      external_id: item.external_id,
      comments: item.comments,
      notes: item.notes,
      create_date: item.create_date ? new Date(item.create_date) : new Date(),
      last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : new Date(),
    }));

    await prisma.ticketorders.createMany({
      data: preparedData,
    });

    console.log('TicketOrders seeding completed.');
  } catch (error) {
    console.error('Failed to seed ticketorders:', error);
  }
}

module.exports = seedTicketOrders;
