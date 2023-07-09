/* eslint-disable react/react-in-jsx-scope */
import Navigation from '../Navigation';
import Contacts from './Contacts';
/**
 * @returns {object} ContactMain - has Navigation
 *  and Contacts to reroute to other components
 */
const ContactMain = () => {
  return (
    <div className='flex flex-row'>
      <Navigation/>
      <Contacts/>
    </div>
  );
};
export default ContactMain;
