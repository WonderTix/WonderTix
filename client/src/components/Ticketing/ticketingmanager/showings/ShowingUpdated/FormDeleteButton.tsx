import {Button} from '@mui/material';
import React, {useState} from 'react';

export const FormDeleteButton = (props: { onDelete: (event) => void }) => {
  const {onDelete} = props;
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <button
      onClick={async (event) => {
        setIsDeleting(true);
        void onDelete(setIsDeleting);
      }}
      disabled={isDeleting}
      className={'bg-red-600 hover:bg-red-700  disabled:bg-gray-600 text-white font-bold p-2 rounded-xl'}
    >
      Delete
    </button>);
};
