/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import NewsletterCreate from './NewsletterCreate';
const NewsletterCreatemain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <NewsletterCreate/>
    </div>
  );
};

export default NewsletterCreatemain;
