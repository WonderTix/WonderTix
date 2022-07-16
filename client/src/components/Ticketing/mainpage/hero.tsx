/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React from 'react';
import {useState} from 'react';
import {ListComponent} from './eventcard';

const Hero = () => {
  const [components, setComponents] = useState(['sample']);

  // eslint-disable-next-line require-jsdoc
  function addComponent() {
    setComponents([...components, 'Sample']);
  }

  return (

    <div className = 'home w-full h-screen ' >
      <div className=' w-full h-screen bg-zinc-100
       overflow-y-hidden overflow-x-hidden sm:bg-scroll
        justify-between md:bg-fixed bg-cover bg-hero bg-brightness-50' >
        <div className='flex flex-row md:flex-row sm:flex-col
         sm:items-center w-full h-full bg-gradient-to-r from-black'>
          <div className='max-w-[1240px] md:pl-40 flex flex-row
            text-center  text-white m-auto '>
            <div className = 'flex flex-col justify-center md:items-center w-full px-2 py8 md:mt-auto sm:mt-40 sm:mb-10'>
              <h1 className=' py-3 text-5xl md:text-7xl font-bold hover:text-indigo-600'>Events</h1>
              <div className='flex flex-col my-2'>
                <label className=' hover:text-indigo-600 text-gray-200 rounded-full py-2 px-10 my-1'>Pick a Date</label>
                <input className='bg-zinc-300 text-gray-600 text-center border content-center rounded-xl py-2 px-4' type="date" />
              </div>

            </div>

          </div>
          <div className=' m-auto  rounded-xl overflow-x-scroll  scroll-smooth   '>
            <div className='flex flex-row md:flex-row sm:flex-col '>
              <div className='snap-start items-center m-auto  '>
                <button className='py-4 px-8 sm:w-[50%] mx-4 text-center flex flex-col items-center bg-transparent text-gray-100 text-xl border-gray-100 hover:text-gray-300 hover:border-gray-300' onClick={addComponent}>+</button>
              </div>
              <div className='flex flex-row md:flex-row sm:flex-col gap-7 py-6'>
                {components.map((item, id) => ( <ListComponent text={item}/>))}
              </div>
            </div>


          </div>
        </div>
      </div>


    </div>
  );
};

export default Hero;
