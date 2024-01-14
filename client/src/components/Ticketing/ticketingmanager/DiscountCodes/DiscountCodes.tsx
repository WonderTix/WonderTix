import React, {ReactElement, useEffect, useState} from 'react';
import {
  DataGrid,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRenderCellParams,
  GridRowModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import PopUp from '../../PopUp';
import {useFetchToken} from '../Event/components/ShowingUtils';
import {LoadingScreen} from '../../mainpage/LoadingScreen';
import {toDollarAmount} from '../../../../utils/arrays';
import {Tooltip} from '@mui/material';

// TODO: Add ability to create new codes
//       Have validation messages
//       Check more than just activeness when adding a discount code

/**
 *
 * @returns ReactElement
 */
const DiscountCodes = (): ReactElement => {
  const {token} = useFetchToken();

  const [discountCodes, setDiscountCodes] = useState([]);
  const [addTicketClicked, setAddTicketClicked] = useState(false);
  const [newTicketType, setTicketType] = useState('');
  const [newTicketPrice, setTicketPrice] = useState(0);
  const [newConcessionsPrice, setConcessionsPrice] = useState(0);
  const [confirmDeleteData, setConfirmDeleteData] = useState(null);
  const [error, setError] = useState(null);

  // Defines the columns of the grid
  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Code',
      width: 150,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const discountCode = params.props.value;
        const errorMessage =
          discountCode!.length > 32 || discountCode!.length == 0
            ? 'Discount Code must be between 0 and 32 characters'
            : null;
        return {...params.props, error: errorMessage};
      },
    },
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      width: 75,
      editable: true,
    },
    {
      field: 'amount',
      headerName: 'Amount Off',
      type: 'number',
      width: 100,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return toDollarAmount(0);
        }
        return toDollarAmount(params.value);
      },
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const amount = params.props.value;
        const errorMessage = amount! < 0 ? 'Amount must be 0 or greater' : null;
        return {...params.props, error: errorMessage};
      },
    },
    {
      field: 'percent',
      headerName: 'Percent Off',
      type: 'number',
      width: 100,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '%';
        }
        return `${params.value}%`;
      },
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const percent = params.props.value;
        const errorMessage = percent! < 0 ? 'Percent must be 0 or greater' : null;
        return {...params.props, error: errorMessage};
      },
    },
    {
      field: 'min_tickets',
      headerName: 'Minimum Tickets',
      type: 'number',
      width: 130,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const minTickets = params.props.value;
        const errorMessage = minTickets! < 0 ? 'Minimum Tickets must be 0 or greater' : null;
        return {...params.props, error: errorMessage};
      },
    },
    {
      field: 'min_events',
      headerName: 'Minimum Events',
      type: 'number',
      width: 130,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const minEvents = params.props.value;
        const errorMessage = minEvents! < 0 ? 'Minimum Events must be 0 or greater' : null;
        return {...params.props, error: errorMessage};
      },
    },
    {
      field: 'toolbar',
      type: 'actions',
      align: 'left',
      sortable: false,
      renderCell: (cell) => (
        <Tooltip title='Delete discount code' placement='top' arrow>
          <button
            className='p-2 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-100
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            onClick={() => {
              setConfirmDeleteData({
                title: 'Delete Discount Code',
                message: 'Are you sure you want to delete this discount code?',
                cellData: cell,
              });
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </button>
        </Tooltip>
      ),
    },
  ];

  const getRowId = (row) => {
    return row.discountid;
  };

  // handles editing a ticket type
  const handleEditDiscountCode = React.useCallback(
    async (newRow: GridRowModel, prevRow: GridRowModel) => {
      const reqBody = {...newRow};

      if (
        newRow.active !== prevRow.active ||
        newRow.code !== prevRow.code ||
        newRow.amount !== prevRow.amount ||
        newRow.percent !== prevRow.percent ||
        newRow.min_tickets !== prevRow.min_tickets ||
        newRow.min_events !== prevRow.min_events
      ) {
        await fetch(
          `${process.env.REACT_APP_API_2_URL}/discount/${newRow.discountid}`,
          {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reqBody),
          },
        );
      }
      return newRow;
    },
    [discountCodes],
  );

  // handles the click event of the delete button
  const handleDeleteClick = async (cell: GridRenderCellParams) => {
    const discountId = cell.row.discountid;
    setConfirmDeleteData(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_2_URL}/discount/${discountId}`,
        {
          credentials: 'include',
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }
    } catch (error) {
      setError('Cannot delete a discount code that has been used');
    }
    // refreshes the page ie re-renders the table
    void getDiscountCodes();
  };

  // stores the name of the ticket type
  const handleNameChange = (event) => {
    setTicketType(event.target.value);
  };

  // stores the price of the ticket type
  const handlePriceChange = (event) => {
    setTicketPrice(event.target.value);
  };

  // stores the concession price of the ticket type
  const handleConcessionsChange = (event) => {
    setConcessionsPrice(event.target.value);
  };

  // handles the submit click when adding new ticket type
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_2_URL + '/ticket-type/',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: newTicketType,
            price: newTicketPrice,
            concessions: newConcessionsPrice,
          }),
        },
      );
      if (response.ok) {
        // closes the form:
        setAddTicketClicked(!addTicketClicked);
        // refreshes the page ie re-renders the table:
        getDiscountCodes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Shows the form to add a new ticket type
  const showAddTicketView = () => {
    return (
      <div className='bg-violet-200 rounded-xl p-10 shadow-md mb-4'>
        <div className='shadow-xl p-5 rounded-xl mb-9 bg-violet-700'>
          <div className='flex flex-col gap-5 mt-5 md:pr-20'>
            <label className='text-white' htmlFor='name'>
              Name
            </label>
            <input
              className='input rounded-lg p-2 bg-blue-100 w-full'
              placeholder='Enter name of new ticket type'
              type='text'
              id='name'
              name='name'
              onChange={handleNameChange}
              required
            />
            <label className='text-white' htmlFor='price'>
              Price
            </label>
            <input
              className='input rounded-lg p-2 bg-blue-100 w-full'
              placeholder='Price of ticket type'
              type='number'
              min='0'
              id='price'
              name='price'
              onChange={handlePriceChange}
              required
            />
            <label className='text-white' htmlFor='concessions'>
              Concessions
            </label>
            <input
              className='input rounded-lg p-2 bg-blue-100 w-full'
              placeholder='Price of concessions'
              type='number'
              min='0'
              id='concessions'
              name='concessions'
              onChange={handleConcessionsChange}
              required
            />
          </div>
          <button
            className='px-2 py-1 bg-blue-500 disabled:opacity-30
              mt-6 mb-4 text-white rounded-lg text-sm'
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className='px-2 py-1 bg-red-500 disabled:opacity-30
              ml-9 mt-6 mb-4 text-white rounded-lg text-sm'
            onClick={() => setAddTicketClicked(!addTicketClicked)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Fetches all Discount Codes from the API in the backend
  const getDiscountCodes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_2_URL}/discount`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      const jsonRes = await response.json();
      setDiscountCodes(jsonRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      void getDiscountCodes();
    }
  }, [token]);

  if (!token) {
    return <LoadingScreen />;
  } else {
    return (
      <div className='w-full h-screen absolute'>
        <div className='w-full h-screen overflow-x-hidden absolute'>
          <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
            <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500 mb-10 pb-4'>
              Manage Discount Codes
            </h1>
            <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
              <DataGrid
                className='bg-white'
                editMode='row'
                autoHeight
                rows={discountCodes}
                columns={columns}
                pageSize={10}
                getRowId={getRowId}
                experimentalFeatures={{newEditingApi: true}}
                processRowUpdate={handleEditDiscountCode}
                onProcessRowUpdateError={(err) => console.log(err)}
              />
            </div>
          </div>
        </div>
        {confirmDeleteData && (
          <PopUp
            title={confirmDeleteData.title}
            message={confirmDeleteData.message}
            handleClose={() => setConfirmDeleteData(null)}
            handleProceed={() => handleDeleteClick(confirmDeleteData.cellData)}
            success={false}
          />
        )}
        {error && (
          <PopUp
            title='Failure'
            message={error}
            handleProceed={() => setError(null)}
            success={false}
            showSecondary={false}
            showClose={false}
          />
        )}
      </div>
    );
  }
};

export default DiscountCodes;
