import React from 'react';
import {DataGrid} from '@mui/x-data-grid';

const grossColumns = [
  {field: 'description', headerName: 'Gross Sales Total', flex: 1},
  {field: 'amount', headerName: 'Amount', flex: 1},
];

const refundColumns = [
  {field: 'description', headerName: 'Refund/Exchange', flex: 1},
  {field: 'amount', headerName: 'Amount', flex: 1},
];

const netColumns = [
  {field: 'description', headerName: 'Net Sales Totals', flex: 1},
  {field: 'amount', headerName: 'Amount', flex: 1},
];

const grossRows = [
  {
    id: 1,
    description: 'Tickets/Subs/Mbrshps',
    amount: '23,203.60',
  },
  {
    id: 2,
    description: 'Buyer Item Fees',
    amount: '462.00',
  },
  {
    id: 3,
    description: 'Buyer Order Fees',
    amount: '0.00',
  },
  {
    id: 4,
    description: 'PatronTicket Donations',
    amount: '892.00',
  },
  {
    id: 5,
    description: 'Donated Fulfillment Tickets',
    amount: '199.00',
  },
  {
    id: 6,
    description: 'GROSS TOTAL',
    amount: '24,756.60',
  },
];

const refundRows = [
  {
    id: 1,
    description: 'Tickets/Subs/Mbrshps',
    amount: '-3,701.00',
  },
  {
    id: 2,
    description: 'Buyer Item Fees',
    amount: '-30.00',
  },
  {
    id: 3,
    description: 'Buyer Order Fees',
    amount: '0.00',
  },
  {
    id: 4,
    description: 'PatronTicket Donations',
    amount: '0.00',
  },
  {
    id: 5,
    description: 'Donated Fulfillment Tickets',
    amount: '-199.00',
  },
  {
    id: 6,
    description: 'GROSS REFUND TOTAL',
    amount: '-3,930.00',
  },
];

const netRows = [
  {
    id: 1,
    description: 'Tickets/Subs/Mbrshps',
    amount: '19,502.60',
  },
  {
    id: 2,
    description: 'Tickets',
    amount: '11,975.60',
  },
  {
    id: 3,
    description: 'Subscriptions',
    amount: '7,527.00',
  },
  {
    id: 4,
    description: 'Buyer Item Fees',
    amount: '432.00',
  },
  {
    id: 5,
    description: 'Fee',
    amount: '432.00',
  },
  {
    id: 6,
    description: 'Single Ticket Fee',
    amount: '0.00',
  },
  {
    id: 7,
    description: 'Buyer Order Fees',
    amount: '0.00',
  },
  {
    id: 8,
    description: 'PatronTicket Donations',
    amount: '892.00',
  },
  {
    id: 9,
    description: 'Donated Fulfillment Tickets',
    amount: '0.00',
  },
  {
    id: 10,
    description: 'NET TOTAL ON HAND',
    amount: '20,826.60',
  },
  {
    id: 11,
    description: 'Patron Tech Fees',
    amount: '-699.00',
  },
  {
    id: 12,
    description: 'NET TOTAL',
    amount: '20,127.60',
  },
];

const SalesSummaryReport: React.FC = (): React.ReactElement => {
  const rowHeight = 36;
  const headerHeight = 41;
  const [grossTableRows, refundTableRows, netTableRows] = [
    grossRows.length, refundRows.length, netRows.length,
  ];

  const [grossTableHeight, refundTableHeight, netTableHeight] = [
    ((grossTableRows * rowHeight) + headerHeight),
    ((refundTableRows * rowHeight) + headerHeight),
    ((netTableRows * rowHeight) + headerHeight),
  ];

  return (
    <div className='h-fit w-auto p-2 mb-4'>
      <h1 className='text-2xl font-bold p-2 my-2'>Sales Summary Report</h1>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border'>Gross Sales Total:</h2>
        <DataGrid
          hideFooter
          rows={grossRows}
          columns={grossColumns}
          disableSelectionOnClick
          density="compact"
          style={{height: `${grossTableHeight}px`, borderRadius: 0}}
        />
      </div>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border mt-4'>Refund/Exchange:</h2>
        <DataGrid
          hideFooter
          rows={refundRows}
          columns={refundColumns}
          disableSelectionOnClick
          density="compact"
          style={{height: `${refundTableHeight}px`, borderRadius: 0}}
        />
      </div>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border mt-4'>Net Sales Totals:</h2>
        <DataGrid
          hideFooter
          rows={netRows}
          columns={netColumns}
          disableSelectionOnClick
          density="compact"
          style={{height: `${netTableHeight}px`, borderRadius: 0}}
        />
      </div>
    </div>
  );
};

export default SalesSummaryReport;
