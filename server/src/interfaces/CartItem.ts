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
 * **/
export default interface CartItem {
  product_id: number; // references state.tickets.event_instance_id
  eventId: number;
  qty: number;
  name: string;
  desc: string;
  product_img_url: string;
  price: number;
  payWhatCan: boolean;
  payWhatPrice?: number;
  typeID: number;
}
