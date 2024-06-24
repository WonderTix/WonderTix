import React, {useCallback, useState} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {useFetchData, useQueries} from './TicketExchangeUtils';
import SearchBox from '../../../CRM/Contacts/SearchBox';
import {defaultParameters} from '../../../CRM/Contacts/contactUtils';
import {DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams} from '@mui/x-data-grid';
import IconButton from '../../IconButton';
import {CircleCheckIcon, CircleIcon} from '../../Icons';

const CustomerPopUp: React.FC<{setShow: () => void}> = (
  props,
) => {
  const {token, customer, setCustomer, setRefundItems} =
    useTicketExchangeContext();
  const {setShow} = props;
  const [url, setUrl] = useState(`${process.env.REACT_APP_API_2_URL}/contact`);
  const [customers, loading, setLoading] = useFetchData<any[]>(url, {token});
  const {updateQueries, queries, queryString, addQuery} = useQueries();

  const onSelect = useCallback((customer?) => {
    setCustomer(customer);
    setRefundItems(new Map());
    setShow();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'full name',
      headerName: 'Full Name',
      flex: 2,
      minWidth: 200,
      type: 'string',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstname} ${params.row.lastname}`,
    },
    {
      field: 'email',
      flex: 3,
      minWidth: 200,
      headerName: 'Email',
      type: 'string',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Select',
      flex: 1,
      minWidth: 50,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => onSelect(params.row)}>
          {customer?.contactid === params.id ? (
            <CircleCheckIcon />
          ) : (
            <CircleIcon />
          )}
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className='max-h-full max-w-full max-tab:h-full max-tab:w-full w-fit bg-white place-self-center tab:rounded-xl flex flex-col justify-center overflow-y-scroll pt-3 pb-2 px-4'
    >
      <header className='flex flex-row justify-center w-full'>
        <SearchBox
          header='Select Customer'
          onSearch={() => {
            setLoading();
            setUrl(`${process.env.REACT_APP_API_2_URL}/contact?${queryString}`);
          }}
          queries={queries}
          defaultParameters={defaultParameters}
          updateQueries={updateQueries}
          addQuery={addQuery}
          queryMax={3}
        />
      </header>
      <div className='overflow-auto tab:min-w-[500px]'>
          <DataGrid
            sx={{
              borderRadius: '.75rem',
              fontSize: 12,
            }}
            columns={columns}
            disableSelectionOnClick
            loading={loading}
            rows={customers ?? []}
            getRowId={(row) => row.contactid}
            autoHeight
            disableColumnMenu
            rowsPerPageOptions={[10]}
            initialState={{
              pagination: {
                pageSize: 10,
              },
            }}
          />
      </div>
      <footer className='sticky bottom-0 bg-gray-50 w-full px-4 py-3 tab:px-6 flex flex-row justify-end gap-3'>
        <button
          onClick={setShow}
          className='bg-green-600 hover:bg-green-800 focus:ring-green-300 cursor-pointer
                  w-full rounded-md border border-transparent shadow-sm px-6 py-3 text-base font-medium
                  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 tab:w-auto tab:text-sm'
        >
          Close
        </button>
      </footer>
    </div>
  );
};

export default CustomerPopUp;
