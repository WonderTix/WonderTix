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
    <div>
      {lines.map((line: string, index: number) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

MultiLineCell.propTypes = {
  value: PropTypes.string,
};

const paymentColumns = [
  {field: 'quantity', headerName: 'Quantity', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'amount', headerName: 'Amount', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'subQuantity', headerName: 'Distribution Quantity', flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      <MultiLineCell value={params.value} />,
  },
  {field: 'subAmount', headerName: 'Distribution Amount', flex: 1,
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

const paymentRows = [
  {
    id: 1,
    quantity: 'Chicken & Biscuits\n-2',
    amount: '-50.00',
    subQuantity: '0',
    subAmount: '0.00',
    payment: 'Exchange',
    total: '-50.00',
  },
  {
    id: 2,
    quantity: 'Gift Certificates\n3',
    amount: '150.00',
    subQuantity: '0',
    subAmount: '0.00',
    payment: 'CC-Visa/MC/Discover',
    total: '150.00',
  },
  {
    id: 3,
    quantity: 'Season 15 Vouchers\n0',
    amount: '0.00',
    subQuantity: '-45',
    subAmount: '-1,895.25',
    payment: 'Exchange\nDonated Fulfillment Tickets',
    total: '-1,795.75\n-50.00',
  },
  {
    id: 4,
    quantity: 'Season 16 Vouchers\n0',
    amount: '0.00',
    subQuantity: '174.00',
    subAmount: '7,527.00',
    payment: 'Subscription',
    total: '7,527.00',
  },
  {
    id: 5,
    quantity:
      'The Sounds of \nAfrolitical Movement \n632',
    amount: '11,875.60',
    subQuantity: '41',
    subAmount: '1,696.25',
    payment:
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Cash\n' +
      'Exchange\n' +
      'Donated Fulfillment Tickets\n' +
      'Gift Certificate Credit',
    total:
      '570.20\n' +
      '10,820.90\n' +
      '195.00\n' +
      '1,848.75\n' +
      '-99.50\n' +
      '236.50\n',
  },
  {
    id: 6,
    quantity: 'Donated Fulfillment Tickets\n0',
    amount: '0.00',
    subQuantity: '4',
    subAmount: '199.00',
    payment: 'Donated Fulfillment Tickets',
    total: '199.00',
  },
  {
    id: 7,
    quantity: 'Season 16 Subscriptions\n58',
    amount: '7,527.00',
    subQuantity: '0',
    subAmount: '-7,527.00',
    payment:
      'CC- Amex\n' +
      'CC-Visa/MC/Discover\n' +
      'Subscription',
    total:
      '581.00\n' +
      '6,946.00\n' +
      '-7,527.00',
  },
];

const NetSalesSummaryTable: React.FC = (): React.ReactElement => {
  return (
    <div className='h-fit w-auto p-2 mt-4'>
      <h1 className='text-2xl font-bold p-2 my-2'>
        Net Sales & Payment Summary by Event
        <span className='text-xl font-medium'>
          {' (Reflects "On Hand" Totals)'}
        </span>
      </h1>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border'>Gross Sales Total:</h2>
        <DataGrid
          className='text-sm'
          hideFooter
          rowHeight={130}
          rows={paymentRows}
          columns={paymentColumns}
          disableSelectionOnClick
          style={{height: 968, borderRadius: 0, fontSize: '0.8rem'}}
        />
      </div>
    </div>
  );
};

export default NetSalesSummaryTable;
