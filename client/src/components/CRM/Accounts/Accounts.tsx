/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import AccountResults from './AccountResults';

const Accounts = (): React.ReactElement => {
  const params = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        setIsLoading(true);
        setAccount(params.id);
        await axios
            .get(
                `http://localhost:8000/api/accounts/search?username=${params.id}`,
            )
            .then((res) => {
              setData(res.data[0]);
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
    navigate(`${account}`);
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] '>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-14     ' >Accounts</h1>
        </div>
        <form className='border bg-white border-zinc-300 w-full flex flex-row p-2
        rounded-lg shadow-md justify-between'
        >
          <input
            type="input  "
            className='w-full p-2 rounded-lg'
            placeholder='Search by account...'
            value={account}
            onChange={(e) => {
              setAccount(e.target.value);
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
        <div className='mt-9 text-zinc-600 w-full'>
          {isLoading ? <div className="radial-progress"/> :
         <AccountResults data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
