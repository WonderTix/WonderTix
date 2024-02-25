import React from 'react';
import {DataGrid} from '@mui/x-data-grid';

const grossSalesColumns = [
  {field: 'event', headerName: 'Event', flex: 2.5},
  {field: 'instance', headerName: 'Instance', flex: 4},
  {field: 'refund', headerName: 'Allocation', flex: 1.5},
  {field: 'pricelevel', headerName: 'Price Level', flex: 1.5},
  {field: 'quantity', headerName: 'Quantity', flex: 1},
  {field: 'price', headerName: 'Price', flex: 1},
  {field: 'Fee', headerName: 'Fee', flex: 1},
  {field: 'Ticket', headerName: 'Ticket Fee', flex: 1},
  {field: 'Patron', headerName: 'Patron Fee', flex: 1},
  {field: 'nto', headerName: 'Net to Org', flex: 1},
];

const grossSalesRows = [
  {
    id: 0,
    event: 'Sold Items',
    quantity: '603',
    price: '20,027.60',
    Fee: '462.00',
    Ticket: '0.00',
    Patron: '713.40',
    nto: '19,776.20',
  },
  {
    id: 1,
    event: 'Gift Certificates',
    quantity: '3',
    price: '150.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '3.00',
    nto: '147.00',
  },
  {
    id: 2,
    instance: 'Gift Certificates',
    quantity: '1',
    price: '100.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-1.00',
    nto: '99.00',
  },
  {
    id: 3,
    refund: 'Gift Certificates',
    pricelevel: '$100',
    quantity: '2',
    price: '-50.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '1.70',
    nto: '-48.30',
  },
  {
    id: 4,
    refund: 'Gift Certificates',
    pricelevel: '$25',
    quantity: '-2',
    price: '-50.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '1.70',
    nto: '-48.30',
  },
  {
    id: 5,
    event: 'Season 16 Subscriptions',
    quantity: '58',
    price: '7,727.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-174.00',
    nto: '7,353.00',
  },
  {
    id: 6,
    instance: 'Anytime Subscription',
    quantity: '45',
    price: '6,630.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-135.00',
    nto: '6,495.00',
  },
  {
    id: 7,
    refund: '3 Shows',
    quantity: '45',
    price: '6,630.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-135.00',
    nto: '6,495.00',
  },
  {
    id: 8,
    pricelevel: 'Early Bird Price',
    quantity: '5',
    price: '670.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-15.70',
    nto: '655.30',
  },
  {
    id: 8,
    pricelevel: 'General Admission',
    quantity: '40',
    price: '5,960.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-120.00',
    nto: '5,840.00',
  },
  {
    id: 9,
    instance: 'Preview Subscription',
    quantity: '13',
    price: '897.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-39.00',
    nto: '858.00',
  },
  {
    id: 10,
    refund: 'Preview',
    pricelevel: 'Preview',
    quantity: '13',
    price: '897.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-39.00',
    nto: '858.00',
  },
  {
    id: 11,
    event: 'The Sounds of Afrolitical Movement',
    quantity: '542',
    price: '12,350.60',
    Fee: '462.00',
    Ticket: '0.00',
    Patron: '-536.40',
    nto: '12,276.20',
  },
  {
    id: 12,
    event: '',
    instance: 'Friday, June 2 at 7:30pm - A Meditation on Stillness',
    quantity: '2',
    price: '52.50',
    Fee: '3.00',
    Ticket: '0.00',
    Patron: '-2.00',
    nto: '53.50',
  },
  {
    id: 13,
    event: '',
    instance: '',
    refund: 'Arts for All',
    pricelevel: 'Arts for All',
    quantity: '1',
    price: '5.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-1.00',
    nto: '4.00',
  },
  {
    id: 14,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Under 25',
    quantity: '1',
    price: '-47.50',
    Fee: '3.00',
    Ticket: '0.00',
    Patron: '-1.00',
    nto: '49.50',
  },
  {
    id: 15,
    event: '',
    instance: 'Friday, June 3 at 7:30pm - Acceptance (21+ Suggested)',
    quantity: '20',
    price: '735.50',
    Fee: '33.00',
    Ticket: '0.00',
    Patron: '-20.00',
    nto: '748.50',
  },
  {
    id: 16,
    event: '',
    instance: '',
    refund: 'Access Tickets',
    pricelevel: 'Access Tickets',
    quantity: '8',
    price: '200.00',
    Fee: '-6.00',
    Ticket: '0.00',
    Patron: '-8.00',
    nto: '-192.00',
  },
  {
    id: 17,
    event: '',
    instance: '',
    refund: 'Arts for All',
    pricelevel: 'Arts for All',
    quantity: '1',
    price: '5.00',
    Fee: '33.00',
    Ticket: '0.00',
    Patron: '-1.00',
    nto: '4.00',
  },
  {
    id: 18,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adults Under 25',
    quantity: '11',
    price: '530.50',
    Fee: '33.00',
    Ticket: '0.00',
    Patron: '-11.00',
    nto: '552.00',
  },
];

const GrossSalesPriceLevelReport = (): React.ReactElement => {
  const rowHeight = 36;
  const compTableRows = grossSalesRows.length;
  const tableHeight = ((compTableRows * rowHeight) + rowHeight + 5);

  return (
    <div className='h-fit w-auto p-2 mt-4'>
      <h1 className='text-2xl font-bold p-2 my-2'>
        Gross Sales Totals
        <span className='text-xl font-medium'>
          {' (Price Level Details)'}
        </span>
      </h1>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border'>Gross Sales:</h2>
        <DataGrid
          hideFooter
          rows={grossSalesRows}
          columns={grossSalesColumns}
          disableSelectionOnClick
          density="compact"
          style={{height: `${tableHeight}px`, fontSize: '0.8rem', borderRadius: 0}}
        />
      </div>
    </div>
  );
};

export default GrossSalesPriceLevelReport;
