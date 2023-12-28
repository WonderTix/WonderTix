import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import ContactResults from './ContactResults';
import ContactPopUp, {Contact} from './ContactPopUp';
import {useAuth0} from '@auth0/auth0-react';

const emptyContact: Contact = {
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

/**
 * handle searching for contact information
 *
 * @returns {ReactElement}
 */
const Contacts = (): React.ReactElement => {
  const params = useParams();
  const navigate = useNavigate();
  const {getAccessTokenSilently} = useAuth0();

  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [datalist, setDataList] = useState([]);
  const [contactPopUpIsOpen, setContactPopUpIsOpen] = useState(false);

  const handleCloseContactPopUp = () => {
    setContactPopUpIsOpen(false);
  };

  const handleCreateContact = async (contact: Contact) => {
    if (contact.seatingAcc === 'Other') {
      contact.seatingAcc = contact.comments;
    }

    await fetch(process.env.REACT_APP_API_2_URL + '/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    })
      .then((response) => {
        console.log('Response:', response);
        return response.json();
      })
      .then((data) => {
        navigate(`/admin/contacts/show/${data.contactid}`);
        console.log('Data:', data);
      })
      .catch((error) => {
        console.error('Error Creating Contact:', error);
      });

    setContactPopUpIsOpen(false);
  };

  useEffect(() => {
    void getData();
  }, [params.id]);

  const getData = async () => {
    if (params.id) {
      setIsLoading(true);
      setContact(params.id);
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });
      await axios
        .get(
          process.env.REACT_APP_API_1_URL + `/contacts/search?firstname=${params.id.split(' ')[0]}&lastname=${params.id.split(' ')[1]}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          // setData(res.data);
          setDataList(res.data.data);
          console.log(res);
        })
        .catch((err) => {
          setError(err.message);
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    navigate(`${contact}`);
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='flex flex-col md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-10 pb-4'>
          Contacts
        </h1>
        <div className='flex flex-col tab:flex-row gap-3'>
          <form className='bg-white border border-zinc-300 w-full flex flex-row p-2 rounded-lg shadow-md justify-between'>
            <input
              data-testid='contact-search'
              type='input'
              className='w-full p-2 rounded-lg'
              placeholder='Search by contact...'
              value={contact}
              onChange={(e) =>
                setContact(e.target.value)
              }
            />
            <button
              data-testid='contact-search-button'
              type='submit'
              className='p-2 text-zinc-400 justify-end'
              aria-label='search'
              onClick={handleClick}
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </form>
          <button
            className='w-full inline-flex items-center
                justify-center rounded-md border border-gray-300 shadow-md px-4 py-2 bg-white text-base
                font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500 tab:w-auto tab:text-sm'
            onClick={() => setContactPopUpIsOpen(true)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
            </svg>
          </button>
        </div>
        <br/>
        <div>
          {datalist.map(
            (contact) =>
              <ContactResults
                data={contact}
                key={contact.contactid}
                {...contact}
              />,
          )}
        </div>
      </div>
      {contactPopUpIsOpen && (
        <ContactPopUp
          onCancel={handleCloseContactPopUp}
          onSubmit={handleCreateContact}
          title='Create Contact'
          primaryLabel='Create'
          values={emptyContact}
        />
      )}
    </div>
  );
};

export default Contacts;
