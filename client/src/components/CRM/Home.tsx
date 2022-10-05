/* eslint-disable max-len */
import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from '../Authentication/auth-nav';
/**
 * Welcoming page
 * @return {React.ReactElement}
 */
const Home = (): React.ReactElement => {
  const {user} = useAuth0();
  const {name} = user;
  return (
    <>
      <div className='flex flex-col items-center gap-3 mt-8'>
        <h3 className='mt-3 text-xl font-bold' >Welcome {name}</h3>
        <button className='px-5 py-2 bg-zinc-900 text-white rounded-3xl hover:bg-transparent hover:text-black font-semibold border border-black '>
          <AuthNav />
        </button>
      </div>

    </>
  );
};

export default Home;
