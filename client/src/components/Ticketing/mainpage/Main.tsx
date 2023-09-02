import Navbar from './Navbar';
import Hero from './hero';
import Footer from './footer';
import Seasonaltickets from './Seasonalt';
import {useAuth0} from '@auth0/auth0-react';
import React from 'react';
import {LoadingScreen} from './LoadingScreen';


/**
 * Page that loads everything after getting through auth0
 *
 * @returns {Navbar, Hero, Seasonaltickets, Footer, ReactElement}
 */
const Mainpage = () => {
  const {isLoading} = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <Seasonaltickets/>
      <Footer/>
    </div>
  );
};
export default Mainpage;
