import React from 'react';
import {useState} from 'react';
import {Tooltip} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import ContactPopUp from './ContactPopUp';
import PopUp from '../../Ticketing/PopUp';
import {Contact, editContact, deleteContact} from './contactUtils';

/**
 * Display the results of contacts search
 *
 * @param root0
 * @param root0.data
 * @param root0.token
 * @param root0.refreshContacts
 * @returns {ReactElement}
 */
const ContactResults = ({
  data,
  token,
  refreshContacts,
}: {
  data: any,
  token: any,
  refreshContacts: () => void,
}): React.ReactElement => {
  const {
    firstname,
    lastname,
    contactid,
    email,
    phone,
    address,
    newsletter,
    donorbadge,
    seatingaccom,
    vip,
    volunteerlist,
  } = data;

  const navigate = useNavigate();
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleEditCustomer = async (contact: Contact) => {
    const responseCode = await editContact(contact, contactid, token);
    if (responseCode === 204) {
      setShowEditPopUp(false);
      setErrorMsg(null);
      void refreshContacts();
    } else if (responseCode === 400) {
      setErrorMsg('Contact with email already exists');
    } else {
      setErrorMsg('Failed to edit contact');
    }
  };

  const handleRemoveContact = async () => {
    setShowConfirmationPopUp(false);
    const responseCode = await deleteContact(contactid, token);
    if (responseCode === 204) {
      void refreshContacts();
    } else if (responseCode === 400) {
      setErrorMsg('Cannot remove a customer with orders or donations');
      setShowErrorPopUp(true);
    } else {
      setErrorMsg('Failed to remove customer');
      setShowErrorPopUp(true);
    }
  };

  return (
    <>
      <section
        data-testid='customer-card'
        className='relative w-full bg-white shadow-lg border border-zinc-300 rounded-lg mb-5 p-5'
      >
        <header className='flex justify-between border-b pb-5'>
          <h2 className='flex gap-3 items-center text-2xl font-bold text-zinc-700'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
            Customer Information
          </h2>
          <ul className='flex gap-1'>
            <Tooltip title='Edit' placement='top' arrow>
              <li>
                <button
                  className='p-2 rounded-lg text-zinc-500 hover:text-zinc-600 hover:bg-zinc-100
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={() => setShowEditPopUp(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </li>
            </Tooltip>
            <Tooltip title='Remove customer' placement='top' arrow>
              <li>
                <button
                  className='p-2 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-100
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                  onClick={() => setShowConfirmationPopUp(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            </Tooltip>
          </ul>
        </header>
        <p className='flex flex-row gap-3 text-lg mt-5 w-full'>
          <span className='font-semibold'>
            Customer Name:
          </span>
          <span data-testid='customer-name'>
            {firstname + ' ' + lastname}
          </span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <span className='font-semibold'>
            ID:
          </span>
          <span data-testid='customer-id'>
            {contactid}
          </span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <span className='font-semibold'>
            Email:
          </span>
          <span data-testid='customer-email'>
            {email}
          </span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <span className='font-semibold'>
            Phone:
          </span>
          <span data-testid='customer-phone'>
            {phone}
          </span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <span className='font-semibold'>
            Customer Address:
          </span>
          <span data-testid='customer-address'>
            {address}
          </span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <span className='font-semibold'>
            Seating Accommodation:
          </span>
          <span data-testid='customer-accommodation'>
            {seatingaccom}
          </span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <span className='font-semibold'>
            Newsletter:
          </span>
          <span data-testid='customer-newsletter'>
            {newsletter ? 'Yes' : 'No'}
          </span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <span className='font-semibold'>
            Donor Badge:
          </span>
          <span data-testid='customer-donorbadge'>
            {donorbadge ? 'Yes' : 'No'}
          </span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <span className='font-semibold'>
            VIP:
          </span>
          <span data-testid='customer-vip'>
            {vip ? 'Yes' : 'No'}
          </span>
        </p>
        <p className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <span className='font-semibold'>
            Volunteer List:
          </span>
          <span data-testid='customer-volunteer'>
            {volunteerlist ? 'Yes' : 'No'}
          </span>
        </p>
        <button
          className='bg-blue-500 hover:bg-blue-600 disabled:opacity-40 mt-4 shadow-md px-4 py-2 text-base
          font-medium text-white rounded-lg justify-end w-full focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-indigo-500'
          onClick={() => navigate(`/admin/contacts/show/${contactid}`)}
        >
          Show More Information
        </button>
      </section>
      {showEditPopUp && (
        <ContactPopUp
          title='Edit Contact'
          errorMessage={errorMsg}
          onCancel={() => {
            setShowEditPopUp(false);
            setErrorMsg(null);
          }}
          onSubmit={handleEditCustomer}
          values={{
            first: firstname,
            last: lastname,
            email: email,
            phone: phone,
            address: address,
            seatingAcc: seatingaccom,
            newsletter: newsletter,
            vip: vip,
            donorBadge: donorbadge,
            volunteerList: volunteerlist,
          }}
        />
      )}
      {showConfirmationPopUp && (
        <PopUp
          title='Confirm removal'
          message='Click remove to delete this customer'
          secondaryLabel='Cancel'
          primaryLabel='Remove'
          handleClose={() => setShowConfirmationPopUp(false)}
          handleProceed={handleRemoveContact}
          success={false}
        />
      )}
      {showErrorPopUp && (
        <PopUp
          title='Failure'
          message={errorMsg}
          handleClose={() => setShowErrorPopUp(false)}
          handleProceed={() => setShowErrorPopUp(false)}
          success={false}
          showSecondary={false}
          showClose={false}
        />
      )}
    </>
  );
};

export default ContactResults;
