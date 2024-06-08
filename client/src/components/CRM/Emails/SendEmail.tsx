import React, {ReactElement} from 'react';
import Navigation from '../Navigation';

/**
 * @returns {ReactElement} SendEmail - Sends request to backend to send email with correct template and info
 */
const SendEmail = (): ReactElement => {
  return (
    <div className='flex flex-row'>
      <Navigation />
      <h1>HI</h1>
    </div>
  );
};

export default SendEmail;
