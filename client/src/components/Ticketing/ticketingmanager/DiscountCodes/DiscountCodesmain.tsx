import React, {ReactElement} from 'react';
import Udash_nav from '../udash_navbar';
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
      <Udash_nav />
      <DiscountCodes />
    </div>
  );
};

export default DiscountCodesmain;
