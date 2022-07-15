/* eslint-disable react/react-in-jsx-scope */
import Navigation from '../Navigation';
import Accounts from './Accounts';

const AccountsMain = () => {
  return (
    <div className='flex flex-row'>
      <Navigation icon={undefined}/>
      <Accounts/>
    </div>
  );
};

export default AccountsMain;
