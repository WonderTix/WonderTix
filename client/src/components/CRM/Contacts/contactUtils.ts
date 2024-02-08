/**
 * Type for information relating to a contact.
 */
export type Contact = {
  first: string;
  last: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  comments: string;
  seatingAcc: string;
  otherSeatingAcc?: string;
  newsletter: boolean;
  vip: boolean;
  donorBadge: boolean;
  volunteerList: boolean;
  contactId?: number;
  orders?: any;
  donations?: any;
  createdDate: string;
};

export const emptyContact: Contact = {
  first: '',
  last: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  comments: '',
  seatingAcc: 'None',
  newsletter: false,
  vip: false,
  donorBadge: false,
  volunteerList: false,
  createdDate: '',
};

export const seatingAccOptions = {
  'None': 'Not at this time',
  'Wheel Chair': 'Wheelchair seat(s)',
  'Aisle Seat': 'Aisle seat(s)',
  'First/Ground floor': 'Seat(s) on the ground or the first level',
  'ASL Interpreter': 'Seat(s) in the ASL interpreters section',
  'Wide Seats': 'Wide seat(s)',
  'Other': 'Other',
};

export const seatingAccInOptions = (value: string) => {
  return Object.keys(seatingAccOptions).includes(value);
};

export const toReadableDonationFrequency = (key: string): string => {
   switch (key) {
     case 'one_time':
       return 'One-time';
     case 'weekly':
       return 'Weekly';
     case 'monthly':
       return 'Monthly';
     case 'yearly':
       return 'Yearly';
     default:
       return key;
   }
};

export const editContact = async (
  contact: Contact,
  contactId: number,
  token: string,
) => {
  if (contact.seatingAcc === 'Other') {
    contact.seatingAcc = contact.otherSeatingAcc;
  }

  try {
    const response = await fetch(
      process.env.REACT_APP_API_2_URL + `/contact/${contactId}`,
      {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: contact.first,
          lastname: contact.last,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          city: contact.city,
          state: contact.state,
          country: contact.country,
          postalcode: contact.postalCode,
          donorbadge: contact.donorBadge,
          seatingaccom: contact.seatingAcc,
          comments: contact.comments,
          vip: contact.vip,
          volunteerlist: contact.volunteerList,
          newsletter: contact.newsletter,
        }),
      },
    );

    if (!response.ok) {
      console.error('Failed to update contact');
    }
    return response.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteContact = async (contactId: number, token: string) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_2_URL + `/contact/${contactId}`,
      {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      console.error('Failed to remove contact');
    }
    return response.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};
