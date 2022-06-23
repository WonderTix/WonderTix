export default interface CartItem {
  product_id: number; // references state.tickets.event_instance_id
  qty: number;
  name: string;
  desc: string;
  product_img_url: string;
  price: number;
}
