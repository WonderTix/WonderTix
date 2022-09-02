export default interface Ticket {
  event_instance_id: number;
  eventid: string;
  admission_type: 'General Admission' | 'Pay What You Can';
  payWhatYouCan?: number;
  date: Date;
  ticket_price: number;
  concession_price: number;
  totalseats?: number;
  availableseats: number;
}
