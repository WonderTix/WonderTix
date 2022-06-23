import CartItem from "./CartItem";
import TicketsState from "./TicketsState";
import { LoadStatus } from "./LoadStatus";
import Event from "./Event";

export default interface ticketingState {
  cart: CartItem[];
  tickets: TicketsState;
  events: Event[];
  status: LoadStatus;
}
