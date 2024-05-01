import React, {ReactElement} from 'react';
import AdminNavBar from '../AdminNavBar';
import AccountsDash from './AccountsDash';

/**
 * @returns {object} AccountsMain - has Navigation
 *  and AccountsDash to reroute to other components
 */
const AccountsMain = (): ReactElement => {
  return (
    <div className="flex flex-row">
      <AdminNavBar />
      <AccountsDash />
    </div>
  );
};

export default AccountsMain;
