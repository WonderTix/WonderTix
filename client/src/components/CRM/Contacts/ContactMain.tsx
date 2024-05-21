import React, {ReactElement} from 'react';
import Navigation from '../Navigation';
import ContactGrid from './ContactGrid';

/**
 * @returns {ReactElement} ContactMain - has Navigation
 * and Contacts to reroute to other components
 */
const ContactMain = (): ReactElement => {
  return (
    <div className='flex flex-row'>
      <Navigation />
      <ContactGrid />
    </div>
  );
};

export default ContactMain;
