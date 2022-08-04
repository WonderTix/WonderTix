import React from 'react';
import Accounts from './Accounts';
import Navigation from '../../Navigation';
const userSearchmain = () => {
  return (
    <div className='flex flex-row  '>
      <Accounts/>
      <Navigation icon={undefined}/>
    </div>
  );
};

export default userSearchmain;
