import React, {ReactElement} from 'react';
import AdminNavBar from '../AdminNavBar';
import Contacts from './Contacts';

/**
 * @returns {ReactElement} ContactMain - has Navigation
 * and Contacts to reroute to other components
 */
const ContactMain = (): ReactElement => {
  return (
    <div className='flex flex-row'>
      <AdminNavBar />
      <Contacts />
    </div>
  );
};

export default ContactMain;
