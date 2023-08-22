import {Button} from '@mui/material';
import React from 'react';

export const FormDeleteButton = (props: { onDelete: (event) => void }) => {
  const {onDelete} = props;
  return (
    <Button
      color={'error'}
      variant={'contained'}
      onClick={onDelete}
    >
      Delete
    </Button>);
};
