import React from 'react';
import PropTypes from 'prop-types';
import {DataGrid, GridRenderCellParams} from '@mui/x-data-grid';

interface MultiLineCellProps {
  value?: string;
}

const MultiLineCell = (props: MultiLineCellProps): React.ReactElement => {
  const {value} = props;
  if (!value) return null;

  const lines = value.split('\n');
  return (
    <div
      className=""
      style={{gap: '5px'}}
    >
      {lines.map((line: string, index: number) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

MultiLineCell.propTypes = {
  value: PropTypes.string,
};

const eventSalesColumns = [
  {field: 'title', headerName: 'Sold Items', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'quantity', headerName: 'Quantity', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'amount', headerName: 'Amount', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'subQuantity', headerName: 'Subs Distribution Quantity', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'subAmount', headerName: 'Subs Distribution Amount', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'payment', headerName: 'Payment Method', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'total', headerName: 'Total', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
];

const eventSubtotalColumns = [
  {field: 'title', headerName: 'Event', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'quantity', headerName: 'Quantity', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'amount', headerName: 'Amount', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'subQuantity', headerName: 'Subs Distribution Quantity', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'subAmount', headerName: 'Subs Distribution Amount', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'payment', headerName: 'Payment Method', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'total', headerName: 'Total', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
];

const eventTotalColumns = [
  {field: 'title', headerName: 'Event', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'quantity', headerName: 'Quantity', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'amount', headerName: 'Amount', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'subQuantity', headerName: 'Subs Distribution Quantity', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'subAmount', headerName: 'Subs Distribution Amount', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'payment', headerName: 'Payment Method', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'total', headerName: 'Total', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
];

const eventSalesRows = [
  {
    id: 1,
    title: 'Chicken & Biscuits',
    quantity: '-2',
    amount: '-50.00',
    subQuantity: '0',
    subAmount: '0.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '-50.00\n' +
      '0.00\n' +
      '0.00',
  },
  {
    id: 2,
    title: 'Gift Certificates',
    quantity: '3',
    amount: '150.00',
    subQuantity: '0',
    subAmount: '0.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0.00\n' +
      '0.00\n' +
      '150.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00',
  },
  {
    id: 3,
    title: 'Season 15 Vouchers',
    quantity: '0',
    amount: '0.00',
    subQuantity: '-45',
    subAmount: '-1,895.25',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '-50.00\n' +
      '-1,795.75\n' +
      '0.00\n' +
      '0.00',
  },
  {
    id: 4,
    title: 'Season 16 Vouchers',
    quantity: '0',
    amount: '0.00',
    subQuantity: '174.00',
    subAmount: '7,527.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '7,527.00',
  },
  {
    id: 5,
    title: 'Sounds of Afrolitical Movement',
    quantity: '632',
    amount: '11,875.60',
    subQuantity: '41',
    subAmount: '1,696.25',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '195.00\n' +
      '570.20\n' +
      '10,820.90\n' +
      '-99.50\n' +
      '1,848.75\n' +
      '236.50\n' +
      '0.00',
  },
  {
    id: 6,
    title: 'Donated Fulfillment Tickets',
    quantity: '0',
    amount: '0.00',
    subQuantity: '4',
    subAmount: '199.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '199.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n',
  },
  {
    id: 7,
    title: 'Season 16 Subscriptions',
    quantity: '58',
    amount: '7,527.00',
    subQuantity: '0',
    subAmount: '-7,527.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0.00\n' +
      '581.00\n' +
      '6,946.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '-7,527.00',
  },
];

const eventSubtotalRows = [
  {
    id: 1,
    title: 'Event',
    quantity: '691',
    amount: '15,502.60',
    subQuantity: '0',
    subAmount: '0.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '195.00\n' +
      '1,151.20\n' +
      '17,916.90\n' +
      '0.00\n' +
      '3.00\n' +
      '236.50\n' +
      '0.00',
  },
  {
    id: 2,
    title: 'Fee',
    quantity: '0',
    amount: '432.00',
    subQuantity: '0',
    subAmount: '0.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0.00\n' +
      '24.00\n' +
      '411.00\n' +
      '0.00\n' +
      '-3.00\n' +
      '0.00\n' +
      '0.00',
  },
  {
    id: 3,
    title: 'Single Ticket Fee',
    quantity: '892',
    amount: '0.00',
    subQuantity: '0',
    subAmount: '0.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00',
  },
  {
    id: 4,
    title: 'PatronTicket Donations',
    quantity: '691',
    amount: '20,826.60',
    subQuantity: '0',
    subAmount: '0.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0\n' +
      '10.00\n' +
      '882.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00\n' +
      '0.00',
  },
];

const eventTotalRows = [
  {
    id: 1,
    title: 'Event',
    quantity: '691',
    amount: '20,826.60',
    subQuantity: '0',
    subAmount: '0.00',
    payment:
      'Cash\n' +
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Donated Fulfillment Tickets\n' +
      'Exchange\n' +
      'Gift Certificate Credit\n' +
      'Subscription',
    total:
      '0.00\n' +
      '1,185.20\n' +
      '19,209.90\n' +
      '195.00\n' +
      '0.00\n' +
      '236.50\n' +
      '0.00',
  },
];

const NetSalesSummaryReport: React.FC = (): React.ReactElement => {
  const rowHeight = 98;
  const headerHeight = 41;
  const [eventSalesTableRows, subtotalTableRow, totalTableRow] = [
    eventSalesRows.length, eventSubtotalRows.length, eventTotalRows.length,
  ];
  const [eventSalesTableHeight, subtotalTableHeight, totalTableHeight] = [
    ((eventSalesTableRows * rowHeight) + headerHeight),
    ((subtotalTableRow * rowHeight) + headerHeight),
    ((totalTableRow * rowHeight) + headerHeight),
  ];

  return (
    <div className='h-fit w-auto p-2 mt-4'>
      <h1 className='text-2xl font-bold p-2 my-2'>
        Net Sales & Payment Summary by Event
        <span className='text-xl font-medium'>
          {' (Reflects "On Hand" Totals)'}
        </span>
      </h1>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border'>Event Sales:</h2>
        <DataGrid
          hideFooter
          rowHeight={140}
          rows={eventSalesRows}
          columns={eventSalesColumns}
          disableSelectionOnClick
          density="compact"
          style={{height: `${eventSalesTableHeight}px`, borderRadius: 0, fontSize: '0.8rem'}}
        />
      </div>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border mt-6'>Event Subtotals:</h2>
        <DataGrid
          hideFooter
          rowHeight={140}
          rows={eventSubtotalRows}
          columns={eventSubtotalColumns}
          disableSelectionOnClick
          density="compact"
          style={{height: `${subtotalTableHeight}px`, borderRadius: 0, fontSize: '0.8rem'}}
        />
      </div>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border mt-6'>Event Totals:</h2>
        <DataGrid
          hideFooter
          rowHeight={140}
          rows={eventTotalRows}
          columns={eventTotalColumns}
          disableSelectionOnClick
          density="compact"
          style={{height: `${totalTableHeight}px`, borderRadius: 0, fontSize: '0.8rem'}}
        />
      </div>
    </div>
  );
};

export default NetSalesSummaryReport;
