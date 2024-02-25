import React from 'react';
import Navbar from '../mainpage/Navbar';
import Footer from '../mainpage/Footer';
import OnlyDonationPage from './OnlyDonatePage';

/**
 * Main page for donations
 *
 * @returns {Navbar, OnlyDonationPage, Footer}
 */
const Donationmain = () => {
  return (
    <><Navbar bMode/><OnlyDonationPage /><Footer /></>
  );
};

export default Donationmain;
