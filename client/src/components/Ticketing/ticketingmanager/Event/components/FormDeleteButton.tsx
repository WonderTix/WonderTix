import React, {useState} from 'react';
import {useEvent} from './EventProvider';

export const FormDeleteButton = (props: {
  onDelete: (event?) => void;
  label: string;
}) => {
  const {onDelete, label} = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const {showPopUp} = useEvent();

  return (
    <button
      type='button'
      onClick={ async () => {
        setIsDeleting(true);
        if (onDelete.length === 0) {
          await onDelete();
          setIsDeleting(false);
          return;
        }
        await onDelete(setIsDeleting);
      }}
      disabled={isDeleting || showPopUp}
      className={
        'bg-red-500 hover:bg-red-700 disabled:bg-gray-500 text-white font-bold p-2 rounded-xl h-fit'
      }
      aria-label={label}
    >
      Delete
    </button>
  );
};
