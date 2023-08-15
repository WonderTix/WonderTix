import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete.js';
import React from 'react';

export const FormDeleteButton = (props: { onDelete: (event) => void }) => {
  const {onDelete} = props;
  return (
    <Button
      color={'primary'}
      startIcon={<DeleteIcon/>}
      variant={'contained'}
      onClick={onDelete}
    >
      Delete
    </Button>);
};
