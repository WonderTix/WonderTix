
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
  contactId?: number,
  orders?: any,
  donations?: any,
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

export const toReadableDonationFrequency = (key: string): string => {
   switch (key) {
     case 'one-time':
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

export const editContact = async (contact: Contact, contactId: number, token: string) => {
  if (contact.seatingAcc === 'Other') {
    contact.seatingAcc = contact.comments;
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
          donorbadge: contact.donorBadge,
          seatingaccom: contact.seatingAcc,
          vip: contact.vip,
          volunteerlist: contact.volunteerList,
          newsletter: contact.newsletter,
        }),
      },
    );

    if (!response.ok) {
      console.error('Failed to remove customer');
    }
    return response.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteContact = async (contactId: number, token: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_2_URL + `/contact/${contactId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to remove customer');
    }
    return response.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};
