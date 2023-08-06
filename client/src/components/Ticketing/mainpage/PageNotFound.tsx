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
      <div className="w-full relative min-h-[calc(100vh-80px)] top-[80px] justify-center bg-white flex flex-col lg:grid lg:grid-cols-3">
        <div className="md:col-span-2 flex flex-col justify-center">
          <img src={eImage} alt="404 error image" className="m-auto w-[75%] h-auto" />
        </div>
        <div className="md:col-span-1 grid content-start md:content-center p-2 lg:pr-10">
          <h1 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#95a8bb] text-center">
            It looks like you are lost...
          </h1>
          <h2 className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#95a8bb] text-center">
            Click the button below to get back on the right path.
          </h2>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl bg-[#557793] mx-auto mt-3 py-3 px-5 rounded-lg text-zinc-100"
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
