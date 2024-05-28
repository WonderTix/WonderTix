import React, {ReactElement} from 'react';
import AdminNavBar from '../AdminNavBar';
import ContactGrid from './ContactGrid';

/**
 * @returns {ReactElement} ContactMain - has Navigation
 * and Contacts to reroute to other components
 */
const ContactMain = (): ReactElement => {
  return (
    <div className='flex flex-row'>
      <AdminNavBar />
      <ContactGrid />
    </div>
  );
};

export default ContactMain;
