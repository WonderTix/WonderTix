/* eslint-disable react/react-in-jsx-scope */
import Navigation from '../Navigation';
import AccountsDash from './AccountsDash';

const AccountsMain = () => {
  return (
    <div className='flex flex-row'>
      <Navigation icon={undefined}/>
      <AccountsDash/>
    </div>
  );
};

export default AccountsMain;
