import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

/**
 * @param {any} props React props to be passed to SavedDialog
 * @return {React.ReactElement}
 */
const SavedDialog = ({
  open,
  setOpen,
  setSavedName,
}: {
  open:boolean,
  setOpen: any,
  setSavedName: any
}): React.ReactElement => {
  const [name, setName] = React.useState('');

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Save query</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Save this query as the following name:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            setSavedName(name);
            setOpen(false);
          }}
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SavedDialog;
