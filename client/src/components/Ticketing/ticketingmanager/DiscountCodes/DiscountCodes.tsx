import React, {ReactElement, useEffect, useState} from 'react';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import {Switch, Tooltip} from '@mui/material';
import {useFetchToken} from '../Event/components/ShowingUtils';
import {toDollarAmount} from '../../../../utils/arrays';
import {LoadingScreen} from '../../mainpage/LoadingScreen';
import PopUp, {PopUpProps} from '../../PopUp';
import {EditIcon, HelpIcon, TrashCanIcon} from '../../Icons';
import DiscountPopUp, {DiscountPopUpProps} from './DiscountPopUp';
import {
  DiscountCode,
  baseDiscountCode,
  createDiscountCode,
  getDiscountCodes,
  editDiscountCode,
  deleteDiscountCode,
} from './discountUtils';

/**
 * The Admin Panel to Create, View, Edit, and Delete Discount codes.
 *
 * @returns ReactElement
 */
const DiscountCodes = (): ReactElement => {
  const {token} = useFetchToken();

  const [discountCodes, setDiscountCodes] = useState([]);
  const [popUpProps, setPopUpProps] = useState<PopUpProps | null>(null);
  const [discountPopUpProps, setDiscountPopUpProps] =
    useState<DiscountPopUpProps | null>(null);
  const [error, setError] = useState(null);

  // Defines the columns of the grid
  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Code',
      width: 150,
    },
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      width: 75,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Switch
            checked={params.value || false}
            onChange={() =>
              handleActivateDiscountCode({
                discountId: params.row.discountid,
                code: params.row.code,
                active: !params.row.active,
                amount: params.row.amount,
                percent: params.row.percent,
                minTickets: params.row.min_tickets,
                minEvents: params.row.min_events,
              })
            }
          />
        );
      },
    },
    {
      field: 'amount',
      headerName: 'Amount Off',
      type: 'number',
      width: 100,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return toDollarAmount(params.value);
      },
    },
    {
      field: 'percent',
      type: 'number',
      width: 130,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `${params.value}%`;
      },
      renderHeader: () => (
        <Tooltip
          title='Discounts with a percent and amount value will use the percent capped at the amount off'
          placement='top'
          arrow
        >
          <div className='flex items-center gap-1'>
            Percent Off
            <HelpIcon className='h-4 w-4' strokeWidth={2} />
          </div>
        </Tooltip>
      ),
    },
    {
      field: 'min_tickets',
      headerName: 'Minimum Tickets',
      type: 'number',
      width: 130,
    },
    {
      field: 'min_events',
      headerName: 'Minimum Events',
      type: 'number',
      width: 130,
    },
    {
      field: 'toolbar',
      headerName: '',
      align: 'left',
      sortable: false,
      renderCell: (cell) => (
        <>
          <Tooltip title='Edit' placement='top' enterDelay={500} arrow>
            <button
              className='p-2 rounded-lg text-zinc-500 hover:text-zinc-600 hover:bg-zinc-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={() =>
                setDiscountPopUpProps({
                  onCancel: () => {
                    setDiscountPopUpProps(null);
                    setError(null);
                  },
                  title: 'Edit Discount Code',
                  onSubmit: handleEditDiscountCode,
                  values: {
                    discountId: cell.row.discountid,
                    code: cell.row.code,
                    active: cell.row.active,
                    amount: cell.row.amount,
                    percent: cell.row.percent,
                    minTickets: cell.row.min_tickets,
                    minEvents: cell.row.min_events,
                  },
                })
              }
            >
              <EditIcon className='h-5 w-5' strokeWidth={2} />
            </button>
          </Tooltip>
          <Tooltip title='Delete' placement='top' enterDelay={500} arrow>
            <button
              className='p-2 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              onClick={() => {
                setPopUpProps({
                  title: 'Delete Discount Code',
                  message: 'Click delete to remove this discount code',
                  primaryLabel: 'Delete',
                  secondaryLabel: 'Cancel',
                  handleClose: () => setPopUpProps(null),
                  handleProceed: () => handleDeleteClick(cell),
                  success: false,
                });
              }}
            >
              <TrashCanIcon className='h-5 w-5' strokeWidth={2} />
            </button>
          </Tooltip>
        </>
      ),
    },
  ];

  const handleGetDiscountCodes = async () => {
    setDiscountCodes(await getDiscountCodes(token));
  };

  const handleCreateDiscountCode = async (discountCode: DiscountCode) => {
    const statusCode = await createDiscountCode(discountCode, token);
    if (statusCode === 201) {
      void handleGetDiscountCodes();
      setDiscountPopUpProps(null);
      setError(null);
    } else if (statusCode === 400) {
      setError('Discount with this code already exists');
    } else {
      setError('Failed to create discount code');
    }
  };

  const handleActivateDiscountCode = async (discountCode: DiscountCode) => {
    const statusCode = await editDiscountCode(discountCode, token);

    if (statusCode === 204) {
      void handleGetDiscountCodes();
    } else {
      setPopUpProps({
        title: 'Failure',
        message: 'Failed to change activation state of discount code',
        handleProceed: () => setPopUpProps(null),
        success: false,
        showSecondary: false,
        showClose: false,
      });
    }
  };

  const handleEditDiscountCode = async (discountCode: DiscountCode) => {
    const statusCode = await editDiscountCode(discountCode, token);

    if (statusCode === 204) {
      void handleGetDiscountCodes();
      setDiscountPopUpProps(null);
      setError(null);
    } else if (statusCode === 400) {
      setError('Discount with this code already exists');
    } else {
      setError('Failed to edit discount code');
    }
  };

  const handleDeleteClick = async (cell: GridRenderCellParams) => {
    setPopUpProps(null);

    const statusCode = await deleteDiscountCode(cell.row.discountid, token);

    if (statusCode === 204) {
      void handleGetDiscountCodes();
    } else {
      setPopUpProps({
        title: 'Failure',
        message: 'Cannot delete a discount code that has been used',
        handleProceed: () => setPopUpProps(null),
        success: false,
        showSecondary: false,
        showClose: false,
      });
    }
  };

  const getRowId = (row) => {
    return row.discountid;
  };

  useEffect(() => {
    if (token) {
      void handleGetDiscountCodes();
    }
  }, [token]);

  if (!token) {
    return <LoadingScreen />;
  } else {
    return (
      <div className='w-full h-screen absolute'>
        <main className='w-full h-screen overflow-x-hidden absolute'>
          <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
            <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500 mb-10 pb-4'>
              Manage Discount Codes
            </h1>
            <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
              <button
                className='bg-blue-500 hover:bg-blue-600 disabled:opacity-40 mb-3 shadow-md px-4 py-2 text-sm
                  font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-indigo-500'
                onClick={() =>
                  setDiscountPopUpProps({
                    onCancel: () => {
                      setDiscountPopUpProps(null);
                      setError(null);
                    },
                    onSubmit: handleCreateDiscountCode,
                    primaryLabel: 'Create',
                    values: baseDiscountCode,
                  })
                }
              >
                Create Discount Code
              </button>
              <DataGrid
                className='bg-white'
                editMode='row'
                autoHeight
                rows={discountCodes}
                columns={columns}
                rowsPerPageOptions={[10, 100]}
                getRowId={getRowId}
                disableSelectionOnClick
              />
            </div>
          </div>
        </main>
        {discountPopUpProps && (
          <DiscountPopUp errorMessage={error} {...discountPopUpProps} />
        )}
        {popUpProps && <PopUp {...popUpProps} />}
      </div>
    );
  }
};

export default DiscountCodes;
