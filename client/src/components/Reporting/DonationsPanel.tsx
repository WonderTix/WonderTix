import React from "react";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ButtonGroup, Button, Stack, TextField } from "@mui/material";
import { donationFiltersTextField } from "../../utils/arrays";

export default function DonationsPanel({ fetchData, setOpen, savedName, setSavedName }) {
  const [dononame, setDononame] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [beginValue, setBeginValue] = React.useState(null);
  const [endValue, setEndValue] = React.useState(null);

  React.useEffect(() => {
    if (savedName === "") return;

    let body = {
      table_name: savedName,
      query_attr: `donations/?${parseUrl()}`,
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

    if (dononame !== "")
      filters.push(`filters[dononame][$contains]=${dononame}`);
    if (amount !== "") filters.push(`filters[amount][$gt]=${amount}`);
    if (beginValue)
      filters.push(`filters[donodate][$gt]=${beginValue.toLocaleString()}`);
    if (endValue)
      filters.push(`filters[donodate][$lt]=${endValue.toLocaleString()}`);

    return filters.join("&");
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "dononame":
        setDononame(e.target.value);
        break;
      case "amount":
        setAmount(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {donationFiltersTextField.map((filter) => {
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={1}>
          <DatePicker
            label="From date"
            value={beginValue}
            renderInput={(params) => <TextField {...params} size="small" />}
            onChange={(newValue) => {
              setBeginValue(newValue);
            }}
          />
          <DatePicker
            label="Until date"
            value={endValue}
            renderInput={(params) => <TextField {...params} size="small" />}
            onChange={(newValue) => {
              setEndValue(newValue);
            }}
          />
        </Stack>
      </LocalizationProvider>
      <ButtonGroup fullWidth variant="contained" sx={{ mt: 2 }}>
        <Button onClick={() => fetchData(parseUrl())}>Run</Button>
        <Button onClick={() => setOpen(true)}>Save</Button>
      </ButtonGroup>
    </div>
  );
}
