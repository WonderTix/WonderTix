import React, {ReactElement} from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import {useAuth0} from '@auth0/auth0-react';
import {LoadingScreen} from './LoadingScreen';

/**
 * Page that loads everything after getting through auth0
 *
 * @returns {ReactElement} Mainpage
 */
const Mainpage = (): ReactElement => {
  const {isLoading} = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <Footer/>
    </div>
  );
};

export default Mainpage;
