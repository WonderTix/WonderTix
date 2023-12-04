// Enums for the standard dropdowns
export enum Accommodations {
  None = 'None',
  Wheelchair = 'Wheel Chair',
  Aisle = 'Aisle Seat',
  Ground = 'First/Ground floor',
  ASL = 'ASL Interpreter',
  Wide = 'Wide Seats',
  Other = 'Other',
}
export interface EventInfo {
  eventName: string;
  eventDescription: string;
  eventURL: string;
  eventFullName: string;
}

export interface ShowingInfo {
  showingDate: string;
  showingTime: string;
  showingQuantity: string;
  showingWholeDate: string;
  showingDateTime: string;
}

export interface SeasonInfo {
  seasonName: string;
  seasonStart: string;
  seasonEnd: string;
  seasonImgURL: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  streetAddress: string;
  postCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  newsletterSignup: boolean;
  getConcession: boolean;
  donationAmount: string;
  getNewsletter: boolean;
  heardAboutFrom: string;
  accommodations: Accommodations;
  comments: string;
}

// Credit card info, to be used in conjunction with the Stripe test card numbers
export interface CreditCardInfo {
  cardNumber: string;
  CVC: string;
  date: string;
}