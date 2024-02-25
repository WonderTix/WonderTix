import React from 'react';
import Udash_nav from '../udash_navbar';
import NewsletterCreate from './NewsletterCreate';

/**
 * Main page for news letters
 *
 * @returns {Udash_nav, NewsletterCreate}
 */
const NewsletterCreatemain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <NewsletterCreate/>
    </div>
  );
};

export default NewsletterCreatemain;
