import React, {ReactElement} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import SelectEvent from './EmailEvents';

/**
 * @returns {ReactElement} EmailsMain - has main Email functionality
 */
const Emails = (): ReactElement => {
  return (
    <div className="w-full h-screen overflow-x-hidden absolute">
      <div className="md:ml-[22rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]">
        <div className="flex flex-row">
          <h1 className="font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-10 pb-4">
            Send Event Reminders
          </h1>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
          <SelectEvent></SelectEvent>
        </div>
      </div>
    </div>
  );
};

export default Emails;
