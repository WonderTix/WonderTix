import React from "react";
import { Box } from "@mui/material";

export default function Panel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="panel"
      hidden={value !== index}
      id={`panel-${index}`}
      aria-labelledby={`panel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ borderTop: "1px solid lightgray", mt:2, pt: 2 }}>{children}</Box>
      )}
    </div>
  );
}
