import React, {ReactElement} from 'react';
import Footer from '../mainpage/footer';
import Navbar from '../mainpage/Navbar';
import Eventshowings from './eventshowings';

/**
 * Main host for eventShowings
 *
 * @returns {Navbar, Eventshowings, Footer}
 */
const Eventshowingmain = (): ReactElement => {
  return (
    <>
      <Navbar bMode />
      <Eventshowings />
      <Footer />
    </>
  );
};

export default Eventshowingmain;
