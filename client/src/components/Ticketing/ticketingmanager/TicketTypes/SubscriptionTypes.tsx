import React, {useState} from 'react';
import PopUp from '../../PopUp';
import {
  DataGrid,
  GridColumns,
  GridEditInputCell,
  GridEventListener,
  GridPreProcessEditCellProps,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridValueFormatterParams,
  useGridApiContext,
} from '@mui/x-data-grid';
import {useFetchToken} from '../Event/components/ShowingUtils';
import {Switch, Tooltip} from '@mui/material';
import {FormButton} from '../Event/components/FormButton';
import {formatUSD} from '../RefundOrders/RefundOrders';
import {
  apiCall,
  defaultSubscriptionType,
  useFetchSubscriptionTypes,
  usePopUp,
  validateSubscriptionType,
} from './SubscriptionTypeUtils';
import {
  CirclePlusIcon,
  EditIcon,
  SaveIcon,
  TrashCanIcon,
  XIcon,
} from '../../Icons';

export const SubscriptionTypes = () => {
  const {token} = useFetchToken();
  const {popUpProps, setPopUpProps, showPopUp, setShowPopUp} = usePopUp();
  const {subscriptionTypes = [], setSubscriptionTypes} =
    useFetchSubscriptionTypes();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [editing, setEditing] = useState(false);

  const SwitchInputCell = (
    cell: GridRenderCellParams | GridRenderEditCellParams,
  ) => {
    const apiRef = useGridApiContext();
    const disabled = !(rowModesModel[cell.id]?.mode === GridRowModes.Edit);
    return (
      <div className='w-full grid justify-center'>
        <Switch
          checked={cell.value}
          onChange={() =>
            apiRef.current.setEditCellValue({
              id: cell.id,
              field: cell.field,
              value: !cell.value,
            })
          }
          disabled={disabled}
          color='primary'
          size='small'
        />
      </div>
    );
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStart: GridEventListener<'rowEditStart'> = (_, event) => {
    if (editing) {
      event.defaultMuiPrevented = true;
    } else {
      setEditing(true);
    }
  };

  const handleDeleteClick = (id: GridRowId) => {
    const {id: current, ...rest} = rowModesModel;
    setPopUpProps(
      'Confirm Deletion',
      `Press Delete to proceed with deletion`,
      false,
      `delete-subscription-row-${id}`,
      async () => {
        try {
          await apiCall(
            'DELETE',
            `${process.env.REACT_APP_API_2_URL}/subscription-types/${id}`,
            undefined,
            token,
          );
          setRowModesModel(rest);
          setSubscriptionTypes((types) =>
            types.filter((type) => type.id !== id),
          );
        } catch (error) {
          setPopUpProps(
            'Delete Failed',
            error.json
              ? (await error.json()).error
              : 'Error deleting subscription type',
            false,
            'delete-failed',
          );
        }
      },
      'Delete',
      'Cancel',
    );
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    const {
      rowFocusOut,
      shiftTabKeyDown,
      escapeKeyDown,
      tabKeyDown,
    } = GridRowEditStopReasons;
    if (
      [shiftTabKeyDown, tabKeyDown, rowFocusOut, escapeKeyDown].includes(
        params.reason,
      )
    ) {
      event.defaultMuiPrevented = true;
    }
    if (params.reason === escapeKeyDown) {
      handleLeaveEdit(params.id);
    }
  };

  const handleLeaveEdit = (id: GridRowId) => {
    if (id !== -1) {
      setRowModesModel({
        ...rowModesModel,
        [id]: {mode: GridRowModes.View, ignoreModifications: true},
      });
    } else {
      const {id: current, ...rest} = rowModesModel;
      setRowModesModel(rest);
      setSubscriptionTypes((types) => types.filter((type) => type.id !== -1));
    }
    setEditing(false);
  };

  const handleSaveClick = async (id: GridRowId) => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
  };

  const handleEdit = (id: GridRowId) => {
    setEditing(true);
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
  };

  const handleEditRow = async (newRow: GridRowModel, prevRow: GridRowModel) => {
    try {
      const response = await apiCall(
        newRow.id !== -1 ? 'PUT' : 'POST',
        `${process.env.REACT_APP_API_2_URL}/subscription-types/${
          newRow.id !== -1 ? newRow.id : ''
        }`,
        validateSubscriptionType(newRow),
        token,
      );

      if (!response.ok) throw response;

      const updatedRow = await response.json();

      setEditing(false);
      setSubscriptionTypes((types) =>
        types.map((type) => (type.id === newRow.id ? updatedRow : type)),
      );
      setRowModesModel(({[-1]: current, ...rest}) => rest);
      return updatedRow;
    } catch (error) {
      setPopUpProps(
        'Save Failed',
        error.message
          ? error.message
          : error.json
          ? (await error.json()).error
          : 'Subscription Type update failed',
        false,
        'save-failed',
      );
      setEditing(false);
      setRowModesModel(({[-1]: current, ...rest}) => rest);
      setSubscriptionTypes((prev) => prev.filter((type) => type.id !== -1));
      return prevRow;
    }
  };

  const addRow = () => {
    setSubscriptionTypes((types) => [...types, defaultSubscriptionType]);
    setRowModesModel({...rowModesModel, [-1]: {mode: GridRowModes.Edit}});
    setEditing(true);
  };

  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Subscription Type',
      width: 130,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => ({
        ...params.props,
        error:
          !params.props.value || params.props.value.length === 0
            ? 'Name Required'
            : undefined,
      }),
      renderEditCell: EditCellWithTooltip,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => ({
        ...params.props,
        error:
          !params.props.value || params.props.value.length === 0
            ? 'Description Required'
            : undefined,
      }),
      renderEditCell: EditCellWithTooltip,
    },
    {
      field: 'price',
      headerName: 'Default Price',
      width: 110,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => ({
        ...params.props,
        error:
          isNaN(+params.props.value) || +params.props.value < 0
            ? 'Price must be positive'
            : undefined,
      }),
      valueFormatter: (params: GridValueFormatterParams) =>
        formatUSD(+params.value),
      renderEditCell: EditCellWithTooltip,
    },
    {
      field: 'previewonly',
      headerName: 'Preview Only',
      width: 110,
      editable: true,
      renderCell: SwitchInputCell,
      renderEditCell: SwitchInputCell,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (cell) => {
        return rowModesModel[cell.id]?.mode === GridRowModes.Edit
          ? [
              <FormButton
                key={`${cell.id}1`}
                onClick={() => handleSaveClick(cell.id)}
                title='Save'
                disabled={false}
                className='p-2 rounded-lg text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-emerald-700 hover:bg-emerald-100 focus:ring-emerald-500'
                testID='save-edit'
              >
                <SaveIcon />
              </FormButton>,
              <FormButton
                key={`${cell.id}2`}
                onClick={() => handleLeaveEdit(cell.id)}
                title='Cancel'
                disabled={false}
                className='p-2 rounded-lg text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-zinc-600 hover:bg-zinc-100 focus:ring-indigo-500'
                testID='leave-edit'
              >
                <XIcon className='h-5 w-5 stroke-[2.2]' />
              </FormButton>,
            ]
          : [
              <FormButton
                key={`${cell.id}3`}
                onClick={() => handleEdit(cell.id)}
                title='Edit'
                disabled={editing}
                className='p-2 rounded-lg text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-zinc-600 hover:bg-zinc-100 focus:ring-indigo-500'
                testID={`edit-subscription-type-${cell.id}`}
              >
                <EditIcon />
              </FormButton>,
              <FormButton
                key={`${cell.id}4`}
                onClick={() => handleDeleteClick(cell.id)}
                title='Delete'
                disabled={editing}
                className='p-2 rounded-lg text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-red-600 hover:bg-red-100 focus:ring-red-500'
                testID={`delete-subscription-type-${cell.id}`}
              >
                <TrashCanIcon />
              </FormButton>,
            ];
      },
    },
  ];

  return (
    <div className='p-6'>
      <div className='flex flex-row justify-between pb-4 mb-10'>
        <h1 className='font-bold text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-800 justify-center'>
          Manage Subscription Types
        </h1>
        <FormButton
          className='disabled:text-gray-500 text-green-400 hover:text-green-500 rounded-xl mr-0 mb-2 shadow-xl bg-white border border-green-200'
          title='Add Subscription Type'
          testID='add-subscription-type-button'
          disabled={editing}
          onClick={addRow}
        >
          <CirclePlusIcon className='h-12 w-12 stroke-2' />
        </FormButton>
      </div>
      <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
        <DataGrid
          className='bg-white'
          editMode='row'
          autoHeight
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          rows={subscriptionTypes}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          columns={columns}
          experimentalFeatures={{newEditingApi: true}}
          processRowUpdate={handleEditRow}
          onProcessRowUpdateError={(err) => console.log(err)}
        />
      </div>
      {showPopUp && (
        <PopUp
          title={popUpProps.title}
          message={popUpProps.message}
          handleClose={() => setShowPopUp(false)}
          handleProceed={async () => {
            setShowPopUp(false);
            if (popUpProps.handleProceed) await popUpProps.handleProceed();
          }}
          success={popUpProps.success}
          primaryLabel={popUpProps.primaryLabel}
          secondaryLabel={popUpProps.secondaryLabel}
          showSecondary={!!popUpProps.secondaryLabel}
          showClose={!!popUpProps.secondaryLabel}
        />
      )}
    </div>
  );
};

const EditCellWithTooltip = (props: GridRenderEditCellParams) => {
  const {error} = props;
  const propsToSend = {...props, error: !!error};
  return (
    <Tooltip open={!!error} title={error}>
      <span>
        <GridEditInputCell {...propsToSend} />
      </span>
    </Tooltip>
  );
};
