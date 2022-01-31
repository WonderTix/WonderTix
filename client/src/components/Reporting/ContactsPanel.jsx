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
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { contactFilters, contactSorters } from "../../utils/arrays";

export default function ContactsPanel({setResponse}) {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.id === "contact-name") setContactName(e.target.value);
    else if (e.target.id === "contact-email") setContactEmail(e.target.value);
    else if (e.target.id === "contact-phone") setContactPhone(e.target.value);
    else if (e.target.id === "contact-address") setContactAddress(e.target.value);
  };

  const runQuery = async () => {
    setResponse({ data: "test2" })
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
          {contactFilters.map((i) => {
            return (
              <TextField
                id={i.id}
                fullWidth
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
              <FormControlLabel control={<Switch />} label="VIP" />
              <FormControlLabel
                control={<Switch />}
                label="Subscribed to newsletter"
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
            {contactSorters.map((i) => {
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
