import React from 'react';
import {WarningTriangleIcon} from '../SVGIcons';

export interface RemoveTaskProps {
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
          className='bg-black bg-opacity-50 flex justify-center items-center
          fixed top-0 right-0 bottom-0 left-0'
        >
          <div
            className='bg-white flex flex-col rounded-md shadow-lg z-30
            max-w-sm max-h-[28rem] p-6 top-0 right-0 bottom-0 left-0'
          >
            <div className='flex flex-col justify-center items-center'>
              <WarningTriangleIcon size={24} />
              <h1 className='text-red-600 text-2xl font-bold'>
                Are you sure?
              </h1>
              <p className='text-sm font-medium text-center mt-2 px-6 py-2'>
                Do you really want to delete this task?
                This process cannot be undone.
              </p>
            </div>
            <div className='flex justify-evenly mt-4'>
              <button
                onClick={() => handleButtonClick(onCancel)}
                className=' rounded py-3 px-6 w-36
                font-bold text-center text-xs text-gray-900
                bg-gradient-to-t from-gray-500/50 to-gray-300
                hover:bg-gradient-to-b hover:shadow-inner
                shadow shadow-gray-500 active:opacity-75'
              >
                CANCEL
              </button>
              <button
                onClick={() => handleButtonClick(onSubmit)}
                className=' rounded py-3 px-6 w-36
                font-bold text-center text-xs text-white
                bg-gradient-to-t from-red-700 to-red-600
                hover:bg-gradient-to-b hover:shadow-inner
                shadow shadow-gray-500 active:opacity-75'
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RemoveTask;
