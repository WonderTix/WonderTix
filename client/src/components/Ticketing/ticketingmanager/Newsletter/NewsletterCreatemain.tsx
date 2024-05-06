import React from 'react';
import TicketingNavBar from '../TicketingNavBar';
import NewsletterCreate from './NewsletterCreate';

/**
 * Main page for news letters
 *
 * @returns {Udash_nav, NewsletterCreate}
 */
const NewsletterCreatemain = () => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar/>
      <NewsletterCreate/>
    </div>
  );
};

export default NewsletterCreatemain;
