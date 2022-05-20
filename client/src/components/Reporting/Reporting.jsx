
// Bug description: Unable to display column headers with full user information,
// When moving the scroll bar to the right, everything goes back to normal.
/*
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import {
  accountHeaders,
  contactHeaders,
  donationHeaders,
} from "../../utils/arrays.jsx";
import Panel from "../../utils/Panel.jsx";
import AccountsPanel from "./AccountsPanel.jsx";
import ContactsPanel from "./ContactsPanel.jsx";
import DonationsPanel from "./DonationsPanel.jsx";
import SavedPanel from "./SavedPanel.jsx";
import SavedDialog from "./SavedDialog.jsx";

export default function ReportingTest() {
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [pageSize, setPageSize] = React.useState(25);
  const [open, setOpen] = React.useState(false);
  const [savedName, setSavedName] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const fetchData = (query) => {
    let headers;
    let route;
    switch (value) {
      case 0:
        route = "accounts";
        headers = accountHeaders;
        break;
      case 1:
        route = "contacts";
        headers = contactHeaders;
        break;
      case 2:
        route = "donations";
        headers = donationHeaders;
        break;
      default:
        return;
    }

    setColumns(headers);

    let url = `http://localhost:8000/api/${route}`;

    if (query !== "") url += `?${query}`;

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setRows(data);
      });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleExport = (options) => {
      apiRef.current.exportDataAsCsv(options);
    };

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <Button
          size="small"
          startIcon={<ImportExportIcon />}
          onClick={handleExport}
        >
          Export
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Container
      sx={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <SavedDialog open={open} setOpen={setOpen} setSavedName={setSavedName} />
      <Paper
        sx={{
          ml: 2,
          mt: 2,
          p: 2,
          width: 250,
        }}
      >
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="search-label">Search by:</InputLabel>
          <Select
            fullWidth
            id="search-select"
            labelId="search-label"
            value={value}
            onChange={handleChange}
          >
            <MenuItem value={0}>Accounts</MenuItem>
            <MenuItem value={1}>Contacts</MenuItem>
            <MenuItem value={2}>Donations</MenuItem>
            <MenuItem value={3}>
              <strong>Saved</strong>
            </MenuItem>
          </Select>
        </FormControl>
        <Panel value={value} index={0}>
          <AccountsPanel
            fetchData={fetchData}
            setOpen={setOpen}
            savedName={savedName}
            setSavedName={setSavedName}
          />
        </Panel>
        <Panel value={value} index={1}>
          <ContactsPanel
            fetchData={fetchData}
            setOpen={setOpen}
            savedName={savedName}
            setSavedName={setSavedName}
          />
        </Panel>
        <Panel value={value} index={2}>
          <DonationsPanel
            fetchData={fetchData}
            setOpen={setOpen}
            savedName={savedName}
            setSavedName={setSavedName}
          />
        </Panel>
        <Panel value={value} index={3}>
          <SavedPanel setColumns={setColumns} setRows={setRows} />
        </Panel>
      </Paper>
      <Paper elevation={0} sx={{ flexGrow: 1, height: 500, m: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          onCellClick={(params, event) => {
            event.defaultMuiPrevented = true;
            if (params.field === "username")
              navigate(`/accounts/${params.formattedValue}`);
            else if (params.field === "custname")
              navigate(`/contacts/${params.formattedValue}`);
          }}
        />
      </Paper>
    </Container>
  );
}
*/



import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import {
  accountHeaders,
  contactHeaders,
  donationHeaders,
} from "../../utils/arrays.jsx";
import Panel from "../../utils/Panel.jsx";
import AccountsPanel from "./AccountsPanel.jsx";
import ContactsPanel from "./ContactsPanel.jsx";
import DonationsPanel from "./DonationsPanel.jsx";
import SavedPanel from "./SavedPanel.jsx";
import SavedDialog from "./SavedDialog.jsx";


import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';


export default function ReportingTest() {
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [pageSize, setPageSize] = React.useState(25);
  const [open, setOpen] = React.useState(false);
  const [savedName, setSavedName] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const fetchData = (query) => {
    let headers;
    let route;
    switch (value) {
      case 0:
        route = "accounts";
        headers = accountHeaders;
        break;
      case 1:
        route = "contacts";
        headers = contactHeaders;
        break;
      case 2:
        route = "donations";
        headers = donationHeaders;
        break;
      default:
        return;
    }

    setColumns(headers);

    let url = `http://localhost:8000/api/${route}`;

    if (query !== "") url += `?${query}`;

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setRows(data);
      });
  };



  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleExport = (options) => {
      apiRef.current.exportDataAsCsv(options);
    };

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <Button
          size="small"
          startIcon={<ImportExportIcon />}
          onClick={handleExport}
        >
          Export
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Container
      sx={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <SavedDialog open={open} setOpen={setOpen} setSavedName={setSavedName} />
      <Paper
        sx={{
          ml: 2,
          mt: 2,
          p: 2,
          width: 250,
        }}
      >
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="search-label">Search by:</InputLabel>
          <Select
            fullWidth
            id="search-select"
            labelId="search-label"
            value={value}
            onChange={handleChange}
          >
            <MenuItem value={0}>Accounts</MenuItem>
            <MenuItem value={1}>Contacts</MenuItem>
            <MenuItem value={2}>Donations</MenuItem>
            <MenuItem value={3}>
              <strong>Saved</strong>
            </MenuItem>
          </Select>
        </FormControl>
        <Panel value={value} index={0}>
          <AccountsPanel
            fetchData={fetchData}
            setOpen={setOpen}
            savedName={savedName}
            setSavedName={setSavedName}
          />
        </Panel>
        <Panel value={value} index={1}>
          <ContactsPanel
            fetchData={fetchData}
            setOpen={setOpen}
            savedName={savedName}
            setSavedName={setSavedName}
          />
        </Panel>
        <Panel value={value} index={2}>
          <DonationsPanel
            fetchData={fetchData}
            setOpen={setOpen}
            savedName={savedName}
            setSavedName={setSavedName}
          />
        </Panel>
        <Panel value={value} index={3}>
          <SavedPanel setColumns={setColumns} setRows={setRows} />
        </Panel>
      </Paper>
      <Paper elevation={0} sx={{ flexGrow: 1, height: 500, m: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          //experimentalFeatures={{ newEditingApi: true }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          //processRowUpdate={processRowUpdate}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          
          onCellClick={(params, event) => {
            event.defaultMuiPrevented = true;
            if (params.field === "username")
              navigate(`/accounts/${params.formattedValue}`);
            else if (params.field === "custname")
              navigate(`/contacts/${params.formattedValue}`);
          }}
          
        />


      </Paper>
    </Container>
  );
}