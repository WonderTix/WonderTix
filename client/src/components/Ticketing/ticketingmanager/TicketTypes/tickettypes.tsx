import React, {useEffect, useState} from 'react';
import PopUp from '../../PopUp';
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
  const [confirmDeleteData, setConfirmDeleteData] = useState(null);

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
      field: 'concessions',
      headerName: 'Concessions',
      width: 150,
      editable: true,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      renderCell: (cell) => {
        // Check if the id of the row is 1
        if (cell.row.id === 1) {
          // Return a "Default" tag for id 1
          return <Chip label="Default" color="default" size="small" />;
        } else {
          // Return the delete button for other ids
          return (
            <Chip
              label='Delete'
              color='error'
              onClick={() => {
                setConfirmDeleteData({
                  title: 'Delete Ticket Type',
                  message: 'Are you sure you want to delete this ticket type?',
                  cellData: cell,
                });
              }}
            />
          );
        }
      },
    },
  ];

  // handles editing a ticket type
  const handleEditTicket = React.useCallback(
    async (newRow: GridRowModel, prevRow: GridRowModel) => {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });

      if (newRow.description !== prevRow.description ||
        newRow.price !== prevRow.price ||
        newRow.concessions !== prevRow.concessions) {
        const response = await fetch(
          `${process.env.REACT_APP_API_2_URL}/ticket-type/${newRow.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newRow),
          },
        );
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
        process.env.REACT_APP_API_2_URL + '/ticket-type/' + ticketId, {
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

      const responseData = await response.json();
    } catch (error) {
      console.log(error);
    }
    setConfirmDeleteData(null);
    // refreshes the page ie re-renders the table
    getTicketTypes();
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
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });

    try {
      const response = await fetch(
        process.env.REACT_APP_API_2_URL + '/ticket-type/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(
            {
              description: newTicketType,
              price: newTicketPrice,
              concessions: newConcessionsPrice,
            },
          ),
        },
      );
      if (response.ok) {
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
        process.env.REACT_APP_API_2_URL + '/ticket-type',
        {
          credentials: 'omit',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      const jsonRes = await response.json();
      console.log(jsonRes);
      setTicketTypes(jsonRes);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTicketTypes();
  }, []);

  return (
    <div className="w-full h-screen absolute">
      <div className='w-full h-screen overflow-x-hidden absolute '>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl leading-normal bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-zinc-500 mb-14'>
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
  </div>
  );
};

export default TicketTypes;
