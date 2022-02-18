import React, { useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ButtonGroup,
  Button,
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

export default function ContactsPanel({ setData }) {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactVip, setContactVip] = useState(false);
  const [contactNewsletter, setContactNewsletter] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.id;

    if (value === "contact-name") setContactName(e.target.value);
    else if (value === "contact-email") setContactEmail(e.target.value);
    else if (value === "contact-phone") setContactPhone(e.target.value);
    else if (value === "contact-address") setContactAddress(e.target.value);
    else if (value === "contact-vip") setContactVip(e.target.checked);
    else if (value === "contact-newsletter")
      setContactNewsletter(e.target.checked);
    else if (value.includes("asc") || value.includes("desc"))
      setSortBy(e.target.value);
  };

  const runQuery = async () => {
    const filters = [];
    if (contactName) filters.push(`filters[custname][$contains]=${contactName}`);
    if (contactEmail) filters.push(`filters[email][$contains]=${contactEmail}`);
    if (contactPhone) filters.push(`filters[phone][$contains]=${contactPhone}`);
    if (contactAddress)
      filters.push(`filters[custaddress][$contains]=${contactAddress}`);
    if (contactVip) filters.push(`filters[vip][$eq]=true`);
    if (contactNewsletter) filters.push(`filters[newsletter][$eq]=true`);
    if (sortBy) {
      let str = sortBy.split("-");
      filters.push(`sort[${str[0]}]=${str[1]}`);
    }
    const params = filters.join("&");
    let url = "http://localhost:8000/api/contacts";
    if (params != "") url += `?${params}`;
    console.log(url);

    const data = await axios
      .get(url)
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box>
      <Accordion sx={{ maxWidth: "100%" }}>
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
              <FormControlLabel
                control={
                  <Switch
                    checked={contactVip}
                    id="contact-vip"
                    onChange={handleChange}
                  />
                }
                label="VIP"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={contactNewsletter}
                    id="contact-newsletter"
                    onChange={handleChange}
                  />
                }
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
          <RadioGroup>
            {contactSorters.map((i) => {
              return (
                <FormControlLabel
                  control={
                    <Radio
                      size="small"
                      id={i.value}
                      value={i.value}
                      onChange={handleChange}
                    />
                  }
                  key={i.value}
                  label={i.label}
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
