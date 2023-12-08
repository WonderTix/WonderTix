import React, {ReactElement} from 'react';
import Footer from '../mainpage/Footer';
import Navbar from '../mainpage/Navbar';
import EventShowings from './EventShowings';

/**
 * Main host for EventShowings
 *
 * @returns {Navbar, EventShowings, Footer}
 */
const EventShowingsmain = (): ReactElement => {
  return (
    <>
      <Navbar bMode />
      <EventShowings />
      <Footer />
    </>
  );
};

export default EventShowingsmain;
