import React, {useEffect, useState} from 'react';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowModel,
} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import {useAuth0} from '@auth0/auth0-react';
import {Navigate, NavigationType, useNavigationType} from 'react-router';
import {useNavigate} from 'react-router-dom';

// Web page that manages ticket types
const TicketTypes = () => {
  const [ticketTypes, setTicketTypes] = useState([]);
  const {getAccessTokenSilently} = useAuth0();
  const [addTicketClicked, setAddTicketClicked] = useState(false);
  const [newTicketType, setTicketType] = useState('');
  const [newTicketPrice, setTicketPrice] = useState(0);
  const [newConcessionsPrice, setConcessionsPrice] = useState(0);
  const [confirmDeletePrompt, setConfirmDeletePrompt] = useState(false);
  const [cellData, setCellData] = useState<any>([]);
  const navigate = useNavigate();

  // Defines the columns of the grid
  const columns: GridColumns = [
    {
      field: 'description',
      headerName: 'Ticket Type',
      width: 400,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      editable: true,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      renderCell: (cell) => {
        return (
          <Chip label='Delete' color='error' onClick={
            () => {
              setConfirmDeletePrompt(true);
              setCellData(cell);
            }
          } />
        );
      },
    },
  ];

  // handles editing a ticket type
  const handleEditTicket = React.useCallback(
    async (newRow: GridRowModel, prevRow: GridRowModel) => {
      console.log('New row: ' + newRow.id + ' ' + newRow.description +
        ' ' + newRow.price + ' ' + newRow.concessions);

      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });

      if (newRow.description !== prevRow.description ||
        newRow.price !== prevRow.price) {
        console.log('Ticket type has changed');

        const response = await fetch(
          process.env.REACT_APP_API_1_URL+'/tickets/updateType', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newRow),
          },
        );
        console.log(response);
      }
      return newRow;
    }, [ticketTypes],
  );

  // handles the click event of the delete button
  const handleDeleteClick = async (cell: GridRenderCellParams) => {
    const ticketId = Number(cell.row.id);
    ticketId.toString();

    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });

    try {
      const response = await fetch(
        process.env.REACT_APP_API_1_URL + '/tickets/' + ticketId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
    setConfirmDeletePrompt(false);
    // refreshes the page ie re-renders the table
    getTicketTypes();
  };


  // asks the user to confirm the deletion of a ticket type
  const showConfirmDeletePrompt = (cell: GridRenderCellParams) => {
    return (
      <div className='relative w-full h-screen overflow-x-hidden z-10'
        aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center
            min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left
              overflow-hidden shadow-xl transform transition-all sm:my-8
              sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center
                    justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0
                    sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                      aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
                        1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34
                        16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4
                    sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title">Delete </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex
              sm:flex-row-reverse">
                <button onClick={() => handleDeleteClick(cell)} type="button"
                  className="w-full inline-flex justify-center rounded-md
                  border border-transparent shadow-sm px-4 py-2 bg-red-600
                  text-base font-medium text-white hover:bg-red-700
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Yes</button>
                <button onClick={() => setConfirmDeletePrompt(false)}
                  type="button" className="mt-3 w-full inline-flex
                  justify-center rounded-md border border-gray-300 shadow-sm
                  px-4 py-2 bg-white text-base font-medium text-gray-700
                  hover:bg-gray-50 focus:outline-none focus:ring-2
                  focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3
                  sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
    console.log('Submit clicked');

    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });

    try {
      const response = await fetch(
        process.env.REACT_APP_API_1_URL + '/tickets/newType',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(
            {
              name: newTicketType,
              price: newTicketPrice,
              concessions: newConcessionsPrice,
            },
          ),
        },
      );
      if (response.ok) {
        console.log('Ticket type added successfully');
        // closes the form:
        setAddTicketClicked(!addTicketClicked);
        // refreshes the page ie re-renders the table:
        getTicketTypes();
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
            <label className="text-white" htmlFor="name">Name</label>
            <input
              className='input rounded-lg p-2 bg-blue-100 w-full'
              placeholder="Enter name of new ticket type"
              type="text"
              id="name"
              name="name"
              onChange={handleNameChange}
              required
            />
            <label className='text-white' htmlFor="price">Price</label>
            <input
              className='input rounded-lg p-2 bg-blue-100 w-full'
              placeholder="Price of ticket type"
              type="number"
              min="0"
              id="price"
              name="price"
              onChange={handlePriceChange}
              required
            />
            <label className='text-white' htmlFor="concessions">
              Concessions
            </label>
            <input
              className='input rounded-lg p-2 bg-blue-100 w-full'
              placeholder="Price of concessions"
              type="number"
              min="0"
              id="concessions"
              name="concessions"
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

  // Fetches all the ticket types from the API in the backend
  const getTicketTypes = async () => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });

    try {
      const response = await fetch(
        process.env.REACT_APP_API_1_URL + '/tickets/validTypes',
        {
          credentials: 'omit',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      console.log('Access token --> ' + process.env.REACT_APP_API_1_URL);
      const jsonRes = await response.json();

      setTicketTypes(jsonRes.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTicketTypes();
  }, []);

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div
        className='md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem]
        sm:mb-[11rem]'
      >
        <h1 className='font-bold text-5xl mb-10 pb-4 bg-clip-text text-transparent
        bg-gradient-to-r from-green-400 to-teal-700'>
          Manage Ticket Types
        </h1>
        <button
          className='px-3 py-2 bg-blue-600 text-white rounded-xl mr-0 mb-2'
          type='submit'
          onClick={() => setAddTicketClicked(!addTicketClicked)}
        >
          Add New Ticket Type
        </button>
        {addTicketClicked && showAddTicketView()}
        <DataGrid
          className='bg-white'
          editMode='row'
          autoHeight
          rows={ticketTypes}
          columns={columns}
          pageSize={10}
          experimentalFeatures={{newEditingApi: true}}
          processRowUpdate={handleEditTicket}
          onProcessRowUpdateError={(err) => console.log(err)}
        />
        {confirmDeletePrompt && showConfirmDeletePrompt(cellData)}
      </div>
    </div>
  );
};

export default TicketTypes;
