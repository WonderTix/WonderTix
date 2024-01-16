import React, {ReactElement, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import format from 'date-fns/format';
import {Tabs, Tab} from '@mui/material';
import Navigation from '../Navigation';
import {useFetchToken} from '../../Ticketing/ticketingmanager/Event/components/ShowingUtils';
import {LoadingScreen} from '../../Ticketing/mainpage/LoadingScreen';
import {toDateStringFormat} from '../../Ticketing/ticketingmanager/Event/components/util/EventsUtil';
import {toDollarAmount} from '../../../utils/arrays';
import ContactCard from './ContactCard';
import {Contact, toReadableDonationFrequency} from './contactUtils';

/**
 * @returns {ReactElement} ContactOneResult - order and donation history for a contact
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
      await axios
        .get(
          process.env.REACT_APP_API_2_URL +
            `/contact/orders/${params.contactid}`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          const contact: Contact = {
            first: res.data.firstname,
            last: res.data.lastname,
            email: res.data.email,
            phone: res.data.phone,
            address: res.data.address,
            city: res.data.city,
            state: res.data.state,
            country: res.data.country,
            postalCode: res.data.postalcode,
            seatingAcc: res.data.seatingaccom,
            newsletter: res.data.newsletter,
            vip: res.data.vip,
            donorBadge: res.data.donorbadge,
            volunteerList: res.data.volunteerlist,
            contactId: res.data.contactid,
            orders: res.data.orders,
            donations: res.data.donations,
          };
          setContact(contact);
        })
        .catch((err) => {
          console.error(err.message);
        });
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
                  <ContactOrder order={order} key={order.orderid} />
                ))
              ))}
            {tabValue === 1 &&
              (contact.donations.length === 0 ? (
                <p className='text-center text-zinc-400 font-medium mt-4'>
                  No donations
                </p>
              ) : (
                contact.donations.map((donation) => (
                  <ContactDonation
                    donation={donation}
                    key={donation.donationid}
                  />
                ))
              ))}
          </div>
        </main>
      </div>
    );
  }
};

export const ContactOrder = ({order}: {order: any}): ReactElement => {
  const {orderdate, orderid, ordertime, ordertotal, refund_intent, orderitems} =
    order;

  const date = new Date(
    `${toDateStringFormat(orderdate)}T${ordertime.split('T')[1].slice(0, 8)}`,
  );

  return (
    <section className='w-full bg-white shadow-lg border border-zinc-300 rounded-lg mb-4 p-5 text-zinc-600'>
      <header className='flex gap-2 items-start justify-between mb-4'>
        <h2 className='text-2xl font-semibold'>Order {orderid}</h2>
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
            d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
          />
        </svg>
      </header>
      <div className='grid md:grid-cols-2'>
        <article>
          <p className='flex flex-row gap-3 text-lg w-full'>
            <span className='font-semibold'>Order Date:</span>
            <span>{format(date, 'MMM dd, yyyy')}</span>
          </p>
          <p className='flex flex-row gap-3 text-lg mt-1 w-full'>
            <span className='font-semibold'>Order Time:</span>
            <span>{format(date, 'h:mm a')}</span>
          </p>
          <p className='flex flex-row gap-3 text-lg my-1 w-full'>
            <span className='font-semibold'>Refunded:</span>
            <span>{refund_intent ? 'Yes' : 'No'}</span>
          </p>
        </article>
        <aside>
          {orderitems.length === 0 && (
            <p className='text-center text-md mt-1 w-full text-zinc-400 font-medium'>
              No order items
            </p>
          )}
          {orderitems.map((item, index) => {
            const eventDate = new Date(
              `${toDateStringFormat(item.eventdate)}T${item.eventtime
                .split('T')[1]
                .slice(0, 8)}`,
            );
            return (
              <article
                key={index}
                className='border border-zinc-300 px-4 pt-3 pb-4 rounded-xl mb-2'
              >
                <p className='flex justify-between'>
                  <span className='font-bold'>
                    {item.quantity} x {item.description}
                    {item.seasonname && (
                      <span className='font-normal italic'>
                        {' '}
                        - {item.seasonname}
                      </span>
                    )}
                  </span>
                  <span className='font-bold'>
                    {toDollarAmount(Number(item.price))}
                  </span>
                </p>
                <p className='text-xs'>
                  {item.tickettype} • {format(eventDate, 'MMM dd, yyyy')} •{' '}
                  {format(eventDate, 'h:mm a')}
                </p>
              </article>
            );
          })}
        </aside>
      </div>
      <footer>
        <p className='flex flex-row gap-3 text-xl mt-2 w-full'>
          <span className='font-semibold'>Order Total:</span>
          <span>{toDollarAmount(Number(ordertotal))}</span>
        </p>
      </footer>
    </section>
  );
};

export const ContactDonation = ({donation}: {donation: any}): ReactElement => {
  const {donationid, donationdate, frequency, refund_intent, amount} = donation;

  const date = new Date(`${toDateStringFormat(donationdate)}T00:00:00`);

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
          <span>{refund_intent ? 'Yes' : 'No'}</span>
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
