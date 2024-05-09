import {RootState} from '../app/store';
import ticketReducer, {
  addTicketToCart,
  editItemQty,
  Ticket,
  TicketType,
  TicketRestriction,
  Event,
  ticketingState,
  selectEventData,
  selectCartTicketCount,
  selectTicketCartItem,
  selectCartSubtotal,
  DiscountItem,
  TicketCartItem,
} from './ticketingSlice';

const event: Event = {
  id: 1,
  title: 'Event 1',
  description: 'lorem ipsum donor',
  imageurl: 'https://test.com/image.jpg',
  soldOut: false,
};

const ticket1: Ticket = {
  event_instance_id: 1,
  eventid: 1,
  admission_type: 'General Admission - Adult',
  date: new Date('2021-07-31T19:00:00'),
  ticket_price: 15.99,
  availableseats: 34,
  remainingtickets: 34,
  detail: '',
};

const ticket2: Ticket = {
  event_instance_id: 2,
  eventid: 1,
  admission_type: 'General Admission - Adult',
  date: new Date('2021-08-07T16:00:00'),
  ticket_price: 19.99,
  availableseats: 20,
  remainingtickets: 20,
  detail: '',
};

const ticketType: TicketType = {
  id: 1,
  name: 'General Admission - Adult',
  price: '$20.00',
  fee: '$0.00',
};

const ticketRestriction1: TicketRestriction = {
  id: 1,
  eventinstanceid: 1,
  tickettypeid: 1,
  description: 'General Admission - Adult',
  fee: 0.00,
  price: 20.00,
  ticketlimit: 34,
  ticketssold: 0,
};

const ticketRestriction2: TicketRestriction = {
  id: 2,
  eventinstanceid: 2,
  tickettypeid: 1,
  description: 'General Admission - Adult',
  fee: 0.00,
  price: 20.00,
  ticketlimit: 20,
  ticketssold: 0,
};

const discount1: DiscountItem = {
  discountid: -1,
  code: '',
  amount: 0,
  percent: 0,
  min_tickets: 0,
  min_events: 0,
};

const ticketingInitState: ticketingState = {
  ticketCart: [],
  subscriptionCart: [],
  tickets: {
    data: {
      byId: {
        1: ticket1,
        2: ticket2,
      },
      allIds: [1, 2],
    },
  },
  ticketrestrictions: [ticketRestriction1, ticketRestriction2],
  tickettype: ticketType,
  events: [event],
  status: 'idle',
  discount: discount1,
};

const ROOT_INIT_STATE: RootState = {
  snackbar: {message: '', shown: false},
  ticketing: ticketingInitState,
  donation: {amount: 0},
};

