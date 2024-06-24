export interface CartItem {
  name: string;
  desc: string;
  qty: number;
  price: number;
  product_img_url: string;
  department?: string;
}

/**
 * Interface for the tickets (eventually subscriptions) to events
 *
 * @param {number} product_id - references event that ticket is purchased for
 * @param {number} eventId - id of event in cart item
 * @param {number} qty - amount of tickets in the cart
 * @param {string} name - name of the event
 * @param {string} desc - description of the event
 * @param {string} product_img_url - thumbnail of event
 * @param {number} price - price of the item (event) added to cart
 * @param {boolean} payWhatCan
 * @param {number?} payWhatPrice
 * @param {number} typeID - id of ticket type
 */
export default interface TicketCartItem extends CartItem {
  product_id: number; // references state.tickets.event_instance_id
  eventId: number;
  payWhatCan: boolean;
  payWhatPrice?: number;
  typeID: number;
  fee?: number;
};

export interface SubscriptionCartItem extends CartItem {
  seasonid_fk: number;
  subscriptiontypeid_fk: number;
  qtyAvailable: number;
}

export interface RefundCartItem {
  orderItemId: number;
  refundFee: boolean;
}
