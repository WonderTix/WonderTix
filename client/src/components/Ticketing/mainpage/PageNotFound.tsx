/* eslint-disable max-len */

import React from 'react';
import Navbar from './Navbar';
import {useNavigate} from 'react-router';
import eImage from '../../../assets/error-404-image.png';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className=" w-full relative h-[calc(100vh-80px)] top-[80px] bg-white flex flex-col md:grid md:grid-cols-3">
        <div className="m-10 md:col-span-2 flex flex-col justify-center md:p-5 lg:p-40">
          <img src={eImage} alt="404 error image"/>
        </div>
        <div className="md:col-span-1 grid grid-cols-1 content-start md:content-center px-2 md:p-10">
          <h1 className=" mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#95a8bb] text-center">{`It looks like you are lost...`}</h1>
          <h2 className=" text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#95a8bb] text-center">{`Click the button below to get back on the right path.`}</h2>
          <div className="flex flex-row justify-start">
            <button
              onClick={() => navigate('/')}
              className='text-lg sm:text-xl md:text-2xl lg:text-3xl bg-[#557793] mx-auto mt-3 py-4 px-6 rounded-2xl text-zinc-100'
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
