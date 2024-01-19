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
          return toDollarAmount(0);
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
          return '%';
        }
        return `${params.value}%`;
      },
      renderHeader: () => (
        <Tooltip
          title='Discounts with a non-zero percent and amount value will use the percent capped at the amount off'
          placement='top'
          arrow
        >
          <div className='flex items-center gap-1'>
            Percent Off
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
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
          <Tooltip title='Edit' placement='top' arrow>
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
            </button>
          </Tooltip>
          <Tooltip title='Delete discount code' placement='top' arrow>
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
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
