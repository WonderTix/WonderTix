import React, {ReactElement, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import format from 'date-fns/format';
import {Tabs, Tab} from '@mui/material';
import Navigation from '../Navigation';
import {useFetchToken} from '../../Ticketing/ticketingmanager/Event/components/ShowingUtils';
import {LoadingScreen} from '../../Ticketing/mainpage/LoadingScreen';
import {toDollarAmount} from '../../../utils/arrays';
import ContactCard from './ContactCard';
import ContactOrder from './ContactOrder';
import {Contact, toReadableDonationFrequency} from './contactUtils';

/**
 * The page that displays order and donation history for a contact.
 *
 * @returns {ReactElement} ContactOneResult
 */
export const ContactOneResult = (): ReactElement => {
  const {token} = useFetchToken();
  const params = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (token !== '') {
      void getContact();
    }
  }, [token]);

  const getContact = async () => {
    if (params.contactid) {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_2_URL + `/contact/orders/${params.contactid}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to get contact');
        }
        const contactData = await response.json();
        const contact: Contact = {
          first: contactData.firstname,
          last: contactData.lastname,
          email: contactData.email,
          phone: contactData.phone,
          address: contactData.address,
          city: contactData.city,
          state: contactData.state,
          country: contactData.country,
          postalCode: contactData.postalcode,
          seatingAcc: contactData.seatingaccom,
          comments: contactData.comments,
          newsletter: contactData.newsletter,
          vip: contactData.vip,
          donorBadge: contactData.donorbadge,
          volunteerList: contactData.volunteerlist,
          contactId: contactData.contactid,
          orders: contactData.orders,
          createdDate: contactData.createddate,
        };
        setContact(contact);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setContact(null);
    }
  };

  const handleTabChange = (e, newTabValue) => {
    setTabValue(newTabValue);
  };

  if (token === '' || !contact) {
    return (
      <div className='absolute w-screen z-10'>
        <LoadingScreen />
      </div>
    );
  } else {
    return (
      <div className='flex flex-row'>
        <Navigation />
        <main className='w-full h-screen overflow-x-hidden absolute'>
          <div className='md:ml-[18rem] md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] mt-[6rem] mb-[9rem]'>
            <div className='mt-9 text-zinc-600 w-full'>
              <button
                className='bg-blue-500 hover:bg-blue-600 disabled:opacity-40 mt-4 mb-3 shadow-md px-4 py-2 text-base
                  font-medium text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-indigo-500'
                onClick={() => navigate(`/admin/contacts`)}
              >
                Back to search
              </button>
              <ContactCard
                contact={contact}
                onRefresh={() => getContact()}
                onRemove={() => navigate('/admin/contacts')}
                showMoreButton={false}
                token={token}
              />
            </div>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label='Orders' />
              <Tab label='Donations' />
            </Tabs>
            {tabValue === 0 &&
              (contact.orders.length === 0 ? (
                <p className='text-center text-zinc-400 font-medium mt-4'>
                  No orders
                </p>
              ) : (
                contact.orders.map((order) => (
                  <ContactOrder
                    key={order.orderid}
                    orderId={order.orderid}
                    orderTotal={order.ordertotal}
                    discountTotal={order.discounttotal}
                    orderDateTime={order.orderdatetime}
                    refunded={order.refunded}
                    orderItems={order.orderitems}
                    donation={order.donation}
                  />
                ))
              ))}
            {tabValue === 1 && (
              <p className='text-center text-zinc-400 font-medium mt-4'>
                This tab is currently inactive
              </p>
            )}
          </div>
        </main>
      </div>
    );
  }
};

// FIXME: No standalone donations yet
export const ContactDonation = ({donation}: {donation: any}): ReactElement => {
  const {donationid, donationdate, frequency, refunded, amount} = donation;

  const date = new Date(donationdate);

  return (
    <section className='w-full bg-white shadow-lg border border-zinc-300 rounded-lg mb-4 p-5 text-zinc-600'>
      <header className='flex gap-2 items-start justify-between mb-4'>
        <h2 className='text-2xl font-semibold'>Donation {donationid}</h2>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
      </header>
      <article>
        <p className='flex flex-row gap-3 text-lg w-full'>
          <span className='font-semibold'>Donation Date:</span>
          <span>{format(date, 'MMM dd, yyyy')}</span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-1 w-full'>
          <span className='font-semibold'>Frequency:</span>
          <span>{toReadableDonationFrequency(frequency)}</span>
        </p>
        <p className='flex flex-row gap-3 text-lg my-1 w-full'>
          <span className='font-semibold'>Refunded:</span>
          <span>{refunded ? 'Yes' : 'No'}</span>
        </p>
      </article>
      <footer>
        <p className='flex flex-row gap-3 text-xl mt-2 w-full'>
          <span className='font-semibold'>Amount:</span>
          <span>{toDollarAmount(Number(amount))}</span>
        </p>
      </footer>
    </section>
  );
};
