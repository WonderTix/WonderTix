import React from 'react';
import {
  ButtonGroup,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import {
  accountHeaders,
  contactHeaders,
  donationHeaders,
} from '../../../utils/arrays';
import {useAuth0} from '@auth0/auth0-react';

const SavedPanel = ({
  setColumns,
  setRows,
}: {
  setColumns: any,
  setRows: any
}): React.ReactElement => {
  const [refresher, setRefresher] = React.useState(0);
  const [saved, setSaved] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const {getAccessTokenSilently} = useAuth0();

  React.useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently({
        audience: 'https://localhost:8000',
        scope: 'admin',
      });
      const response = await fetch(
          process.env.REACT_APP_ROOT_URL + `/api/saved_reports`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      if (response.json.length > 0) {
        setSaved(response.json);
      } else {
        setSaved(null);
      }
    });
  }, [refresher, getAccessTokenSilently]);

  const handleClickRun = () => {
    let headers = null;
    const route = value.split('/')[0];

    if (route === 'accounts') headers = accountHeaders;
    else if (route === 'contacts') headers = contactHeaders;
    else if (route === 'donations') headers = donationHeaders;

    setColumns(headers);
    // TODO need to rework all the api POST requests for reporting
    fetch(process.env.REACT_APP_ROOT_URL + `/api/${value}`)
        .then((data) => data.json())
        .then((data) => setRows(data));
  };

  const handleClickDelete = () => {
    let id = -1;

    saved.forEach((save: any) => {
      if (save.query_attr === value) id = save.id;
    });

    if (id === -1) return;

    fetch(process.env.REACT_APP_ROOT_URL + `/api/saved_reports/${id}`, {
      method: 'delete',
    });

    if (saved.length === 0) setSaved(null);
    setRefresher(refresher + 1);
  };

  if (!saved) {
    return (
      <Typography sx={{textAlign: 'center'}}>
        No saved queries found.
      </Typography>
    );
  }

  return (
    <div>
      <RadioGroup
        sx={{mb: 1}}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {saved?.map((save: any, index: any) => {
          return (
            <FormControlLabel
              key={index}
              value={save.query_attr}
              label={save.table_name}
              control={<Radio size="small" sx={{ml: 1}} />}
              sx={{mb: 1}}
            />
          );
        })}
      </RadioGroup>
      <ButtonGroup fullWidth>
        <Button onClick={handleClickRun} variant="contained">
          Run
        </Button>
        <Button onClick={handleClickDelete} variant="contained" color="error">
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SavedPanel;
