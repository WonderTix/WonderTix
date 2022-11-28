import React, {useEffect, useState} from 'react';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowModel,
} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import {useAuth0} from '@auth0/auth0-react';

// Web page that manages ticket types
const TicketTypes = () => {
  const [ticketTypes, setTicketTypes] = useState([]);
  const {getAccessTokenSilently} = useAuth0();
  const [addTicketClicked, setAddTicketClicked] = useState(false);
  const [newTicketType, setTicketType] = useState('');
  const [newTicketPrice, setTicketPrice] = useState(0);
  const [newConcessionsPrice, setConcessionsPrice] = useState(0);

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
            () => handleDeleteClick(cell)} />
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
          audience: 'https://localhost:8000',
          scope: 'admin',
        });

        if (newRow.description !== prevRow.description ||
          newRow.price !== prevRow.price) {
          console.log('Ticket type has changed');

          const response = await fetch(
              process.env.REACT_APP_ROOT_URL+'/api/tickets/updateType', {
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
    console.log('Delete Clicked');
    const ticketId = Number(cell.row.id);
    ticketId.toString();

    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });

    try {
      const response = await fetch(
          process.env.REACT_APP_ROOT_URL + '/api/tickets/' + ticketId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

      const responseData = await response.json();
      console.log(responseData);
      getTicketTypes(); // refreshes the page ie re-renders the table
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setTicketType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setTicketPrice(event.target.value);
  };

  const handleConcessionsChange = (event) => {
    setConcessionsPrice(event.target.value);
  };

  const handleSubmit = async () => {
    console.log('Submit clicked');

    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });

    try {
      const response = await fetch(
          process.env.REACT_APP_ROOT_URL + '/api/tickets/newType',
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
        setAddTicketClicked(!addTicketClicked); // closes the form
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Shows the form to add a new ticket type
  const showAddTicketView = () => {
    return (
      <div className='bg-blue-200 rounded-xl p-10 shadow-md mb-4'>
        <div className='shadow-xl p-5 rounded-xl mb-9 bg-blue-700'>
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
      audience: 'https://localhost:8000',
      scope: 'admin',
    });

    try {
      const response = await fetch(
          process.env.REACT_APP_ROOT_URL + '/api/tickets/types',
          {
            credentials: 'omit',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          },
      );

      console.log('Access token --> ' + process.env.REACT_APP_ROOT_URL);
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
        className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
         sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'
      >
        <h1
          className='font-bold text-5xl mb-14 bg-clip-text text-transparent
           bg-gradient-to-r from-green-400 to-teal-700'
        >
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
          // }}
        />
      </div>
    </div>
  );
};

export default TicketTypes;
