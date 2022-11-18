import React, {useEffect, useState} from 'react';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowModel,
  GridRowParams,
} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import {useAuth0} from '@auth0/auth0-react';

// Web page that manages ticket types
const TicketTypes = () => {
  // id = 0, tickettypeid = 1, etc...
  const [ticketTypes, setTicketTypes] = useState([]);
  const {getAccessTokenSilently} = useAuth0();

  // Defines the columns of the grid
  const columns: GridColumns = [
  // const columns: GridColDef[] = [
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
      // valueParser: (value: GridCellValue, params: GridCellParams) => {
      // parseFloat(params.value);
      // },
    },
    /*
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 100,
      renderCell: (id) => {
        return <Chip label='Edit' onClick={handleEditClick(id)} />;
      },
    },
    */
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
          ' ' + newRow.price);
        console.log('Prev row: ' + prevRow.id + ' ' + prevRow.description +
          ' ' + prevRow.price);
        if (newRow.description !== prevRow.description ||
          newRow.price !== prevRow.price) {
          // NEXT: Also check that ticket name is not empty & price is number
          console.log('Ticket type has changed');
          // NEXT: Make PUT request to update ticket type
        }
        return newRow;
      }, [ticketTypes],
  );

  // handles the click event of the delete button
  const handleDeleteClick = async (cell: GridRenderCellParams) => {
    console.log('Delete Clicked');
    // console.log(`ID: ${cell.row.id}`);
    // console.log(event?.currentTarget.id)
    const ticketId = Number(cell.row.id) + 1;
    ticketId.toString();
    console.log('New id: ' + ticketId);

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTicket = async () => {
    return;
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
          // className='px-3 py-2 bg-blue-600 text-white rounded-xl float-right'
          className='px-3 py-2 bg-blue-600 text-white rounded-xl mr-0 mb-2'
          type='submit'
          onClick={handleAddTicket}
        >
          Add New Ticket Type
        </button>
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
