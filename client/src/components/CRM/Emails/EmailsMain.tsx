import React, {ReactElement} from 'react';
import Navigation from '../Navigation';
import Emails from './Emails';

/**
 * @returns {ReactElement} EmailsMain - has Navigation
 * and Emails to reroute to other components
 */
const EmailsMain = (): ReactElement => {
  return (
    <div className='flex flex-row'>
      <Navigation />
      <Emails />
    </div>
  );
};

export default EmailsMain;
