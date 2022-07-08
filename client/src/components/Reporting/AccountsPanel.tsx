import React from 'react';
import {
  ButtonGroup,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@mui/material';
import {
  accountFiltersTextField,
  accountFiltersSwitch,
} from '../../utils/arrays';

const AccountsPanel = ({
  fetchData,
  setOpen,
  savedName,
  setSavedName,
}: {
  fetchData: any,
  setOpen: any,
  savedName: any,
  setSavedName: any,
}) => {
  const [username, setUsername] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    if (savedName === '') return;

    /* TODO
      Dynamic queries/Filter no longer being used by API.
      Need to redesign these POST requests.
    */

    const body = {
      table_name: savedName,
      query_attr: `accounts/?${parseUrl()}`,
    };

    fetch(`http://localhost:8000/api/saved_reports`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }).then((res) => console.log(res));

    setSavedName('');
  });

  const parseUrl = () => {
    const filters = [];
    [
      ['username', username],
      ['is_superadmin', isAdmin],
    ].forEach((filter) => {
      if (filter[1] === '' || filter[1] === false) return;

      filters.push(
          `filters[${filter[0]}]${
          typeof filter[1] === 'string' ? '[$contains]' : '[$eq]'
          }=${filter[1]}`,
      );
    });

    return filters.join('&');
  };

  const handleChange = (e) => {
    e.preventDefault();

    switch (e.target.id) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'is_superadmin':
        setIsAdmin(e.target.checked);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {accountFiltersTextField.map((filter) => {
        return (
          <TextField
            key={filter.id}
            id={filter.id}
            label={filter.label}
            variant="outlined"
            size="small"
            style={{marginBottom: '0.25rem'}}
            onChange={handleChange}
          />
        );
      })}
      <FormGroup sx={{ml: 1, mt: 1}}>
        {accountFiltersSwitch.map((filter) => {
          return (
            <FormControlLabel
              key={filter.id}
              control={<Switch size="small" id={filter.id} />}
              label={filter.label}
              sx={{mb: 1}}
              onChange={handleChange}
            />
          );
        })}
      </FormGroup>
      <ButtonGroup fullWidth variant="contained" sx={{mt: 1}}>
        <Button onClick={() => fetchData(parseUrl())}>Run</Button>
        <Button onClick={() => setOpen(true)}>Save</Button>
      </ButtonGroup>
    </div>
  );
};

export default AccountsPanel;
