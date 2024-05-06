import React from 'react';
import Udash_nav from '../udash_navbar';
import ReaderPurchase from './ReaderPurchase';

const ReaderPurchaseMain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav />
      <ReaderPurchase />
    </div>
  );
};

export default ReaderPurchaseMain;
