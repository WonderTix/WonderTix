/**
 * Interface for the tickets (eventually subscriptions) to events
 *
 * @param {string} product_id - references event that ticket is purchased for
 *
 * @param {number} qty - amount of tickets in the cart
 *
 * @param {string} name - name of the event
 *
 * @param {string} desc - description of the event
 *
 * @param {string} product_img_url - thumbnail of event
 *
 * @param {number} price - price of the item (event) added to cart
 * **/

export default interface CartItem {
  product_id: number; // references state.tickets.event_instance_id
  qty: number;
  name: string;
  desc: string;
  product_img_url: string;
  price: number;
}
