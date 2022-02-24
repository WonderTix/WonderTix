import React from "react";
import {
  ButtonGroup,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function SavedPanel({ fetchData }) {
  const [saved, setSaved] = React.useState(null /*[{ value: "test", name: "test" }]*/);

  if (!saved)
    return (
      <Typography sx={{ textAlign: "center" }}>
        No saved queries found.
      </Typography>
    );

  return (
    <div>
      <RadioGroup sx={{ mb: 1 }}>
        {saved?.map((i) => {
          return (
            <FormControlLabel
              value={i.value}
              label={i.name}
              control={<Radio size="small" sx={{ ml: 1 }}/>}
              sx={{ mb: 1 }}
            />
          );
        })}
      </RadioGroup>
      <ButtonGroup fullWidth>
        <Button variant="contained">Run</Button>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
}
