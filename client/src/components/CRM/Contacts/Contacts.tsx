/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import ContactResults from './ContactResults';
import {useAuth0} from '@auth0/auth0-react';
/**
 * handle searching for contact information
 *
 * @returns {ReactElement}
 */
const Contacts = (): React.ReactElement => {
  const params = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {getAccessTokenSilently} = useAuth0();
  const [datalist, setDataList] = useState([]);

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
  useEffect(() => {
    getData();
  }, [params.id]);
  const handleClick = (e: any) => {
    e.preventDefault();
    navigate(`${contact}`);
  };
  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='flex flex-col  md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] '>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-10 pb-4'>
            Contacts
          </h1>
        </div>
        <form className='bg-white border border-zinc-300 w-full flex flex-row p-2
        rounded-lg shadow-md justify-between'
        >
          <input
            type="input  "
            className='w-full p-2 rounded-lg'
            placeholder='Search by contact...'
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
          <button
            type="submit"
            className='p-2 text-zinc-400 justify-end'
            aria-label="search"
            onClick={handleClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
              // eslint-disable-next-line max-len
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
        <div>
          <br/>
          {datalist.map(
              (Cust) =>
                <ContactResults
                  data={Cust}
                  key={Cust.contactid}
                  {...Cust}/>,
          )}
        </div>
      </div>
    </div>
  );
};
export default Contacts;
