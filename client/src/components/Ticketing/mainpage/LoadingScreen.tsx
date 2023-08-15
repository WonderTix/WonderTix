import bgImg from '../../../assets/pp_logo_white.png';
import React from 'react';

export const LoadingScreen = () => {
  return (
    <>
      <div className='flex h-screen backgrop-blur-lg bg-slate-400'>
        <div className="m-auto">
          <img className='fill-white w-12 h-full
             object-cover mx-4' src={bgImg} alt="/"/>
          <svg
            className="animate-spin h-5 mt-4 m-auto justify-center text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"/>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
                7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>
      </div>
      ;
    </>
  );
};
