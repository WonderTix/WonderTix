export default interface Showing {
    id: number;
    eventid: string;
    eventdate: string;
    starttime: string;
    salestatus: boolean;
    totalseats: number;
    availableseats: number;
    tickettype: number; // ticket type ID
    purchaseuri: string;
}
