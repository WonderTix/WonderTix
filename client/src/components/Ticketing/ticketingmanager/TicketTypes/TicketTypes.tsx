import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {
  DataGrid,
  GridColumns,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import {useFetchToken} from '../Event/components/ShowingUtils';
import {LoadingScreen} from '../../mainpage/LoadingScreen';
import PopUp, {PopUpProps} from '../../PopUp';
import IconButton from '../../IconButton';
import {EditIcon, SaveIcon, TrashCanIcon, XIcon} from '../../Icons';
import {toDollarAmount} from '../../../../utils/arrays';
import {
  createTicketType,
  deleteTicketType,
  editTicketType,
  emptyTicketType,
  getTicketTypes,
} from './ticketTypeUtils';

/**
 * The page that manages WonderTix ticket types.
 *
 * @returns ReactElement
 */
const TicketTypes = (): ReactElement => {
  const {token} = useFetchToken();

  const [ticketTypes, setTicketTypes] = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [addTicketClicked, setAddTicketClicked] = useState(false);
  const [newTicketType, setNewTicketType] = useState(emptyTicketType);
  const [popUpProps, setPopUpProps] = useState<PopUpProps | null>(null);

  useEffect(() => {
    if (token !== '') {
      void getAllTicketTypes();
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
      headerName: '',
      width: 100,
      align: 'center',
      renderCell: (cell) => {
        const isInEditMode =
          rowModesModel[cell.row.id]?.mode === GridRowModes.Edit;

        if (!isInEditMode) {
          return [
            <IconButton
              key='edit'
              onClick={handleEditClick(cell.row.id)}
              tooltip='Edit'
            >
              <EditIcon className='h-5 w-5' strokeWidth={2} />
            </IconButton>,
            <IconButton
              key='delete'
              hoverColor='red'
              onClick={() => {
                setPopUpProps({
                  title: 'Delete Ticket Type',
                  message:
                    'Are you sure you want to delete this ticket type?',
                  handleProceed: () => handleDeleteClick(cell.row.id),
                  primaryLabel: 'Delete',
                  secondaryLabel: 'Cancel',
                  success: false,
                });
              }}
              tooltip='Delete'
            >
              <TrashCanIcon className='h-5 w-5' strokeWidth={2} />
            </IconButton>,
          ];
        } else {
          return [
            <IconButton
              key='save'
              hoverColor='green'
              onClick={handleSaveClick(cell.row.id)}
              tooltip='Save'
            >
              <SaveIcon className='h-5 w-5' strokeWidth={2} />
            </IconButton>,
            <IconButton
              key='cancel'
              onClick={handleCancelClick(cell.row.id)}
              tooltip='Cancel'
            >
              <XIcon className='h-5 w-5' strokeWidth={2.2} />
            </IconButton>,
          ];
        }
      },
    },
  ];

  const handleAddTicketType = async () => {
    const response = await createTicketType(newTicketType, token);
    if (!response.error) {
      setAddTicketClicked(!addTicketClicked);
      void getAllTicketTypes();
    } else {
      setPopUpProps({
        title: 'Failed to Create Ticket Type',
        message: response.error,
        success: false,
        handleProceed: () => setPopUpProps(null),
        showSecondary: false,
        showClose: false,
      });
    }
  };

  const getAllTicketTypes = async () => {
    const ticketTypes = await getTicketTypes();
    if (!ticketTypes.error) {
      setTicketTypes(ticketTypes);
    } else {
      setPopUpProps({
        title: 'Failed to Get Ticket Types',
        message: ticketTypes.error,
        success: false,
        handleProceed: () => setPopUpProps(null),
        showSecondary: false,
        showClose: false,
      });
    }
  };

  const handleEditTicket = useCallback(
    async (newRow: GridRowModel, prevRow: GridRowModel) => {
      if (
        newRow.description !== prevRow.description ||
        newRow.price !== prevRow.price ||
        newRow.concessions !== prevRow.concessions
      ) {
        const ticketType = {
          id: newRow.id,
          description: newRow.description,
          price: newRow.price,
          concessions: newRow.concessions,
        };

        const response = await editTicketType(ticketType, token);
        if (!response.error) {
          return {
            ...newRow,
            price: response.price,
            concessions: response.concessions,
          };
        } else {
          setPopUpProps({
            title: 'Failed to Edit Ticket Type',
            message: response.error,
            success: false,
            handleProceed: () => setPopUpProps(null),
            showSecondary: false,
            showClose: false,
          });
        }
      }
      return prevRow;
    },
    [ticketTypes],
  );

  const handleDeleteClick = async (ticketTypeId: number) => {
    setPopUpProps(null);

    const response = await deleteTicketType(ticketTypeId, token);
    if (!response.error) {
      void getAllTicketTypes();
    } else {
      setPopUpProps({
        title: 'Failed to Delete Ticket Type',
        message: response.error,
        success: false,
        handleProceed: () => setPopUpProps(null),
        showSecondary: false,
        showClose: false,
      });
    }
  };

  const handleNewTicketTypeChange = (event) => {
    switch (event.target.name) {
      case 'description':
        setNewTicketType({...newTicketType, description: event.target.value});
        break;
      case 'price':
        setNewTicketType({...newTicketType, price: event.target.value});
        break;
      case 'concessions':
        setNewTicketType({...newTicketType, concessions: event.target.value});
        break;
    }
  };

  // Shows the form to add a new ticket type
  const showAddTicketView = () => {
    return (
      <div className='bg-violet-200 rounded-xl p-10 shadow-md mb-4'>
        <div className='shadow-xl p-5 rounded-xl bg-violet-700'>
          <div className='mb-3'>
            <label className='text-white' htmlFor='description'>
              Name
            </label>
            <input
              className='rounded-lg p-2 bg-blue-100 w-full mt-1'
              placeholder='Name of ticket type'
              type='text'
              id='description'
              name='description'
              onChange={handleNewTicketTypeChange}
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
                onChange={handleNewTicketTypeChange}
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
                onChange={handleNewTicketTypeChange}
              />
            </div>
          </div>
          <div className='mt-4'>
            <button
              className='bg-blue-500 hover:bg-blue-600 disabled:opacity-40 shadow-md px-3 py-1.5
                text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500'
              onClick={handleAddTicketType}
            >
              Submit
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 disabled:opacity-40 shadow-md px-3 py-1.5 ml-3
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
              onClick={() => {
                setNewTicketType(emptyTicketType);
                setAddTicketClicked(!addTicketClicked);
              }}
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
            />
          </div>
        </div>
      </main>
      {popUpProps && (
        <PopUp {...popUpProps} handleClose={() => setPopUpProps(null)} />
      )}
    </div>
  );
};

export default TicketTypes;
