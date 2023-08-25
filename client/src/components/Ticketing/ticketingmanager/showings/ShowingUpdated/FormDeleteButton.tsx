import React, {useState} from 'react';

export const FormDeleteButton = (props: {onDelete: (event) => void}) => {
  const {onDelete} = props;
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <button
      onClick={async () => {
        setIsDeleting(true);
        await onDelete(setIsDeleting);
      }}
      disabled={isDeleting}
      className={
        'border border-red-900 bg-red-600 hover:bg-red-700  disabled:bg-gray-600 text-white font-bold p-2 rounded-xl'
      }
      aria-label={'Delete'}
    >
      Delete
    </button>
  );
};
