import Ticket from "./Ticket";
export default interface TicketsState {
  byId: { [key: number]: Ticket };
  allIds: number[];
}
