import React, {ReactElement} from 'react';
import popupProps from '../../interfaces/popup.interface';

/**
 * Popup makes use of both popUpContainer and box for styles
 *
 * @param {string} title - Title of popup
 * @param {string} message - Message of popup
 * @param {func} handleClose - On close handler
 * @param {func} handleProceed - On proceed handler
 * @param {boolean} success - Success flag
 * @returns {ReactElement} PopUp - Function named PopUp that can be interacted with
 */
const PopUp = ({
  title,
  message,
  handleClose,
  handleProceed,
  success,
}: popupProps): ReactElement => {
  return (
    <div
      className='fixed flex items-center bg-gray-500 bg-opacity-75 transition-opacity z-10 w-full h-full'
      aria-labelledby='popup-title'
      aria-describedby='popup-description'
      aria-modal='true'
      role='dialog'
    >
      <div
        id='popup-modal'
        tabIndex={-1}
        className='relative z-10 bg-white rounded-lg overflow-hidden
          mx-2 sm:mx-auto my-0 sm:max-w-lg w-full shadow-xl transform transition-all
          dark:bg-white-700'
      >
        <button
          type='button'
          onClick={handleClose}
          className='absolute top-3
            right-2.5 text-gray-400 bg-transparent hover:bg-gray-200
            hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto
            inline-flex items-center dark:hover:bg-gray-800
            dark:hover:text-white'
          data-modal-toggle='popup-modal'
          aria-label='Close modal'
        >
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div className='flex flex-col sm:flex-row gap-3 p-4 pt-5 sm:p-6 sm:pb-4'>
          {!success && (
            <div
              className='mx-auto sm:mx-0 flex-shrink-0 flex items-center justify-center
                h-12 w-12 sm:h-10 sm:w-10 rounded-full bg-red-100'
            >
              <svg
                className='h-6 w-6 text-red-600'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
            </div>
          )}
          <div className='text-center sm:text-start'>
            <h3
              className='text-lg leading-6 font-medium text-gray-900'
              id='popup-title'
            >
              {title}
            </h3>
            <p className='mt-2 text-sm text-gray-500' id='popup-description'>
              {message}
            </p>
          </div>
        </div>
        <footer
          className='bg-gray-50 px-4 py-3 sm:px-6 flex flex-col-reverse
            sm:flex-row sm:justify-end'
        >
          <button
            onClick={handleClose}
            className='mt-3 w-full inline-flex
              justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base
              font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
          >
            Close
          </button>
          <button
            data-modal-toggle='popup-modal'
            onClick={handleProceed}
            className={`${
              success
                ? 'bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800'
                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500 dark:focus:ring-red-800'
            }
              w-full inline-flex justify-center rounded-md border border-transparent
              shadow-sm px-4 py-2 text-base font-medium text-white 
              focus:outline-none focus:ring-2 focus:ring-offset-2
              sm:ml-3 sm:w-auto sm:text-sm`}
          >
            Continue
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PopUp;
