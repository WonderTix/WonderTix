import React, {ReactElement} from 'react';
import Navigation from '../Navigation';
import AccountsDash from './AccountsDash';

/**
 * @returns {object} AccountsMain - has Navigation
 *  and AccountsDash to reroute to other components
 */
const AccountsMain = (): ReactElement => {
  return (
    <div className="flex flex-row">
      <Navigation />
      <AccountsDash />
    </div>
  );
};

export default AccountsMain;
