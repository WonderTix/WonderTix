import React from "react";
import {
  ButtonGroup,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import {
  accountHeaders,
  contactHeaders,
  donationHeaders,
} from "../../utils/arrays";

export default function SavedPanel({ setColumns, setRows }) {
  const [refresher, setRefresher] = React.useState(0);
  const [saved, setSaved] = React.useState(null);
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    fetch(`http://localhost:8000/api/saved_reports`)
      .then((data) => data.json())
      .then((data) => {
        if (data.length > 0) setSaved(data);
        else setSaved(null);
      });
  }, [refresher]);

  const handleClickRun = () => {
    let headers = null;
    let route = value.split("/")[0];

    if (route === "accounts") headers = accountHeaders;
    else if (route === "contacts") headers = contactHeaders;
    else if (route === "donations") headers = donationHeaders;

    setColumns(headers);

    fetch(`http://localhost:8000/api/${value}`)
      .then((data) => data.json())
      .then((data) => setRows(data));
  };

  const handleClickDelete = () => {
    let id = -1;

    saved.forEach((save, index) => {
      if (save.query_attr === value) id = save.id;
    });

    if (id === -1) return;

    fetch(`http://localhost:8000/api/saved_reports/${id}`, {
      method: "delete",
    });

    if (saved.length === 0) setSaved(null);
    setRefresher(refresher + 1);
  };

  if (!saved)
    return (
      <Typography sx={{ textAlign: "center" }}>
        No saved queries found.
      </Typography>
    );

  return (
    <div>
      <RadioGroup
        sx={{ mb: 1 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {saved?.map((save, index) => {
          return (
            <FormControlLabel
              key={index}
              value={save.query_attr}
              label={save.table_name}
              control={<Radio size="small" sx={{ ml: 1 }} />}
              sx={{ mb: 1 }}
            />
          );
        })}
      </RadioGroup>
      <ButtonGroup fullWidth>
        <Button onClick={handleClickRun} variant="contained">
          Run
        </Button>
        <Button onClick={handleClickDelete} variant="contained" color="error">
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
}
