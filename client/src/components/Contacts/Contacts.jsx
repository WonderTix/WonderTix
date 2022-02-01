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
import ContactResults from "./ContactResults";

export default function Contacts() {
  const params = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [response, setResponse] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(async () => {
    if (params.id) {
      setResponse({ isLoading: true });
      setContact(params.id);
      /*
      const data = await axios
        .get(`api/customers?custname=${params.id}`)
        .then((res) => {
          setResponse({
            data: data,
            isLoading: false,
          });
        })
        .catch((err) => {
          setResponse({ error: err.message });
          console.log(err.message)
        })
        .finally(() => {
          setResponse({ isLoading: false });
        });
        */
    }
  }, [params.id]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`${contact}`);
  };

  return (
    <Box
      sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <Paper
        component="form"
        elevation={9}
        sx={{
          m: 2,
          display: "flex",
          width: 400,
        }}
      >
        <InputBase
          sx={{
            ml: "5px",
            flex: 1,
            pl: 2,
            py: 1,
          }}
          placeholder="Search by contact..."
          inputProps={{ "aria-label": "search by contact" }}
          size="small"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
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
        {response.isLoading ? (
          <CircularProgress />
        ) : (
          <ContactResults {...response} />
        )}
      </Box>
    </Box>
  );
}
