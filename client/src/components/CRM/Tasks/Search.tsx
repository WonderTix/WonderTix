import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ContactResults from '../Contacts/ContactResults';
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react';

/**
 * @param {any} props Props to be passed to SearchBar
 * @returns {React.ReactElement} HTMLElement for Searchbar
 */
const SearchBar = (props: any): React.ReactElement => {
  const params = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const {getAccessTokenSilently} = useAuth0();

  useEffect(() => {
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
            process.env.REACT_APP_API_1_URL +
            `/contacts/search?name=${params.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
          .then((res) => {
            setData(res.data.data[0]);
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
    getData();
  }, [params.id]);

  const handleClick = (e: any) => {
    e.preventDefault();
    navigate(`${contact}`);
  };

  return (
    <div className='flex flex-col'
    >
      <div
        className='border border-zinc-300 flex flex-row p-2
        rounded-lg shadow-md justify-between'
      >
        <input
          type="input"
          className='w-full p-2 rounded-lg'
          placeholder={props.data}
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />
        <button
          type="submit"
          className='p-2 text-zinc-600 justify-end'
          aria-label="search"
          onClick={handleClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className='p-3 text-zinc-600'>
        {isLoading ? <div className="radial-progress"/> :
          <ContactResults data={data} />
        }
      </div>
    </div>
  );
};

export default SearchBar;
