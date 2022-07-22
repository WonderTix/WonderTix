/* eslint-disable react/react-in-jsx-scope */
import Navbar from './Navbar';
import Hero from './hero';
import Footer from './footer';
import Seasonaltickets from './Seasonalt';


const Mainpage = () => {
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