describe('Ticketing slice', () => {
  const newCartItem: TicketCartItem = {
    product_id: ticket1.event_instance_id,
    eventId: 1,
    qty: 2,
    name: 'Event 1 Tickets',
    date: new Date('2021-07-31T19:00:00'),
    desc: 'General Admission - Adult - Sat, Jul 31 - 7:00 PM',
    product_img_url: 'https://test.com/image.jpg',
    price: 20,
    fee: 0,
    payWhatCan: false,
    typeID: 1,
  };

  describe('selectors', () => {
    const item1: TicketCartItem = {
      product_id: 1,
      eventId: 1,
      typeID: 1,
      qty: 2,
      name: 'thing',
      date: new Date('2021-08-08T16:00:00'),
      desc: 'desc1',
      product_img_url: 'www.com',
      payWhatCan: false,
      price: 2.99,
      fee: 0,
    };
    const init: RootState = {
      ...ROOT_INIT_STATE,
      ticketing: {
        ...ROOT_INIT_STATE.ticketing,
        ticketCart: [
          item1,
          {
            product_id: 2,
            eventId: 1,
            typeID: 1,
            qty: 4,
            name: 'thing2',
            date: new Date('2021-08-07T16:00:00'),
            desc: 'desc2',
            product_img_url: 'www.com',
            payWhatCan: false,
            price: 3.99,
            fee: 0,
          },
        ],
      },
    };

    it('selectCartSubtotal', () => {
      expect(selectCartSubtotal(init)).toEqual(item1.price*item1.qty + 4*3.99);
    });

    it('selectCartItem', () => {
      expect(selectTicketCartItem(init, 1, 1)).toEqual(item1);
    });

    it('selectCartTicketCount', () => {
      expect(selectCartTicketCount(init)).toEqual({1: 2, 2: 4});
    });

    it('selectEventData', () => {
      const eventid = 1;
      expect(selectEventData(ROOT_INIT_STATE, eventid))
        .toEqual({
          id: 1,
          title: 'Event 1',
          description: 'lorem ipsum donor',
          imageurl: 'https://test.com/image.jpg',
          soldOut: false,
          tickets: [{
            event_instance_id: 1,
            eventid: eventid,
            admission_type: 'General Admission - Adult',
            ticket_price: 15.99,
            availableseats: 34,
            remainingtickets: 34,
            date: new Date('2021-07-31T19:00:00'),
            detail: '',
          }, {
            event_instance_id: 2,
            eventid: eventid,
            admission_type: 'General Admission - Adult',
            ticket_price: 19.99,
            availableseats: 20,
            remainingtickets: 20,
            date: new Date('2021-08-07T16:00:00'),
            detail: '',
          }],
        });
    });

    it('Date data is deserialized', () => {
      const eventid = 1;
      const eventData = selectEventData(ROOT_INIT_STATE, eventid);
      expect(eventData!.tickets[0].date instanceof Date).toEqual(true);
    });
  });

  describe('reducers', () => {
    let init = ticketingInitState;
    it('addTicketReducer: new ticket', () => {
      const payload = {id: 1, tickettype: ticketType, qty: 2};
      const res = ticketReducer(init, addTicketToCart(payload));
      expect(res)
        .toEqual({
          ...ticketingInitState,
          tickets: {
            data: {
              ...ticketingInitState.tickets.data,
              byId: {
                ...ticketingInitState.tickets.data.byId,
                [1]: {
                  ...ticketingInitState.tickets.data.byId[1],
                  availableseats: ticketingInitState.tickets.data.byId[1].availableseats - 2,
                },
              },
            },
          },
          ticketCart: [newCartItem],
        });
      init = res;
    });

    it('addTicketReducer: exists in cart', () => {
      const payload = {id: 1, tickettype: ticketType, qty: 1};
      expect(ticketReducer(init, addTicketToCart(payload)))
        .toEqual({
          ...init,
          tickets: {
            data: {
              ...init.tickets.data,
              byId: {
                ...init.tickets.data.byId,
                [1]: {
                  ...init.tickets.data.byId[1],
                  availableseats: init.tickets.data.byId[1].availableseats - 1,
                },
              },
            },
          },
          ticketCart: [{...newCartItem, qty: 3}],
        });
    });

    // ticket 1 currently in cart
    it('editItemQty: can set qty = available', () => {
      expect(ticketReducer(init, editItemQty({id: 1, tickettypeId: 1, qty: ticket1.availableseats})))
        .toEqual({
          ...init,
          tickets: {
            data: {
              ...init.tickets.data,
              byId: {
                ...init.tickets.data.byId,
                [1]: {
                  ...init.tickets.data.byId[1],
                  availableseats: 0,
                },
              },
            },
          },
          ticketCart: [{...newCartItem, qty: ticket1.availableseats}],
        });
    });

    it('editItemQty: can\'t set qty > available', () => {
      expect(ticketReducer(init, editItemQty({id: 1, tickettypeId: 1, qty: ticket1.availableseats + 1})))
        .toEqual({
          ...init,
          tickets: {
            data: {
              ...init.tickets.data,
              byId: {
                ...init.tickets.data.byId,
                [1]: {
                  ...init.tickets.data.byId[1],
                  availableseats: 0,
                },
              },
            },
          },
          ticketCart: [{...newCartItem, qty: ticket1.availableseats}],
        });
    });

    it('editItemQty: item exists in cart', () => {
      const res = ticketReducer(init, editItemQty({id: 1, tickettypeId: 1, qty: 4}));
      expect(res)
        .toEqual({
          ...init,
          tickets: {
            data: {
              ...init.tickets.data,
              byId: {
                ...init.tickets.data.byId,
                [1]: {
                  ...init.tickets.data.byId[1],
                  availableseats: ticket1.availableseats-4,
                },
              },
            },
          },
          ticketCart: [{...newCartItem, qty: 4}],
        });
      init = res;
    });

    it('editItemQty: item not in cart', () => {
      expect(ticketReducer(init, editItemQty({id: 2, tickettypeId: 1, qty: 4})))
        .toEqual({...init});
    });

    it('editItemQty: can\'t set negative qty', () => {
      expect(ticketReducer(init, editItemQty({id: 1, tickettypeId: 1, qty: -1})))
        .toEqual({
          ...init,
          tickets: {
            data: {
              ...init.tickets.data,
              byId: {
                ...init.tickets.data.byId,
                [1]: {
                  ...init.tickets.data.byId[1],
                  availableseats: ticket1.availableseats,
                },
              },
            },
          },
          ticketCart: [{...newCartItem, qty: 0}],
        });
    });
  });
});
