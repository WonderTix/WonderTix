import React, { useEffect, useState } from "react";
import {
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

export default function ReportingResults({ data, queryType }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (queryType == 1) setColumns(accountHeaders);
    else if (queryType == 2) setColumns(contactHeaders);
    else if (queryType == 3) setColumns(donationHeaders);

    if (data) setRows(data);
  }, [data]);

  if (!data) return <Typography></Typography>;

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
        <TableBody
          sx={{
            "& .MuiTableRow-root:nth-of-type(even)": {
              backgroundColor: "#dfdfdf",
            },
          }}
        >
          {rows.map((row) => {
            return (
              <TableRow>
                {Object.entries(row).map(([key, value], index) => {
                  return (
                    <TableCell
                      align="center"
                      key={`${index} ${value}`}
                      sx={{ p: 1 }}
                    >
                      {value !== undefined && value !== null ? value.toString() : ""}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
