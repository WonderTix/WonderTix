import {freq, state, type} from '@prisma/client';
import {updateAvailableSeats} from '../../src/controllers/orderController.service';
import {ExtendedPrismaClient} from '../../src/controllers/PrismaClient/GetExtendedPrismaClient';

/**
 * seed orders
 * @param {ExtendedPrismaClient} prisma
 */
export default async function seedOrders(prisma: ExtendedPrismaClient) {
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
            order_status: state.completed,
            contactid_fk: contact.contactid,
            ordersubtotal: (Number(restriction.price) * orderItemCount),
            refundtotal: 0,
            orderitems: {
              create: [
                ...Array(orderItemCount).fill({
                  price: restriction?.price,
                  fee: restriction?.fee,
                  type: type.ticket,
                  ticketitem: {
                    create: {
                      ticketrestrictionid_fk: restriction?.ticketrestrictionsid,
                    },
                  },
                }),
                ...(!(index%4)? [{
                  price: (Math.floor(Math.random()*150)+1),
                  fee: 0,
                  type: type.donation,
                  donation: {
                    create: {
                      frequency: freq.one_time,
                      comments: 'Seeded Donation',
                    },
                  },
                }] : []),
              ],
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

