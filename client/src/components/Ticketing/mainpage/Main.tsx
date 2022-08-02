/* eslint-disable react/react-in-jsx-scope */
import Navbar from './Navbar';
import Hero from './hero';
import Footer from './footer';
import Seasonaltickets from './Seasonalt';
import {useAuth0} from '@auth0/auth0-react';


const Mainpage = () => {
  const {isLoading, isAuthenticated} = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(isAuthenticated);
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
