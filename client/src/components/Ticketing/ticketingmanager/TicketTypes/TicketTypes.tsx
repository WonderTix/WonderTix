import React, {ReactElement, useEffect, useState} from 'react';
import {
  DataGrid,
  GridColumns,
  GridEventListener,
  GridRenderCellParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import {Tooltip} from '@mui/material';
import {useFetchToken} from '../Event/components/ShowingUtils';
import PopUp, {PopUpProps} from '../../PopUp';
import {LoadingScreen} from '../../mainpage/LoadingScreen';
import {EditIcon, SaveIcon, TrashCanIcon, XIcon} from '../../Icons';
import {toDollarAmount} from '../../../../utils/arrays';

// Web page that manages ticket types
const TicketTypes = (): ReactElement => {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [addTicketClicked, setAddTicketClicked] = useState(false);
  const [newTicketType, setTicketType] = useState('');
  const [newTicketPrice, setTicketPrice] = useState(0);
  const [newConcessionsPrice, setConcessionsPrice] = useState(0);
  const [confirmDeleteData, setConfirmDeleteData] = useState(null);
  const [errorPopUpData, setErrorPopUpData] = useState<PopUpProps | null>(null);
  const {token} = useFetchToken();

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  useEffect(() => {
    if (token !== '') {
      void getTicketTypes();
    }
  }, [token]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: {mode: GridRowModes.View, ignoreModifications: true},
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Defines the columns of the grid
  const columns: GridColumns = [
    {
      field: 'description',
      headerName: 'Ticket Type',
      width: 300,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      editable: true,
      type: 'number',
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return toDollarAmount(Number(params.value));
      },
    },
    {
      field: 'concessions',
      headerName: 'Concessions',
      width: 150,
      editable: true,
      type: 'number',
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return toDollarAmount(Number(params.value));
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      width: 100,
      align: 'center',
      renderCell: (cell) => {
        const isInEditMode =
          rowModesModel[cell.row.id]?.mode === GridRowModes.Edit;
        if (!isInEditMode) {
          return [
            <Tooltip
              title='Edit'
              placement='top'
              enterDelay={500}
              arrow
              key='edit'
            >
              <button
                className='p-2 rounded-lg text-zinc-500 hover:text-zinc-600 hover:bg-zinc-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                onClick={handleEditClick(cell.row.id)}
              >
                <EditIcon className='h-5 w-5' strokeWidth={2} />
              </button>
            </Tooltip>,
            <Tooltip
              title='Delete'
              placement='top'
              enterDelay={500}
              arrow
              key='delete'
            >
              <button
                className='p-2 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                onClick={() => {
                  setConfirmDeleteData({
                    title: 'Delete Ticket Type',
                    message:
                      'Are you sure you want to delete this ticket type?',
                    cellData: cell,
                  });
                }}
              >
                <TrashCanIcon className='h-5 w-5' strokeWidth={2} />
              </button>
            </Tooltip>,
          ];
        } else {
          return [
            <Tooltip
              key='save'
              title='Save'
              placement='top'
              enterDelay={500}
              arrow
            >
              <button
                className='p-2 rounded-lg text-zinc-500 hover:text-emerald-700 hover:bg-emerald-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                onClick={handleSaveClick(cell.row.id)}
              >
                <SaveIcon className='h-5 w-5' strokeWidth={2} />
              </button>
            </Tooltip>,
            <Tooltip
              key='cancel'
              title='Cancel'
              placement='top'
              enterDelay={500}
              arrow
            >
              <button
                className='p-2 rounded-lg text-zinc-500 hover:text-zinc-600 hover:bg-zinc-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                onClick={handleCancelClick(cell.row.id)}
              >
                <XIcon className='h-5 w-5' strokeWidth={2.2} />
              </button>
            </Tooltip>,
          ];
        }
      },
    },
  ];

  // handles editing a ticket type
  const handleEditTicket = React.useCallback(
    async (newRow: GridRowModel, prevRow: GridRowModel) => {
      if (
        newRow.description !== prevRow.description ||
        newRow.price !== prevRow.price ||
        newRow.concessions !== prevRow.concessions
      ) {
        await fetch(
          `${process.env.REACT_APP_API_2_URL}/ticket-type/${newRow.id}`,
          {
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
    },
    [ticketTypes],
  );

  // handles the click event of the delete button
  const handleDeleteClick = async (cell: GridRenderCellParams) => {
    const ticketId = Number(cell.row.id);
    try {
      const response = await fetch(
        process.env.REACT_APP_API_2_URL + '/ticket-type/' + ticketId,
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
      console.error(error);
    }
    setConfirmDeleteData(null);
    // refreshes the page, i.e. re-renders the table
    getTicketTypes();
  };

  // Fetches all the ticket types from the API in the backend
  const getTicketTypes = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_2_URL + '/ticket-type/editable',
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
      setTicketTypes(jsonRes);
    } catch (error) {
      console.error(error.message);
    }
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
        // refreshes the page, i.e. re-renders the table:
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
        <div className='shadow-xl p-5 rounded-xl bg-violet-700'>
          <div className='mb-3'>
            <label className='text-white' htmlFor='name'>
              Name
            </label>
            <input
              className='rounded-lg p-2 bg-blue-100 w-full mt-1'
              placeholder='Enter name of new ticket type'
              type='text'
              id='name'
              name='name'
              onChange={handleNameChange}
              required
            />
          </div>
          <div className='tab:grid grid-cols-2 gap-4'>
            <div className='mb-3'>
              <label className='text-white' htmlFor='price'>
                Price
              </label>
              <input
                className='rounded-lg p-2 bg-blue-100 w-full mt-1'
                placeholder='Ticket type price'
                type='number'
                min='0'
                id='price'
                name='price'
                onChange={handlePriceChange}
                required
              />
            </div>
            <div>
              <label className='text-white' htmlFor='concessions'>
                Concessions
              </label>
              <input
                className='rounded-lg p-2 bg-blue-100 w-full mt-1'
                placeholder='Concessions price'
                type='number'
                min='0'
                id='concessions'
                name='concessions'
                onChange={handleConcessionsChange}
                required
              />
            </div>
          </div>
          <div className='mt-5'>
            <button
              className='bg-blue-500 hover:bg-blue-600 disabled:opacity-40 shadow-md px-3 py-1
                text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500'
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 disabled:opacity-40 shadow-md px-3 py-1 ml-3
                text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-red-500'
              onClick={() => setAddTicketClicked(!addTicketClicked)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return token === '' ? (
    <LoadingScreen />
  ) : (
    <div className='w-full h-screen absolute'>
      <main className='w-full h-screen overflow-x-hidden absolute'>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-700 mb-10 pb-4'>
            Manage Ticket Types
          </h1>
          <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
            <button
              className='bg-blue-500 hover:bg-blue-600 disabled:opacity-40 mb-3 shadow-md px-4 py-2 text-sm
                font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500'
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
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              pageSize={10}
              experimentalFeatures={{newEditingApi: true}}
              processRowUpdate={handleEditTicket}
              onProcessRowUpdateError={(err) => console.error(err)}
            />
          </div>
        </div>
      </main>
      {confirmDeleteData && (
        <PopUp
          title={confirmDeleteData.title}
          message={confirmDeleteData.message}
          handleClose={() => setConfirmDeleteData(null)}
          handleProceed={() => handleDeleteClick(confirmDeleteData.cellData)}
          success={false}
        />
      )}
      {/* {errorPopUpData && (*/}
      {/*  <PopUp*/}
      {/*    title={errorPopUpData.title}*/}
      {/*    message={errorPopUpData.message}*/}
      {/*    handleProceed={errorPopUpData.handleProceed}*/}
      {/*    success={false}*/}
      {/*  />*/}
      {/* )}*/}
    </div>
  );
};

export default TicketTypes;
