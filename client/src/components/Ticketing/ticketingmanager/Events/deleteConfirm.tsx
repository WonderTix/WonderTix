/* eslint-disable max-len */
import React, {CSSProperties} from 'react';
import popupProps from '../../../../interfaces/popup.interface';

/**
 * @property {object} popUpContainer - A property container for pop up
 */
const popUpContainer: CSSProperties = {
  'position': 'fixed',
  'background': '#00000050',
  'width': '100%',
  'height': '100vh',
  'top': '0',
  'left': '0',
};

/**
 * @property {object} box - A property container for the box used for pop up
 */
const box: CSSProperties ={
  'position': 'relative',
  'width': '50%',
  'margin': '0 auto',
  'alignContent': 'center',
  'height': 'auto',
  'maxHeight': '70vh',
  'marginTop': 'calc(100vh - 60vh - 20px)',
  'overflow': 'auto',
  'marginLeft': '30%',
};

interface DeleteConfirmProps {
  message: string;
  setShowConfirm;
  handleDelete;
  id;
}
/**
 * Popup makes use of both popUpContainer and box for styles
 *
 * @module
 * @param {string} message - Message of popup
 * @returns {ReactElement} PopUp - Function named PopUp that can be interacted
 * with
 */

const DeleteConfirm = ({message, setShowConfirm, handleDelete, id}: DeleteConfirmProps) => {
  const handleClose = (e) => {
    if (e.target.value === 'Yes') {
      handleDelete(e);
    }
    setShowConfirm(false);
  };

  return (
    <div style={popUpContainer}>
      <div id="popup-modal"
        tabIndex={-1}
        style={box} className="overflow-y-auto
        text-center
         overflow-x-hidden fixed top-0 right-0
         left-0 z-50 md:inset-0 h-modal md:h-full">
        <div
          style={{marginLeft: 'auto', marginRight: 'auto'}}
          className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white
          rounded-lg shadow dark:bg-white-700">
            <div className="p-6 text-center">
              <p className="mb-5 text-lg font-normal
               text-black-500 dark:text-black-400">
                {message}
              </p>
              <button data-modal-toggle="popup-modal"
                onClick={handleClose}
                id={id}
                type="button" className="text-white bg-red-600
                hover:bg-red-800 focus:ring-4 focus:outline-none
                focus:ring-red-300 dark:focus:ring-red-800 font-medium
                 rounded-lg text-sm inline-flex items-center
                  px-5 py-2.5 text-center mr-2" value="Yes">
                    Yes
              </button>
              <button data-modal-toggle="popup-modal"
                id={id}
                onClick={handleClose}
                type="button" className="text-white bg-red-600
                hover:bg-red-800 focus:ring-4 focus:outline-none
                focus:ring-red-300 dark:focus:ring-red-800 font-medium
                 rounded-lg text-sm inline-flex items-center
                  px-5 py-2.5 text-center mr-2" value="No">
                    No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default DeleteConfirm;
