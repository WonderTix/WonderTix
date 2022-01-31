import React, { useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ButtonGroup,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { accountFilters, accountSorters } from "../../utils/arrays";

export default function AccountsPanel({setResponse}) {
  const [accountName, setAccountName] = useState("");
  const [accountId, setAccountId] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "account-name") setAccountName(e.target.value);
    else if (e.target.id === "account-id") setAccountId(e.target.value);
  };

  const runQuery = async () => {
    setResponse({ data: "test" })
  };

  return (
    <Box>
      <Accordion sx={{ maxWidth: "100%"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filter By</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          {accountFilters.map((i) => {
            return (
              <TextField
                fullWidth
                id={i.id}
                key={i.id}
                label={i.label}
                margin="dense"
                onChange={handleChange}
                size="small"
                type="text"
              />
            );
          })}
        </AccordionDetails>
        <Accordion sx={{ mx: 2, mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Advanced filters</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <FormGroup>
              <FormControlLabel control={<Switch />} label="Administrators" />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sort By</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <RadioGroup defaultValue="name-ascending">
            {accountSorters.map((i) => {
              return (
                <FormControlLabel
                  control={<Radio size="small" />}
                  id={i.value}
                  key={i.value}
                  label={i.label}
                  value={i.value}
                />
              );
            })}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <ButtonGroup fullWidth variant="contained" sx={{ mt: 3 }}>
        <Button onClick={runQuery}>Run</Button>
        <Button>Save</Button>
      </ButtonGroup>
    </Box>
  );
}
