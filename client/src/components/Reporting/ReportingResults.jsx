import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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
import { unstable_getThemeValue } from "@material-ui/system";

export default function ReportingResults({ data, queryType }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (queryType == 1) setColumns(accountHeaders);
    else if (queryType == 2) setColumns(contactHeaders);
    else if (queryType == 3) setColumns(donationHeaders);

    if (data) setRows(data);
  }, [data]);

  const handleClick = (e) => {
    const [index, value] = e.target.id.split("-");
    if(index !== "1") return;
    navigate(`/contacts/${value}`);
  };

  if (!data) return <Typography></Typography>;

  return (
    <TableContainer
      sx={{ flexGrow: 1 }}
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
                      key={`${index}-${value}`}
                      id={`${index}-${value}`}
                      sx={{ p: 1 }}
                      onClick={handleClick}
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
