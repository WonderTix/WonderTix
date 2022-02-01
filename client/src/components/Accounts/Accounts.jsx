import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import AccountResults from "./AccountResults";

export default function Accounts() {
  const params = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [response, setResponse] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(async () => {
    if (params.id) {
      setResponse({ isLoading: true });
      setAccount(params.id);
      /*
      const data = await axios
        .get(`api/users?username=${params.id}`)
        .then((response) => {
          setResponse({
            data: response.data,
            isLoading: false,
          });
        })
        .catch((error) => {
          setResponse({ error: error.message });
          console.log(error.message);
        })
        .finally(() => {
          setResponse({ isLoading: false });
        });
    */
    }
  }, [params.id]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`${account}`);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        component="form"
        elevation={9}
        sx={{
          display: "flex",
          m: 2,
          width: 400,
        }}
      >
        <InputBase
          sx={{
            backgroundColor: "white",
            borderRadius: "2px",
            ml: "5px",
            flex: 1,
            pl: 2,
            py: 1,
          }}
          placeholder="Search by account..."
          inputProps={{ "aria-label": "search by account" }}
          size="small"
          value={account}
          onChange={(e) => {
            setAccount(e.target.value);
          }}
        />
        <IconButton
          type="submit"
          sx={{ p: 2 }}
          aria-label="search"
          onClick={handleClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box>
        {response.isLoading ? <CircularProgress /> : <AccountResults {...response} />}
      </Box>
    </Box>
  );
}
