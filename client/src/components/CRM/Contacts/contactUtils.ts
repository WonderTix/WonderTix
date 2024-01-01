/**
 * Type for information relating to a contact.
 */
export type Contact = {
  first: string,
  last: string,
  email: string,
  phone: string,
  address: string,
  comments?: string,
  seatingAcc: string,
  newsletter: boolean,
  vip: boolean,
  donorBadge: boolean,
  volunteerList: boolean,
}

export const emptyContact: Contact = {
  first: '',
  last: '',
  email: '',
  phone: '',
  address: '',
  comments: '',
  seatingAcc: 'None',
  newsletter: false,
  vip: false,
  donorBadge: false,
  volunteerList: false,
};
