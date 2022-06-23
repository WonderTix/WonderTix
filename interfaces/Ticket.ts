export default interface Ticket {
  event_instance_id: number;
  eventid: string;
  admission_type: "General Admission";
  date: Date;
  ticket_price: number;
  concession_price: number;
  totalseats?: number;
  availableseats: number;
}
