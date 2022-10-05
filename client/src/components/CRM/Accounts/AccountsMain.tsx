/* eslint-disable react/react-in-jsx-scope */
import Navigation from '../Navigation';
import AccountsDash from './AccountsDash';
/**
 * @return {object} AccountsMain - has Navigation
 *  and AccountsDash to reroute to other components
 */
const AccountsMain = () => {
  return (
    <div className='flex flex-row'>
      <Navigation/>
      <AccountsDash/>
    </div>
  );
};

export default AccountsMain;
