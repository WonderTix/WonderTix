/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable require-jsdoc */
import {appendShortUUID} from './supportFunctions/uuidFunctions';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  streetAddress: string;
  postCode: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  email: string;
  newsletterSignup: boolean;
  donationAmount: string;
  getNewsletter: boolean;
  heardAboutFrom: string;
  accommodations: Accommodations;
  comments: string;
}

export enum Accommodations {
  None = 'None',
  Wheelchair = 'Wheel Chair',
  Aisle = 'Aisle Seat',
  Ground = 'First/Ground floor',
  ASL = 'ASL Interpreter',
  Wide = 'Wide Seats',
  Other = 'Other',
}

export const seatingAccOptions = {
  'None': 'Not at this time',
  'Wheel Chair': 'Wheelchair seat(s)',
  'Aisle Seat': 'Aisle seat(s)',
  'First/Ground floor': 'Seat(s) on the ground or the first level',
  'ASL Interpreter': 'Seat(s) in the ASL interpreters section',
  'Wide Seats': 'Wide seat(s)',
  'Other': 'Other',
};

function generatePhoneNumber() {
  // Generates a random 10-digit phone number
  const randomDigits = () => Math.floor(Math.random() * 9000000000) + 1000000000;
  return `(${randomDigits().toString().substring(0, 3)}) ${randomDigits().toString().substring(3, 6)}-${randomDigits().toString().substring(6, 10)}`;
}
export class CustomerInfo {
  constructor(customer: CustomerInfo) {
    this.firstName = appendShortUUID(customer.firstName);
    this.lastName = customer.lastName;
    this.fullName = this.firstName + ' ' + this.lastName;
    this.streetAddress = customer.streetAddress;
    this.postCode = customer.postCode;
    this.city = customer.city;
    this.state = customer.state;
    this.country = customer.country;
    if (customer.phoneNumber == '') {
      this.phoneNumber = generatePhoneNumber();
    } else {
      this.phoneNumber = customer.phoneNumber;
    }
    if (customer.email == '') {
      this.email = this.firstName + this.lastName + '@wondertix.com';
    } else {
      this.email = customer.email;
    }
    this.newsletterSignup = customer.newsletterSignup;
    this.donationAmount = customer.donationAmount;
    this.getNewsletter = customer.getNewsletter;
    this.heardAboutFrom = customer.heardAboutFrom;
    this.accommodations = customer.accommodations;
    this.comments = customer.comments;
  }
}

export const JANE_DOE: CustomerInfo = {
  firstName: 'Jane',
  lastName: 'Doe',
  fullName: 'Jane Doe',
  streetAddress: '618 William Street, Key West, FL',
  postCode: '33040',
  city: 'Portland',
  state: 'OR',
  country: 'USA',
  phoneNumber: '(207) 283-8797',
  email: 'jane.doe@wondertix.com',
  newsletterSignup: false,
  donationAmount: '0',
  getNewsletter: false,
  heardAboutFrom: '',
  accommodations: Accommodations.Wheelchair,
  comments: '',
};

export const JOHN_DOE: CustomerInfo = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: '',
  streetAddress: '8 Strawberry Ln, Yarmouth Port, MA',
  postCode: '02675',
  city: 'Portland',
  state: 'OR',
  country: 'USA',
  phoneNumber: '',
  email: '',
  newsletterSignup: false,
  donationAmount: '0',
  getNewsletter: false,
  heardAboutFrom: '',
  accommodations: Accommodations.None,
  comments: '',
};
