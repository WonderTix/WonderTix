// Bug description: Unable to display column headers with full user information,
// When moving the scroll bar to the right, everything goes back to normal.
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import {
  accountHeaders,
  contactHeaders,
  donationHeaders,
} from '../../utils/arrays';
import Panel from '../../utils/Panel';
import AccountsPanel from './AccountsPanel';
import ContactsPanel from './ContactsPanel';
import DonationsPanel from './DonationsPanel';
import SavedPanel from './SavedPanel';
import SavedDialog from './SavedDialog';

/**
 * @return {React.ReactElement} ReportingTest HTMLElement
 */
const ReportingTest = (): React.ReactElement => {
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [pageSize, setPageSize] = React.useState(25);
  const [open, setOpen] = React.useState(false);
  const [savedName, setSavedName] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const fetchData = (query: any) => {
    let headers: any;
    let route: any;
    switch (value) {
      case '0':
        route = 'accounts';
        headers = accountHeaders;
        break;
      case '1':
        route = 'contacts';
        headers = contactHeaders;
        break;
      case '2':
        route = 'donations';
        headers = donationHeaders;
        break;
      default:
        return;
    }

    setColumns(headers);

    let url = `http://localhost:8000/api/${route}`;

    if (query !== '') url += `?${query}`;

    fetch(url)
        .then((data) => data.json())
        .then((data) => {
          setRows(data);
        });
  };

  const CustomToolbar = () => {
    const apiRef = useGridApiContext();

    const handleExport = (options: any) => {
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
  };

  return (
    <Container
      sx={{
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
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
        <FormControl sx={{width: '100%'}}>
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
      <Paper elevation={0} sx={{flexGrow: 1, height: 500, m: 2}}>
        <DataGrid
          rows={rows}
          columns={columns}
          // experimentalFeatures={{ newEditingApi: true }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // processRowUpdate={processRowUpdate}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}

          onCellClick={(params, event) => {
            event.defaultMuiPrevented = true;
            if (params.field === 'username') {
              navigate(`/accounts/${params.formattedValue}`);
            } else if (params.field === 'custname') {
              navigate(`/contacts/${params.formattedValue}`);
            }
          }}
        />
      </Paper>
    </Container>
  );
};

export default ReportingTest;
