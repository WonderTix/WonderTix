
import React, {useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import {useAuth0} from '@auth0/auth0-react';

// Web page that manages ticket types
const TicketTypes = () => {
  // const [ticketTypes, setTicketTypes] = useState([]);
  const {getAccessTokenSilently} = useAuth0();


  // Defines the columns of the grid
  const columns = [
    {field: 'type', headerName: 'Ticket Type', width: 300},
    {field: 'price', headerName: 'Price', width: 150},
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 100,
      renderCell: () => {
        return (
          <Chip
            label="Edit"
            onClick={handleEditClick}
          />
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      renderCell: () => {
        return (
          <Chip
            label="Delete"
            color="error"
            onClick={handleDeleteClick}
          />
        );
      },
    },
  ];

  // handles the click event of the edit button
  const handleEditClick = () => {
    console.log('Edit Clicked');
  };

  // handles the click event of the delete button
  const handleDeleteClick = () => {
    console.log('Delete Clicked');
  };


  // Fetches all the ticket types from the API in the backend
  const getTicketTypes = async () => {
    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });

    try {
      const response = await fetch(process.env.REACT_APP_ROOT_URL +
        '/api/tickets/types', {headers: {Authorization: `Bearer ${token}`}},
      );

      console.log('Access token --> ' + process.env.REACT_APP_ROOT_URL);
      const jsonRes = await response.json();
      const jsonData = jsonRes.data;

      console.log(jsonData);

      // setTicketTypes(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTicketTypes();
  }, []);

  // Defines the rows of the grid with dummy data of ticket types
  const data = [
    {id: 1, type: 'General Admission - Adult', price: '$39.50', edit: 'Edit',
      delete: 'Delete'},
    {id: 2, type: 'General Admission - Under 25', price: '$34.59', edit: 'Edit',
      delete: 'Delete'},
    {id: 3, type: 'Arts for All', price: '$5.00', edit: 'Edit',
      delete: 'Delete'},
    {id: 4, type: 'Access', price: '$25.00', edit: 'Edit', delete: 'Delete'},
    {id: 5, type: 'Previews', price: '$25.00', edit: 'Edit', delete: 'Delete'},
  ];

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
         sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <h1 className='font-bold text-5xl mb-14 bg-clip-text text-transparent
           bg-gradient-to-r from-green-400 to-teal-700' >
             Manage Ticket Types</h1>
        <button
        //   className='px-3 py-2 bg-blue-600 text-white rounded-xl float-right'
          className='px-3 py-2 bg-blue-600 text-white rounded-xl mr-0 mb-2'
          type='submit'>
            Add New Ticket Type
        </button>
        <DataGrid className='bg-white' autoHeight rows={data}
          columns={columns} pageSize={10} />
      </div>
    </div>
  );
};

export default TicketTypes;
