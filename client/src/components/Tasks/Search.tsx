import React, {useEffect, useState} from 'react';
import {
  Box,
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import {useNavigate, useParams} from 'react-router-dom';
import ContactResults from '../Contacts/ContactResults';
import axios from 'axios';

/**
 * @param {any} props Props to be passed to SearchBar
 * @return {React.ReactElement} HTMLElement for Searchbar
 */
const SearchBar = (props: any): React.ReactElement => {
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
            .get(
                `http://localhost:8000/api/contacts?filters[custname][$eq]=${params.id}`,
            )
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
          width: '100%',
        }}
      >
        <InputBase
          sx={{
            ml: '5px',
            flex: 1,
            pl: 2,
            py: 1,
          }}
          placeholder={props.data}
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
        {isLoading ? <CircularProgress /> : <ContactResults data={data} />}
      </Box>
    </Box>
  );
};

export default SearchBar;
