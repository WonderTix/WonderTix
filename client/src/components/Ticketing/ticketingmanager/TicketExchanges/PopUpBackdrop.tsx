import React, {useEffect, useRef} from 'react';

const PopUpBackdrop: React.FC<{showPopUp: boolean; setShow: () => void}> = (
  props,
) => {
  const {showPopUp, setShow, children} = props;
  const popUpRef = useRef(null);
  useEffect(() => {
    if (!showPopUp) return;
    const popUpElement = popUpRef.current;
    popUpElement.focus();

    const focusableElements = popUpElement.querySelectorAll(
      'button, input, select, option, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    const handleBackDropClick = (event) =>
      event.target.id.includes('pop-up-backdrop') && setShow();
    const handleEscapeKeyPress = (event: KeyboardEvent) =>
      event.key === 'Escape' && setShow();

    popUpElement.addEventListener('click', handleBackDropClick);
    popUpElement.addEventListener('keydown', handleEscapeKeyPress);
    popUpElement.addEventListener('keydown', handleTabKeyPress);
    return () => {
      popUpElement.removeEventListener('click', handleBackDropClick);
      popUpElement.removeEventListener('keydown', handleEscapeKeyPress);
      popUpElement.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [showPopUp]);

  return (
    <dialog
      id='pop-up-backdrop'
      ref={popUpRef}
      className={`p-0 fixed inset-0 z-20 flex flex-col place-content-center h-full w-full bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-300 ${
        showPopUp ? 'visible opacity-1' : 'opacity-0 invisible'
      }`}
    >
      {showPopUp && children}
    </dialog>
  );
};

export default PopUpBackdrop;
