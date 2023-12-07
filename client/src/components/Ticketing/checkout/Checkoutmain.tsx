import React from 'react';
import CheckoutPage from './CheckoutPage';
import Navbar from '../mainpage/Navbar';
import Footer from '../mainpage/Footer';

/**
 * Hosts checkout page
 *
 * @returns {Navbar, CheckoutPage, Footer}
 */
const Checkoutmain = () => {
  return (
    <><Navbar bMode /><CheckoutPage /><Footer /></>
  );
};

export default Checkoutmain;
