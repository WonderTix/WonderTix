import React from 'react';
import Udash_nav from '../udash_navbar';
import ReaderPurchase from './ReaderPurchase';

const ReaderPurchasePage = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav />
      <ReaderPurchase />
    </div>
  );
};

export default ReaderPurchasePage;
