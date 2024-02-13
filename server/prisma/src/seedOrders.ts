import {freq, PrismaClient} from '@prisma/client';
import {updateAvailableSeats} from '../../src/controllers/orderController.service';

/**
 * seed orders
 * @param {PrismaClient} prisma
 */
export default async function seedOrders(prisma: PrismaClient) {
  try {
    const contacts = await prisma.contacts.findMany();
    const ticketRestrictions= await prisma.ticketrestrictions.findMany();
    const orders:any[] = [];
    contacts.forEach(
        (contact, index) => {
          if (!ticketRestrictions.length) return;
          const restriction = ticketRestrictions[index%ticketRestrictions.length];
          const orderItemCount = Math.floor((Math.random()*Math.min(5, restriction.ticketlimit)))+1;
          restriction.ticketlimit-=orderItemCount;
          if (!restriction.ticketlimit) ticketRestrictions.splice(ticketRestrictions.indexOf(restriction), 1);
          orders.push(prisma.orders.create({
            data: {
              contactid_fk: contact.contactid,
              payment_intent: `seeded-order-${index}`,
              ...(!(index%4) && {
                donation: {
                  create: {
                    amount: (Math.random()*150)+1,
                    frequency: freq.one_time,
                    comments: 'Seeded Donation',
                  },
                },
              }),
              order_ticketitems: {
                create: Array(orderItemCount).fill({
                  price: restriction?.price,
                  ticketitem: {
                    create: {
                      ticketrestrictionid_fk: restriction?.ticketrestrictionsid,
                    },
                  },
                }),
              },
            },
          }));
        });
    await prisma.$transaction(orders);
    await updateAvailableSeats(prisma, (await prisma.eventinstances.findMany({select: {eventinstanceid: true}})).map((event) => event.eventinstanceid));
  } catch (error) {
    console.error(error);
  }
}

