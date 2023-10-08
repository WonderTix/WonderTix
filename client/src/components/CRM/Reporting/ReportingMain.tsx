/* eslint-disable react/react-in-jsx-scope */
import Reporting from './Reporting';
import Navigation from '../Navigation';
import CreditCardRecon from './CreditCardRecon';

/**
 * @returns {object} ReportingMain - has Navigation
 *  and Reporting to reroute to other components
 */
const ReportingMain=() =>{
  return (
    <div>
      <CreditCardRecon/>
      <Navigation/>
    </div>
  );
};

export default ReportingMain;
