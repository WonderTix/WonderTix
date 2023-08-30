import React, {useState} from 'react';

export const FormDeleteButton = (props: {
  onDelete: (event) => void;
  label: string;
}) => {
  const {onDelete, label} = props;
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <button
      onClick={async () => {
        setIsDeleting(true);
        await onDelete(setIsDeleting);
      }}
      disabled={isDeleting}
      className={
        'bg-red-500 hover:bg-red-700 disabled:bg-gray-500 text-white font-bold p-2 rounded-xl h-fit'
      }
      aria-label={label}
    >
      Delete
    </button>
  );
};
