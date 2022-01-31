import React, { useState } from "react";
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
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { donationSorters } from "../../utils/arrays";

export default function DonationsPanel({setResponse}) {
  const [value, setValue] = useState(0);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const runQuery = () => {
    setResponse({ data: "test3" });
  }

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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2} mt={1}>
              <DatePicker
                label="From Date"
                value={beginDate}
                onChange={(i) => {
                  setBeginDate(i);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
              <DatePicker
                label="Until Date"
                value={endDate}
                onChange={(i) => {
                  setEndDate(i);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
              <TextField
                label="Donation Amount"
                fullWidth
                size="small"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
              <TextField label="Donor Name" fullWidth size="small" />
            </Stack>
          </LocalizationProvider>
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
              <FormControlLabel
                control={<Switch />}
                label="Exclude anonymous"
              />
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
            {donationSorters.map((i) => {
              return (
                <FormControlLabel
                  key={i.value}
                  value={i.value}
                  label={i.label}
                  control={<Radio size="small" />}
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
