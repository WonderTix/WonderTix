import React, {ReactElement} from 'react';
import TicketingNavBar from '../TicketingNavBar';
import DiscountCodes from './DiscountCodes';

/**
 * Main page to host Discount Codes
 *
 * @module
 * @returns ReactElement
 */
const DiscountCodesmain = (): ReactElement => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar />
      <DiscountCodes />
    </div>
  );
};

export default DiscountCodesmain;
