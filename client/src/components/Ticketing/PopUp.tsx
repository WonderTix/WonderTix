import React, {ReactElement, useEffect, useRef} from 'react';
import {ExclamationIcon, XIcon} from './Icons';

/**
 * Interface for PopUp Component.
 * Describes the title and the message that is sent to the component.
 * Contains call back to parent component to close the PopUp windows.
 */
export interface PopUpProps {
  dataTestId?: string;
  title: string;
  message: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  handleClose?: (event: any) => void;
  handleProceed: (event: any) => void;
  success: boolean;
  showSecondary?: boolean;
  showClose?: boolean;
}

/**
 * The PopUp component, the WonderTix representation of a modal.
 *
 * @param {string?} dataTestId - Test ID used for testing purposes
 * @param {string} title - Title of popup
 * @param {string} message - Message of popup
 * @param {string?} primaryLabel - Text inside primary button
 * @param {string?} secondaryLabel - Text inside secondary button
 * @param {func?} handleClose - On close handler
 * @param {func} handleProceed - On proceed handler
 * @param {boolean} success - Success flag
 * @param {boolean?} showSecondary - Flag for showing secondary button in PopUp
 * @param {boolean?} showClose - Flag for showing close 'X' button in PopUp
 * @returns {ReactElement} PopUp WonderTix modal
 */
const PopUp = ({
  dataTestId,
  title,
  message,
  primaryLabel = 'Continue',
  secondaryLabel = 'Close',
  handleClose,
  handleProceed,
  success,
  showSecondary = true,
  showClose = true,
}: PopUpProps): ReactElement => {
  const popUpRef = useRef(null);

  useEffect(() => {
    // Code within the useEffect traps focus within the PopUp when tabbing through
    // button elements. See: https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b
    const popUpElement = popUpRef.current;
    popUpElement.focus();

    const focusableElements = popUpElement.querySelectorAll(
      'button, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKeyPress = (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        if (handleClose && (showClose || showSecondary)) {
          handleClose(event);
        }
      }
    };

    popUpElement.addEventListener('keydown', handleTabKeyPress);
    popUpElement.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      popUpElement.removeEventListener('keydown', handleTabKeyPress);
      popUpElement.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);

  return (
    <dialog
      className='fixed flex tab:items-center items-end bg-gray-500 bg-opacity-75 transition-opacity z-10 w-full h-full inset-0'
      aria-labelledby='popup-title'
      aria-describedby='popup-description'
      aria-modal='true'
      data-testid={dataTestId}
      ref={popUpRef}
    >
      <div
        id='popup-modal'
        className='relative z-10 bg-white rounded-lg overflow-hidden
          mx-2 tab:mx-auto my-2 tab:max-w-lg w-full shadow-xl transform transition-all'
      >
        {showClose && (
          <button
            type='button'
            onClick={handleClose}
            className='absolute top-3
              right-2.5 text-gray-400 bg-transparent hover:bg-gray-200
              hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto
              inline-flex items-center'
            data-modal-toggle='popup-modal'
            aria-label='Close modal'
          >
            <XIcon className='w-5 h-5' strokeWidth={2.5} />
          </button>
        )}
        <div className='flex flex-col tab:flex-row gap-3 p-4 pt-5 tab:p-6 tab:pb-4'>
          {!success && (
            <div className='mx-auto tab:mx-0 flex-shrink-0 flex items-center justify-center h-12 w-12 tab:h-10 tab:w-10 rounded-full bg-red-100 text-red-600'>
              <ExclamationIcon className='h-6 w-6' strokeWidth={2} />
            </div>
          )}
          <div className='text-center tab:text-start'>
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
        <footer className='bg-gray-50 px-4 py-3 tab:px-6 flex flex-col-reverse tab:flex-row tab:justify-end'>
          {showSecondary && (
            <button
              onClick={handleClose}
              className='mt-3 w-full inline-flex
                justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base
                font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500 tab:mt-0 tab:ml-3 tab:w-auto tab:text-sm'
            >
              {secondaryLabel}
            </button>
          )}
          <button
            data-modal-toggle='popup-modal'
            onClick={handleProceed}
            className={`${
              success
                ? 'bg-green-600 hover:bg-green-800 focus:ring-green-300'
                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            }
              w-full inline-flex justify-center rounded-md border border-transparent
              shadow-sm px-4 py-2 text-base font-medium text-white 
              focus:outline-none focus:ring-2 focus:ring-offset-2
              tab:ml-3 tab:w-auto tab:text-sm`}
          >
            {primaryLabel}
          </button>
        </footer>
      </div>
    </dialog>
  );
};

export default PopUp;
