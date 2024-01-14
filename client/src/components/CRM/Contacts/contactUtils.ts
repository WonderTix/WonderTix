/**
 * Type for information relating to a contact.
 */
export type Contact = {
  first: string,
  last: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  country: string,
  postalCode: string,
  comments?: string,
  seatingAcc: string,
  newsletter: boolean,
  vip: boolean,
  donorBadge: boolean,
  volunteerList: boolean,
  contactId?: number,
}

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
};

export const editContact = async (contact: Contact, contactId: number, token: string) => {
  contact.seatingAcc = !contact.comments ? contact.seatingAcc : `${contact.seatingAcc} - ${contact.comments}`;

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
    const response = await fetch(process.env.REACT_APP_API_2_URL + `/contact/${contactId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to remove contact');
    }
    return response.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};
