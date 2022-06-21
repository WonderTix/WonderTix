import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import ContactResults from './ContactResults';

const Contacts = (): React.ReactElement => {
  const params = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        setIsLoading(true);
        setContact(params.id);
        await axios
            .get(`http://localhost:8000/api/contacts?filters[custname][$eq]=${params.id}`)
            .then((res) => {
              setData(res.data[0]);
              console.log(res);
            })
            .catch((err) => {
              setError(err.message);
              console.log(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
      }
    };
    getData();
  }, [params.id]);

  const handleClick = (e: any) => {
    e.preventDefault();
    navigate(`${contact}`);
  };

  return (
    <Box
      sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}
    >
      <Paper
        component="form"
        elevation={3}
        sx={{
          m: 2,
          display: 'flex',
          width: 400,
        }}
      >
        <InputBase
          sx={{
            ml: '5px',
            flex: 1,
            pl: 2,
            py: 1,
          }}
          placeholder="Search by contact..."
          inputProps={{'aria-label': 'search by contact'}}
          size="small"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />
        <IconButton
          type="submit"
          sx={{p: 2}}
          aria-label="search"
          onClick={handleClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ContactResults data={data} />
        )}
      </Box>
    </Box>
  );
};

export default Contacts;
