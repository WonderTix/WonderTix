import React, {CSSProperties} from 'react';
import popupProps from '../../interfaces/popup.interface';

/**
 * @property {object} popUpContainer - A property container for pop up
 */
const popUpContainer: CSSProperties = {
  position: 'fixed',
  background: '#00000050',
  width: '100%',
  height: '100vh',
  top: '0',
  left: '0',
};

/**
 * @property {object} box - A property container for the box used for pop up
 */
const box: CSSProperties = {
  position: 'relative',
  width: '50%',
  margin: '0 auto',
  alignContent: 'center',
  height: 'auto',
  maxHeight: '70vh',
  marginTop: 'calc(100vh - 60vh - 20px)',
  overflow: 'auto',
  marginLeft: '30%',
};

/**
 * Popup makes use of both popUpContainer and box for styles
 *
 * @module
 * @param {string} title - Title of popup
 * @param {string} message - Message of popup
 * @param {handleClose} message - On close handler
 * @param {handleProceed} message - On proceed handler
 * @param {success} message - Success flag
 * @returns {ReactElement} PopUp - Function named PopUp that can be interacted
 * with
 */
const PopUp = ({
  title,
  message,
  handleClose,
  handleProceed,
  success,
}: popupProps) => {
  return (
    <div style={popUpContainer}>
      <div
        id='popup-modal'
        tabIndex={-1}
        style={box}
        className='overflow-y-auto
        text-center
         overflow-x-hidden fixed top-0 right-0
         left-0 z-50 md:inset-0 h-modal md:h-full'
      >
        <div
          style={{marginLeft: 'auto', marginRight: 'auto'}}
          className='relative p-4 w-full max-w-md h-full md:h-auto'
        >
          <div
            className='relative bg-white
          rounded-lg shadow dark:bg-white-700'
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
              <span className='sr-only'>Close modal</span>
            </button>
            <div className="flex flex-row gap-2 p-6 items-center">
              {
                !success &&
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              }
              <div className='text-start p-2 w-full'>
                <h3
                  className='mb-5 text-lg
               font-medium text-gray-900 '
                >
                  {title}
                </h3>
                <p
                  className='mb-5 text-md text-gray-500'
                >
                  {message}
                </p>
                <div className={'flex flex-row justify-end'}>
                  <button
                    className={
                      'border border-zinc-600 text-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'
                    }
                    onClick={handleClose}
                  >
                  Close
                  </button>
                  <button
                    data-modal-toggle='popup-modal'
                    onClick={handleProceed}
                    type='button'
                    className={`text-white ${
                      success
                        ? 'bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800'
                        : 'bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800'
                    }
                   focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}
                  >
                  Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
