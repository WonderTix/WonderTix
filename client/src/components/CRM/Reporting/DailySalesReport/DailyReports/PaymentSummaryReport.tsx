import React from 'react';
import {DataGrid} from '@mui/x-data-grid';

const paymentColumns = [
  {field: 'payment', headerName: 'Payment Method', flex: 1},
  {field: 'gross', headerName: 'Gross Sales', flex: 1},
  {field: 'refund', headerName: 'Refund/Exchange', flex: 1},
  {field: 'total', headerName: 'Net Total', flex: 1},
];

const paymentRows = [
  {
    id: 1,
    payment: 'Credit Card Totals',
    gross: '20,395.10',
    refund: '0.00',
    total: '20,395.10',
  },
  {
    id: 2,
    payment: 'Amex',
    gross: '1,185.20',
    refund: '0.00',
    total: '1,185.20',
  },
  {
    id: 3,
    payment: 'Visa/MC/Discover',
    gross: '19,209.90',
    refund: '0.00',
    total: '19,209.90',
  },
  {
    id: 4,
    payment: 'Cash',
    gross: '195.00',
    refund: '0.00',
    total: '195.00',
  },
  {
    id: 5,
    payment: 'Exchange',
    gross: '3,731.00',
    refund: '-3,731.00',
    total: '0.00',
  },
  {
    id: 6,
    payment: 'Donated Fulfillment Tickets',
    gross: '199.00',
    refund: '-199.00',
    total: '0.00',
  },
  {
    id: 7,
    payment: 'Gift Certificate Credit',
    gross: '236.50',
    refund: '0.00',
    total: '236.50',
  },
  {
    id: 8,
    payment: 'TOTAL',
    gross: '24,756.60',
    refund: '-3,930.00',
    total: '20,826.60',
  },
];

const PaymentSummaryReport: React.FC = (): React.ReactElement => {
  return (
    <div className='h-fit w-auto p-2 mt-4'>
      <h1 className='text-2xl font-bold p-2 my-2'>
        Payment Summary Report
        <span className='text-xl font-medium'>
          {' (reflects "on hand" totals)'}
        </span>
      </h1>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border'>Gross Sales Total:</h2>
        <DataGrid
          hideFooter
          rows={paymentRows}
          columns={paymentColumns}
          disableSelectionOnClick
          style={{height: 474, borderRadius: 0}}
        />
      </div>
    </div>
  );
};

export default PaymentSummaryReport;
