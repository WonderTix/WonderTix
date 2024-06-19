import React from 'react';
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {Tooltip} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import IconButton from '../../Ticketing/IconButton';
import {VerticalDotsIcon} from '../../Ticketing/Icons';
import {useEffect, useState} from 'react';
import {getData} from '../../Ticketing/ticketingmanager/Event/components/ShowingUtils';

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
  visitSource: string;
  seatingAcc: string;
  otherSeatingAcc?: string;
  newsletter: Date | null;
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
  visitSource: '',
  seatingAcc: 'None',
  newsletter: null,
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
          visitsource: contact.visitSource,
          vip: contact.vip,
          volunteerlist: contact.volunteerList,
          newsletter: contact.newsletter,
        }),
      },
    );

    if (!response.ok) {
      throw response;
    }
    return null;
  } catch (error) {
    return error.json ? (await error.json()).error : 'Failed to edit contact';
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

export const useFetchContacts = (
  token: string,
  queries: {parameter: string; value: string}[],
  setPopUpProps,
) => {
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    const queryString = queries
      .filter(({value}) => value)
      .map(({parameter, value}) => `${parameter}=${value.trim()}`)
      .join('&');

    getData(
      `${process.env.REACT_APP_API_2_URL}/contact/?${queryString}`,
      (data) => {
        setContacts(
          data?.map((contact) => ({
            ...contact,
            seatingaccom: seatingAccOptions[contact.seatingaccom],
            newsletter: contact.newsletter
              ? new Date(contact.newsletter)
              : contact.newsletter,
            navigate: () =>
              navigate(`/admin/contacts/show/${contact.contactid}`, {
                state: queries,
              }),
          })),
        );
        setLoading(false);
      },
      controller.signal,
      token,
    ).catch(() => {
      console.error('Failed to fetch contacts');
      setLoading(false);
      setPopUpProps(
        'Load Failure',
        'Failed to load contacts',
        false,
        'contact-load-failure',
      );
    });
  }, [token, reload]);

  return {loading, contacts, setReload, setLoading};
};

export const defaultParameters = {
  contactid: 'Contact ID',
  firstname: 'First Name',
  lastname: 'Last Name',
  email: 'Email',
  phone: 'Phone Number',
  address: 'Street Address',
  city: 'City',
  state: 'State',
  postalcode: 'Postal Code',
  country: 'Country',
};

export const columns: GridColDef[] = [
  {
    field: 'firstname',
    headerName: 'First Name',
    flex: 2,
    minWidth: 120,
    type: 'string',
  },
  {
    field: 'lastname',
    headerName: 'Last Name',
    flex: 2,
    minWidth: 120,
    type: 'string',
  },
  {
    field: 'email',
    flex: 3,
    minWidth: 200,
    headerName: 'Email',
    type: 'string',
  },
  {
    field: 'phone',
    flex: 2,
    valueGetter: (params: GridValueGetterParams) =>
      getFormattedPhoneNumber(params.value),
    minWidth: 120,
    headerName: 'Phone Number',
    type: 'string',
  },
  {
    field: 'address',
    flex: 6,
    headerName: 'Address',
    valueGetter: (params: GridValueGetterParams) => {
      const {address, city, state, country, postalcode} = params.row;
      return `${address ?? ''},${city ?? ''},${country ?? ''},${state ?? ''},${
        postalcode ?? ''
      }`;
    },
    renderCell: (params: GridValueGetterParams) => {
      const {address, city, state, country, postalcode} = params.row;
      const title = `${address ?? ''} ${city ?? ''}${
        address || city ? ',' : ''
      } ${state ?? ''} ${postalcode ?? ''} ${country ?? ''}`;
      return (
        <Tooltip title={title} placement='top' enterDelay={200}>
          <p className='truncate'>{title}</p>
        </Tooltip>
      );
    },
    minWidth: 200,
    type: 'string',
  },
  {
    field: 'seatingaccom',
    flex: 3,
    minWidth: 200,
    headerName: 'Seating Accommodations',
    type: 'string',
  },
  {
    field: 'newsletter',
    flex: 2,
    minWidth: 80,
    headerName: 'Newsletter',
    type: 'date',
  },
  {
    field: 'vip',
    flex: 1,
    type: 'boolean',
    headerAlign: 'center',
    align: 'center',
    minWidth: 50,
    headerName: 'VIP',
  },
  {
    field: 'donorbadge',
    flex: 1,
    type: 'boolean',
    headerAlign: 'center',
    align: 'center',
    minWidth: 60,
    headerName: 'Donor',
  },
  {
    field: 'volunteerlist',
    flex: 1,
    headerAlign: 'center',
    type: 'boolean',
    align: 'center',
    minWidth: 80,
    headerName: 'Volunteer',
  },
  {
    field: 'Show More',
    type: 'actions',
    headerName: '',
    flex: 1,
    minWidth: 50,
    renderCell: (params: GridRenderCellParams) => (
      <IconButton onClick={params.row.navigate} tooltip='Show more information'>
        <VerticalDotsIcon />
      </IconButton>
    ),
  },
];

export const getFormattedPhoneNumber = (number: string) => {
  if (!number) return number;
  if (number.length > 10) {
    return `${number.slice(0, 1)} (${number.slice(1, 4)}) ${number.slice(
      4,
      7,
    )}-${number.slice(7)}`;
  }
  return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
};
