import React from 'react';
import Navbar from '../mainpage/Navbar';
import Footer from '../mainpage/Footer';
import DonorBenefitsPage from './DonorBenefitsPage';

/**
 * Main page for donations
 *
 * @returns {Navbar, DonorBenefitsPage, Footer}
 */
const DonorBenefitsmain = () => {
  return (
    <>
      <Navbar bMode />
      <DonorBenefitsPage />
      <Footer />
    </>
  );
};

export default DonorBenefitsmain;
