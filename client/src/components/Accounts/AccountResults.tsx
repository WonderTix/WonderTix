import React from 'react';
import {Button, Paper, Typography} from '@mui/material';

const AccountResults = ({
  data,
}: {
  data: any,
}): React.ReactElement => {
  if (!data) return <Typography></Typography>;

  const {username, id, is_superadmin: isSuperadmin} = data;

  return (
    <Paper
      elevation={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 2,
        p: 4,
        width: 500,
      }}
    >

      <Typography variant="h4">{username} </Typography>
      <Typography>ID: {id}</Typography>
      <Typography>Admin: {isSuperadmin ? 'Y' : 'N'}</Typography>
      <Button disabled variant="contained" sx={{alignSelf: 'end'}}>
        Edit
      </Button>
    </Paper>
  );
};

export default AccountResults;
