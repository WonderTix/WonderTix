import React from 'react';
import Cart from './Cart';
import Navbar from '../mainpage/Navbar';
import Footer from '../mainpage/Footer';

/**
 * @param {Function} Cartmain
 * @returns {Navbar, Cart, Footer}
 */
const Cartmain = () => {
  return (
    <>
      <Navbar bMode />
      <Cart />
      <Footer />
    </>
  );
};

export default Cartmain;
