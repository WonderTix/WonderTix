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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(async () => {
    if (params.id) {
      setIsLoading(true);
      setAccount(params.id);
      const data = await axios
        .get(
          `http://localhost:8000/api/accounts?filters[username][$eq]=${params.id}`
        )
        .then((res) => {
          setData(res.data[0]);
          console.log(res);
        })
        .catch((err) => {
          setError(err.message);
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [params.id]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`${account}`);
  };

  return (
    <Box
      sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <Paper
        component="form"
        elevation={3}
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
        {isLoading ? <CircularProgress /> : <AccountResults data={data} />}
      </Box>
    </Box>
  );
}
