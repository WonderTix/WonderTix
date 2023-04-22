
export default interface Showing {
    id: number;
    eventid: string;
    eventdate: string;
    starttime: string;
    salestatus: boolean;
    totalseats: number;
    availableseats: number;
    ticketTypeId: number[],
    seatsForType: number[],
    purchaseuri: string;
    ispreview: boolean;
}