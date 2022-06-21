import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import {
  contactFiltersTextField,
  contactFiltersSwitch,
} from "../../utils/arrays";

export default function ContactsPanel({ fetchData, setOpen, savedName, setSavedName }) {
  const [custname, setCustname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isVip, setIsVip] = React.useState(false);
  const [isVolunteerList, setIsVolunteerList] = React.useState(false);

  React.useEffect(() => {
    if (savedName === "") return;

    let body = {
      table_name: savedName,
      query_attr: `contacts/?${parseUrl()}`,
    };

    fetch(`http://localhost:8000/api/saved_reports`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => console.log(res));

    setSavedName("");
  });

  const parseUrl = () => {
    let filters = [];
    [
      ["custname", custname],
      ["email", email],
      ["phone", phone],
      ["address", address],
      ["vip", isVip],
      ['"volunteer list"', isVolunteerList],
    ].forEach((filter) => {
      if (filter[1] === "" || filter[1] === false) return;

      filters.push(
        `filters[${filter[0]}]${
          typeof filter[1] === "string" ? "[$contains]" : "[$eq]"
        }=${filter[1]}`
      );
    });

    return filters.join("&");
  };

  const handleChange = (e) => {
    e.preventDefault();

    switch (e.target.id) {
      case "custname":
        setCustname(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      case "email":
        setAddress(e.target.value);
        break;
      case "vip":
        setIsVip(e.target.checked);
        break;
      case "volunteer list":
        setIsVolunteerList(e.target.checked);
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {contactFiltersTextField.map((filter) => {
        return (
          <TextField
            key={filter.id}
            id={filter.id}
            label={filter.label}
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
            onChange={handleChange}
          />
        );
      })}
      <FormGroup sx={{ ml: 1, mt: 1 }}>
        {contactFiltersSwitch.map((filter) => {
          return (
            <FormControlLabel
              key={filter.id}
              control={<Switch size="small" id={filter.id} />}
              label={filter.label}
              sx={{ mb: 1 }}
              onChange={handleChange}
            />
          );
        })}
      </FormGroup>
      <ButtonGroup fullWidth variant="contained" sx={{ mt: 1 }}>
        <Button onClick={() => fetchData(parseUrl())}>Run</Button>
        <Button onClick={() => setOpen(true)}>Save</Button>
      </ButtonGroup>
    </Box>
  );
}
