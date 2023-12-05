import {RootState} from '../../app/store';
import {INITIAL_STATE as eventsInitState} from '../Events/events_pages/eventsSlice';
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
  selectCartItem,
  selectCartSubtotal,
  DiscountItem,
  CartItem,
} from './ticketingSlice';

const event: Event = {
  id: '1',
  title: 'Event 1',
  description: 'lorem ipsum donor',
  imageurl: 'https://test.com/image.jpg',
};

const ticket1: Ticket = {
  event_instance_id: 1,
  eventid: '1',
  admission_type: 'General Admission - Adult',
  date: new Date('2021-07-31T19:00:00'),
  ticket_price: 15.99,
  concession_price: 4.99,
  availableseats: 34,
};

const ticket2: Ticket = {
  event_instance_id: 2,
  eventid: '1',
  admission_type: 'General Admission - Adult',
  date: new Date('2021-08-07T16:00:00'),
  ticket_price: 19.99,
  concession_price: 9.99,
  availableseats: 20,
};

const ticketType: TicketType = {
  id: 1,
  name: 'General Admission - Adult',
  price: '$20.00',
  concessions: '$0.00',
};

const ticketRestriction1: TicketRestriction = {
  id: 1,
  eventinstanceid: 1,
  tickettypeid: 1,
  description: 'General Admission - Adult',
  concessionprice: '0.00',
  price: '20.00',
  ticketlimit: 34,
  ticketssold: 0,
};

const ticketRestriction2: TicketRestriction = {
  id: 2,
  eventinstanceid: 2,
  tickettypeid: 1,
  description: 'General Admission - Adult',
  concessionprice: '0.00',
  price: '20.00',
  ticketlimit: 20,
  ticketssold: 0,
};

const discount1: DiscountItem = {
  code: '',
  amount: 0,
  percent: 0,
  minTickets: 0,
  minEvents: 0,
};

const ticketingInitState: ticketingState = {
  cart: [],
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
  events: eventsInitState,
  snackbar: {message: '', shown: false},
  ticketing: ticketingInitState,
  donation: {amount: 0},
};

describe('Ticketing slice', () => {
  const newCartItem: CartItem = {
    product_id: ticket1.event_instance_id,
    qty: 2,
    name: 'Event 1 Tickets',
    date: new Date('2021-07-31T19:00:00'),
    desc: 'General Admission - Adult - Sat, Jul 31 - 7:00 PM',
    product_img_url: 'https://test.com/image.jpg',
    price: 20,
    payWhatCan: false,
    typeID: 1,
  };

  const concessionsItem = {
    ...newCartItem,
    name: 'Event 1 Tickets + Concessions',
    price: newCartItem.price + ticket1.concession_price,
    desc: newCartItem.desc + ' with concessions ticket',
  };

  describe('selectors', () => {
    const item1: CartItem = {
      product_id: 1,
      typeID: 1,
      qty: 2,
      name: 'thing',
      date: new Date('2021-08-08T16:00:00'),
      desc: 'desc1',
      product_img_url: 'www.com',
      payWhatCan: false,
      price: 2.99,
    };
    const init: RootState = {
      ...ROOT_INIT_STATE,
      ticketing: {
        ...ROOT_INIT_STATE.ticketing,
        cart: [
          item1,
          {
            product_id: 2,
            typeID: 1,
            qty: 4,
            name: 'thing2',
            date: new Date('2021-08-07T16:00:00'),
            desc: 'desc2',
            product_img_url: 'www.com',
            payWhatCan: false,
            price: 3.99,
          }],
      },
    };

    it('selectCartSubtotal', () => {
      expect(selectCartSubtotal(init)).toEqual(item1.price*item1.qty + 4*3.99);
    });

    it('selectCartItem', () => {
      expect(selectCartItem(init, 1, 1)).toEqual(item1);
    });

    it('selectCartTicketCount', () => {
      expect(selectCartTicketCount(init)).toEqual({1: 2, 2: 4});
    });

    it('selectEventData', () => {
      const eventid = '1';
      expect(selectEventData(ROOT_INIT_STATE, eventid))
        .toEqual({
          id: '1',
          title: 'Event 1',
          description: 'lorem ipsum donor',
          imageurl: 'https://test.com/image.jpg',
          tickets: [{
            event_instance_id: 1,
            eventid: eventid,
            admission_type: 'General Admission - Adult',
            ticket_price: 15.99,
            concession_price: 4.99,
            availableseats: 34,
            date: new Date('2021-07-31T19:00:00'),
          }, {
            event_instance_id: 2,
            eventid: eventid,
            admission_type: 'General Admission - Adult',
            ticket_price: 19.99,
            concession_price: 9.99,
            availableseats: 20,
            date: new Date('2021-08-07T16:00:00'),
          }],
        });
    });

    it('Date data is deserialized', () => {
      const eventid = '1';
      const eventData = selectEventData(ROOT_INIT_STATE, eventid);
      expect(eventData!.tickets[0].date instanceof Date).toEqual(true);
    });
  });

  describe('reducers', () => {
    let init = ticketingInitState;
    it('addTicketReducer: new ticket', () => {
      const payload = {id: 1, tickettype: ticketType, qty: 2, concessions: false};
      const res = ticketReducer(init, addTicketToCart(payload));
      expect(res)
        .toEqual({
          ...ticketingInitState,
          cart: [newCartItem],
        });
      init = res;
    });

    it('addTicketReducer: exists in cart', () => {
      const payload = {id: 1, tickettype: ticketType, qty: 1, concessions: false};
      expect(ticketReducer(init, addTicketToCart(payload)))
        .toEqual({
          ...init,
          cart: [{...newCartItem, qty: 3}],
        });
    });

    it('addTicketReducer: in cart & add concessions', () => {
      const res = ticketReducer(init, addTicketToCart({id: 1, tickettype: ticketType, qty: 1, concessions: true}));
      expect(res).toEqual({...init, cart: [{...concessionsItem, qty: 3}]});
      init = res;
    });

    it('addTicketReducer: in cart (w/ concession) & add w/o concessions', () => {
      const res = ticketReducer(init, addTicketToCart({id: 1, tickettype: ticketType, qty: 1, concessions: false}));
      expect(res).toEqual({...init, cart: [{...concessionsItem, qty: 4}]});
      init = res;
    });

    // ticket 1 currently in cart
    it('editItemQty: can set qty = available', () => {
      expect(ticketReducer(init, editItemQty({id: 1, tickettypeId: 1, qty: ticket1.availableseats})))
        .toEqual({...init, cart: [{...concessionsItem, qty: ticket1.availableseats}]});
    });

    it('editItemQty: can\'t set qty > available', () => {
      expect(ticketReducer(init, editItemQty({id: 1, tickettypeId: 1, qty: ticket1.availableseats + 1})))
        .toEqual({...init, cart: [{...concessionsItem, qty: ticket1.availableseats}]});
    });

    it('editItemQty: item exists in cart', () => {
      const res = ticketReducer(init, editItemQty({id: 1, tickettypeId: 1, qty: 4}));
      expect(res)
        .toEqual({...init, cart: [{...concessionsItem, qty: 4}]});
      init = res;
    });

    it('editItemQty: item not in cart', () => {
      expect(ticketReducer(init, editItemQty({id: 2, tickettypeId: 1, qty: 4})))
        .toEqual({...init});
    });

    it('editItemQty: can\'t set negative qty', () => {
      expect(ticketReducer(init, editItemQty({id: 1, tickettypeId: 1, qty: -1})))
        .toEqual({...init, cart: [{...concessionsItem, qty: 0}]});
    });
  });
});


