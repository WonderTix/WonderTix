import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SavedDialog from '../SavedDialog';
import FilterSettings from './FilterSettings';
import {
  DataGrid,
  useGridApiContext,
} from '@mui/x-data-grid';
import SalesSummaryTable from './SalesSummaryTable';
import PaymentSummaryTable from './PaymentSummaryTable';
import NetSalesSummaryTable from './NetSalesSummaryTable';


const DailyReports: React.FC = (): React.ReactElement => {
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [rows, setRows] = useState([]);
  const [savedName, setSavedName] = useState('');
  const [showhide, setShowhide] = useState('');
  const [value, setValue] = useState('');

  const handleshowhide=(event)=>{
    const getuser = event.target.value;
    setShowhide(getuser);
    setValue((parseInt(getuser)-1).toString());
    console.log(value);
  };

  const tools = (): React.ReactElement => {
    return (
      <>
        <div className='container flex flex-col border-b bg-slate-100 p-4'>
          <div className="flex justify-between items-center">
            <h1 className='text-3xl font-bold bg-slate-100'>
              Daily Sales Reports
            </h1>
            <div className="flex space-x-2">
              <button
                className='flex flex-row rounded items-center
                text-slate-900 text-sm gap-2 px-2 py-1.5 font-semibold
                bg-gradient-to-t from-gray-400/50 to-gray-100
                hover:bg-gradient-to-b hover:shadow-inner w-40
                shadow shadow-gray-500 active:opacity-75'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /> </svg>
                  Export To Excel
              </button>
              <button
                className='flex flex-row rounded items-center
                text-slate-900 text-sm gap-2 px-2 py-1.5 font-semibold
                bg-gradient-to-t from-gray-400/50 to-gray-100
                hover:bg-gradient-to-b hover:shadow-inner w-40
                shadow shadow-gray-500 active:opacity-75'
              >
                Schedule Future Run
              </button>
            </div>
          </div>
          <div className='flex justify-evenly mt-6 gap-4 text-sm'>
            <p> <strong>Organization:</strong> Portland Playhouse</p>
            <p> <strong>Date Range:</strong> mm/dd/yy - mm/dd/yy</p>
            <p> <strong>Group by:</strong> Event, Instance</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className=' sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]
        md:ml-[18rem] md:mt-40'
      >
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent
            bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-14'
          >
            Daily Sales Reports
          </h1>
        </div>
        <div className='flex md:flex-row md:items-start
          sm:flex-col sm:items-center container'
        >
          <SavedDialog
            open={open}
            setOpen={setOpen}
            setSavedName={setSavedName}
          />
          <FilterSettings />

          <div
            className='h-full w-full mx-2 flex-grow-1 shadow-xl rounded-md
            bg-white border-t-4 border-black'
          >
            <div className='flex justify-between items-cente'> {tools()} </div>
            <SalesSummaryTable />
            <PaymentSummaryTable />
            <NetSalesSummaryTable />
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomToolbar = () => {
  const apiRef = useGridApiContext();

  const handleExport = (options: any) => {
    apiRef.current.exportDataAsCsv(options);
  };

  return (
    <div className='container flex justify-center gap-4 p-2
     border-b bg-slate-100'>
      <button
        onClick={handleExport}
        className='flex flex-row rounded items-center
        text-slate-900 text-sm gap-2 px-2 py-1.5 font-semibold
        bg-gradient-to-t from-gray-400/50 to-gray-100
        hover:bg-gradient-to-b hover:shadow-inner w-40
        shadow shadow-gray-500 active:opacity-75'
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /> </svg>
        Export To Excel
      </button>
      <button
        onClick={handleExport}
        className='flex flex-row rounded items-center
        text-slate-900 text-sm gap-2 px-2 py-1.5 font-semibold
        bg-gradient-to-t from-gray-400/50 to-gray-100
        hover:bg-gradient-to-b hover:shadow-inner w-40
        shadow shadow-gray-500 active:opacity-75'
      >
        Schedule Future Run
      </button>
    </div>
  );
};

export default DailyReports;
