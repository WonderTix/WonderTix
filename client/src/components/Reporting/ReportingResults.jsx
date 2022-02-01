import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  accountHeaders,
  contactHeaders,
  donationHeaders,
} from "../../utils/arrays";

export default function ReportingResults({ response, queryType }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (queryType == 1) setColumns(accountHeaders);
    else if (queryType == 2) setColumns(contactHeaders);
    else if (queryType == 3) setColumns(donationHeaders);
  }, [response]);

  if (!response.data) return <Typography></Typography>;

  return (
    <TableContainer
      elevation={6}
      component={Paper}
      sx={{ ml: 3, flexGrow: 1, p: 3 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell
                  align="center"
                  key={column.headerName}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {column.headerName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {rows.map((row) => {
                return <TableCell align="center" sx={{ border: "1px solid #000" }}></TableCell>;
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
