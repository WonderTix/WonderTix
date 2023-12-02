import { Accommodations, CustomerInfo } from "../interfaces";

export const JANE_DOE: CustomerInfo = {
  firstName: 'Jane',
  lastName: 'Doe',
  fullName: 'Jane Doe',
  streetAddress: '618 William Street, Key West, FL',
  postCode: '33040',
  country: 'USA',
  phoneNumber: '(207)283-8797',
  email: 'jane.doe@wondertix.com',
  newsletterSignup: false,
  getConcession: false,
  donationAmount: '0',
  getNewsletter: false,
  heardAboutFrom: '',
  accommodations: Accommodations.ASL,
  comments: '',
};

export const JOHN_DOE: CustomerInfo = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: '',
  streetAddress: '8 Strawberry Ln, Yarmouth Port, MA',
  postCode: '02675',
  country: 'USA',
  phoneNumber: '',
  email: '',
  newsletterSignup: false,
  getConcession: false,
  donationAmount: '0',
  getNewsletter: false,
  heardAboutFrom: '',
  accommodations: Accommodations.None,
  comments: '',
};