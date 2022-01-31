import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function SavedPanel() {
  const [saved, setSaved] = useState(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {!saved ? (
        <Typography sx={{ textAlign: "center" }}>
          No saved queries found.
        </Typography>
      ) : (
        <FormControl>
          <RadioGroup>
              {saved.map((i) => {
                return (
                  <FormControlLabel
                    sx={{ mb: 1 }}
                    control={<Radio />}
                    name={i.name}
                    label={i.name}
                    value={i.name}
                  />
                );
              })}
          </RadioGroup>
          <ButtonGroup fullWidth>
            <Button type="submit" variant="contained">
              Run
            </Button>
            <Button color="error">
              Delete
            </Button>
          </ButtonGroup>
        </FormControl>
      )}
    </Box>
  );
}
