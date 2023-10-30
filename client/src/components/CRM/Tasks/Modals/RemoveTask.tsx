import React from 'react';
import {WarningTriangleIcon} from '../SVGIcons';

interface RemoveTaskProps {
  isVisible: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
}

const RemoveTask: React.FC<RemoveTaskProps> = ({
  isVisible,
  onCancel,
  onSubmit,
}) => {
  const handleButtonClick = (callback?: () => void) => {
    if (callback) callback();
  };

  return (
    <>
      {isVisible && (
        <div
          className='bg-white flex flex-col rounded-md shadow-lg z-30
          max-w-sm max-h-[28rem] p-6 top-0 right-0 bottom-0 left-0'
        >
          <div className='flex flex-col justify-center items-center'>
            <WarningTriangleIcon size={24} />
            <h1 className='text-red-600 text-2xl font-bold'>
              Are you sure?
            </h1>
            <p className='text-sm font-semibold text-center mt-2 px-6 py-2'>
              Do you really want to delete this task?
              This process cannot be undone.
            </p>
          </div>
          <div className='flex justify-evenly mt-4'>
            <button
              onClick={() => handleButtonClick(onCancel)}
              className='rounded py-2.5 px-6 w-36 tracking-tight
              bg-gradient-to-t from-gray-500/50 to-gray-300
              font-bold text-center text-sm text-gray-900
              shadow shadow-gray-500 active:opacity-75
              hover:bg-gradient-to-b hover:shadow-inner'
            >
              CANCEL
            </button>
            <button
              onClick={() => handleButtonClick(onSubmit)}
              className='rounded py-2.5 px-6 w-36 text-white
              bg-gradient-to-t from-red-700 to-rose-600
              font-bold text-center text-sm tracking-tight
              shadow shadow-gray-500 active:opacity-75
              hover:bg-gradient-to-b hover:shadow-inner'
            >
              DELETE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RemoveTask;
