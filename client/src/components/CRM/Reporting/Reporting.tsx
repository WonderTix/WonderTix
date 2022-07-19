/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// Bug description: Unable to display column headers with full user information,
// When moving the scroll bar to the right, everything goes back to normal.
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {
  DataGrid,
  useGridApiContext,
} from '@mui/x-data-grid';
import {
  accountHeaders,
  contactHeaders,
  donationHeaders,
} from '../../../utils/arrays';
import Panel from '../../../utils/Panel';
import AccountsPanel from './AccountsPanel';
import ContactsPanel from './ContactsPanel';
import DonationsPanel from './DonationsPanel';
import SavedPanel from './SavedPanel';
import SavedDialog from './SavedDialog';
import {Fragment, useState} from 'react';


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


  const [showhide, setShowhide]=useState('');

  const handleshowhide=(event)=>{
    const getuser = event.target.value;
    setShowhide(getuser);
  };
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
      <div className='container columns-3 gap-4 ml-3 mt-3 '>
        <button
          className='flex flex-row  text-blue-600 gap-2
          items-center hover:text-blue-500 px-3 py-2 rounded-lg'
          onClick={handleExport}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              // eslint-disable-next-line max-len
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          Export
        </button>
      </div>
    );
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className=' md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] '>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-14     ' >Reporting</h1>
        </div>
        <div className='flex md:flex-row md:items-start sm:flex-col sm:items-center
     container '>

          <SavedDialog open={open} setOpen={setOpen} setSavedName={setSavedName} />

          <div className=" mt-2 p-6 md:w-60 sm:w-80 border border-zinc-100 shadow-lg rounded-xl bg-white">
            <div className='text-sm text-zinc-600'>Search by</div>
            <select className="form-control relative w-full cursor-default rounded-lg bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm  " onChange={(e)=>(handleshowhide(e))}>
              <option value="" >select here</option>
              <option value="1">Accounts</option>
              <option value="2">Contacts</option>
              <option value="3">Donations</option>
              <option value="4">Saved</option>
            </select>
            { showhide === '1' && (
              <div className='mt-4'>
                <AccountsPanel
                  fetchData={fetchData}
                  setOpen={setOpen}
                  savedName={savedName}
                  setSavedName={setSavedName}
                />
              </div>
            )
            }
            { showhide === '2' && (
              <div className='mt-4'>
                <ContactsPanel
                  fetchData={fetchData}
                  setOpen={setOpen}
                  savedName={savedName}
                  setSavedName={setSavedName}
                />
              </div>
            )
            }
            { showhide === '3' && (
              <div className='mt-4'>
                <DonationsPanel
                  fetchData={fetchData}
                  setOpen={setOpen}
                  savedName={savedName}
                  setSavedName={setSavedName}
                />
              </div>
            )
            }
            { showhide === '4' && (
              <div className='mt-4'>
                <SavedPanel setColumns={setColumns} setRows={setRows} />
              </div>
            )
            }

          </div>
          <div className='h-[50rem] w-[50rem] m-2 flex-grow-1 shadow-xl rounded-xl bg-white' >
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
          </div>
        </div>
      </div>
    </div>

  );
};

export default ReportingTest;
