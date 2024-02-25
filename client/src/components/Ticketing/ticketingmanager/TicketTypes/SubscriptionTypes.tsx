import React, {useState} from 'react';
import PopUp from '../../PopUp';
import {
  DataGrid,
  GridColumns,
  GridEditInputCell,
  GridEventListener,
  GridPreProcessEditCellProps,
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
import {FormDeleteButton} from '../Event/components/FormDeleteButton';
import {formatUSD} from '../RefundOrders/RefundOrders';
import {
  apiCall,
  getDefaultSubscriptionType,
  useFetchSubscriptionTypes,
  usePopUp,
  validateSubscriptionType,
} from './SubscriptionTypeUtils';
import {
  BackIcon,
  CirclePlusIcon,
  EditIcon,
  SaveIcon,
  TrashCanIcon,
} from '../../Icons';

export const SubscriptionTypes = () => {
  const {token} = useFetchToken();
  const {popUpProps, setPopUpProps, showPopUp, setShowPopUp} = usePopUp();
  const {subscriptionTypes = [], setSubscriptionTypes} =
    useFetchSubscriptionTypes();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [editing, setEditing] = useState(false);

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
      'Confirm Delete',
      `Press continue to proceed with deletion`,
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
      enterKeyDown,
      tabKeyDown,
    } = GridRowEditStopReasons;
    if (
      params.reason === rowFocusOut ||
      params.reason === shiftTabKeyDown ||
      params.reason === escapeKeyDown ||
      params.reason === enterKeyDown ||
      params.reason === tabKeyDown
    ) {
      event.defaultMuiPrevented = true;
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
    setSubscriptionTypes((types) => [...types, getDefaultSubscriptionType()]);
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
            ? 'Invalid Input'
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
            ? 'Invalid Input'
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
          isNaN(+params.props.value) || +params.props.value <= 0
            ? 'Invalid Input'
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
      renderCell: (cell) => {
        return (
          <div className='w-full grid justify-center'>
            <Switch
              checked={cell.value}
              color='primary'
              size='small'
              disabled={true}
            />
          </div>
        );
      },
      renderEditCell: (cell) => {
        const apiRef = useGridApiContext();
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
              color='primary'
              size='small'
            />
          </div>
        );
      },
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (cell) => {
        return rowModesModel[cell.id]?.mode === GridRowModes.Edit ? (
          <div className='w-[100%] flex flex-row justify-around'>
            <FormButton
              key={`${cell.id}2`}
              onClick={() => handleLeaveEdit(cell.id)}
              title='Leave Edit'
              disabled={false}
              className=''
              testID='leave-edit'
            >
              <BackIcon className='h-5 w-5 stroke-5' />
            </FormButton>
            <FormButton
              key={`${cell.id}1`}
              onClick={() => handleSaveClick(cell.id)}
              title='Save'
              disabled={false}
              className=''
              testID={`save-edit`}
            >
              <SaveIcon className='h-5 w-5 stroke-5' />
            </FormButton>
          </div>
        ) : (
          <div className='w-[100%] flex flex-row justify-around'>
            <FormDeleteButton
              key={`${cell.id}1`}
              onDelete={() => handleDeleteClick(cell.id)}
              disabled={editing}
              className=''
              testID={`delete-subscription-type-${cell.id}`}
            >
              <TrashCanIcon className='h-5 w-5 stroke-5' />
            </FormDeleteButton>
            <FormButton
              key={`${cell.id}2`}
              onClick={() => handleEdit(cell.id)}
              title={`Edit Row`}
              disabled={editing}
              className=''
              testID={`edit-subscription-type-${cell.id}`}
            >
              <EditIcon className='h-5 w-5 stroke-5' />
            </FormButton>
          </div>
        );
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
        />
      )}
    </div>
  );
};

const EditCellWithTooltip = (props: GridRenderEditCellParams) => {
  const {error} = props;
  return (
    <Tooltip open={!!error} title={error}>
      <GridEditInputCell {...props} />
    </Tooltip>
  );
};
