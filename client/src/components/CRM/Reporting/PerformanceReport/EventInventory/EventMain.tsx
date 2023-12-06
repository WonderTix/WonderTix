/* eslint-disable react/react-in-jsx-scope */
import Navigation from '../../../Navigation';
import EventInventory from './EventInventory';

/**
 * @returns {object}
 *  
 */
const EventMain=() =>{
  return (
    <div className='flex flex-row  '>
      <EventInventory/>
      <Navigation/>
    </div>
  );
};

export default EventMain;
