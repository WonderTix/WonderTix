import React from 'react';
import {DataGrid} from '@mui/x-data-grid';

const netSalesColumns = [
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

const netSalesRows = [
  {
    id: 0,
    event: 'Sold Items',
    quantity: '588',
    price: '19,502.00',
    Fee: '432.00',
    Ticket: '0.00',
    Patron: '-699.00',
    nto: '19,235.60',
  },
  {
    id: 1,
    event: 'Chicken & Biscuits',
    quantity: '-2',
    price: '-50.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '1.70',
    nto: '-48.30',
  },
  {
    id: 2,
    event: '',
    instance: 'Saturday, Oct 29 at 7:30pm',
    refund: 'Access Tickets',
    pricelevel: 'Access',
    quantity: '-2',
    price: '-50.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '1.70',
    nto: '-48.30',
  },
  {
    id: 3,
    event: 'Gift Certificates',
    quantity: '3',
    price: '150.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '3.00',
    nto: '147.00',
  },
  {
    id: 4,
    instance: 'Gift Certificates',
    quantity: '1',
    price: '100.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-1.00',
    nto: '99.00',
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
    event: 'Season 16 Subscriptions',
    quantity: '58',
    price: '7,727.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-174.00',
    nto: '7,353.00',
  },
  {
    id: 8,
    instance: 'Anytime Subscription',
    quantity: '45',
    price: '6,630.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-135.00',
    nto: '6,495.00',
  },
  {
    id: 9,
    refund: '3 Shows',
    quantity: '45',
    price: '6,630.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-135.00',
    nto: '6,495.00',
  },
  {
    id: 10,
    pricelevel: 'Early Bird Price',
    quantity: '5',
    price: '670.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-15.70',
    nto: '655.30',
  },
  {
    id: 11,
    pricelevel: 'General Admission',
    quantity: '40',
    price: '5,960.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-120.00',
    nto: '5,840.00',
  },
  {
    id: 12,
    instance: 'Preview Subscription',
    quantity: '13',
    price: '897.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-39.00',
    nto: '858.00',
  },
  {
    id: 13,
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
    id: 14,
    event: 'The Sounds of Afrolitical Movement',
    quantity: '542',
    price: '12,350.60',
    Fee: '462.00',
    Ticket: '0.00',
    Patron: '-536.40',
    nto: '12,276.20',
  },
  {
    id: 15,
    event: '',
    instance: 'Sunday, May 28 at 2:00pm - One Second Line at a Time',
    quantity: '-2',
    price: '-79.00',
    Fee: '-6.00',
    Ticket: '0.00',
    Patron: '2.00',
    nto: '-83.00',
  },
  {
    id: 16,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '-2',
    price: '-79.00',
    Fee: '-6.00',
    Ticket: '0.00',
    Patron: '2.00',
    nto: '-83.00',
  },
  {
    id: 17,
    event: '',
    instance: 'Thursday, June 1 at 7:30pm - Baptism & Rebirth',
    quantity: '-1',
    price: '-39.50',
    Fee: '-3.00',
    Ticket: '0.00',
    Patron: '1.00',
    nto: '-41.50',
  },
  {
    id: 18,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '-1',
    price: '-39.50',
    Fee: '3.00',
    Ticket: '0.00',
    Patron: '1.00',
    nto: '-41.50',
  },
  {
    id: 19,
    event: '',
    instance: 'Friday, June 2 at 7:30pm - A Meditation on Stillness',
    quantity: '2',
    price: '-52.50',
    Fee: '3.00',
    Ticket: '0.00',
    Patron: '-2.00',
    nto: '-53.50',
  },
  {
    id: 20,
    event: '',
    instance: '',
    refund: 'Arts for All',
    pricelevel: 'Arts for All',
    quantity: '1',
    price: '4.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '-1.00',
    nto: '5.00',
  },
  {
    id: 21,
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
    id: 22,
    event: '',
    instance: 'Sunday, June 3 at 7:30pm - Acceptance (21+ Suggested)',
    quantity: '20',
    price: '735.50',
    Fee: '33.00',
    Ticket: '0.00',
    Patron: '-20.00',
    nto: '748.50',
  },
  {
    id: 23,
    event: '',
    instance: '',
    refund: 'Access Tickets',
    pricelevel: 'Access Tickets',
    quantity: '8',
    price: '200.50',
    Fee: '3.00',
    Ticket: '0.00',
    Patron: '-8.00',
    nto: '192.50',
  },
  {
    id: 24,
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
    id: 25,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Under 25',
    quantity: '11',
    price: '530.50',
    Fee: '33.00',
    Ticket: '0.00',
    Patron: '-11.00',
    nto: '552.50',
  },
  {
    id: 26,
    event: 'Comps',
    instance: '',
    refund: '',
    pricelevel: '',
    quantity: '103',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 27,
    event: 'The Sounds of Afrolitical Movement',
    instance: '',
    refund: '',
    pricelevel: '',
    quantity: '103',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 28,
    event: '',
    instance: 'Thursday, May 25 at 7:30pm - Baptism & Rebirth',
    quantity: '1',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 29,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Preview',
    quantity: '1',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 30,
    event: '',
    instance: 'Saturday, May 27 at 7:30pm - Acceptance (21+ Suggested)',
    quantity: '-1',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 31,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '-1',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 32,
    event: '',
    instance: 'Friday, June 2 at 7:30pm - A Meditation on Stillness',
    quantity: '2',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 33,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '2',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 34,
    event: '',
    instance: 'Saturday, June 3 at 7:30pm - Acceptance (21+ Suggested)',
    quantity: '1',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 35,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '1',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 36,
    event: '',
    instance: 'Sunday, June 4 at 2:00pm - One Second Line at a Time',
    quantity: '7',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 37,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '7',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 38,
    event: '',
    instance: '',
    refund: '',
    pricelevel: '$5 Ticket',
    quantity: '7',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 39,
    event: '',
    instance: 'Wednesday, June 7 at 7:30pm - Chaos',
    quantity: '12',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 40,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '12',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 41,
    event: '',
    instance: 'Thursday, June 8 at 7:30pm - Baptism & Rebirth',
    quantity: '9',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 42,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '9',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 43,
    event: '',
    instance: 'Friday, June 9 at 2:00pm - A Meditation on Stillness',
    quantity: '7',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 44,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Pay What You Will',
    quantity: '7',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 45,
    event: '',
    instance: '',
    refund: '',
    pricelevel: '$5 Ticket',
    quantity: '7',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 46,
    event: '',
    instance: 'Saturday, June 10 at 7:30pm -  Acceptance (21+ Suggested)',
    quantity: '2',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 47,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '2',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },

  {
    id: 48,
    event: '',
    instance: 'Sunday, June 11 at 7:30pm -  One Second Line at a Time',
    quantity: '8',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
  {
    id: 49,
    event: '',
    instance: '',
    refund: 'General Admission',
    pricelevel: 'Adult',
    quantity: '8',
    price: '0.00',
    Fee: '0.00',
    Ticket: '0.00',
    Patron: '0.00',
    nto: '0.00',
  },
];

const NetSalesPriceLevelReport: React.FC = (): React.ReactElement => {
  const rowHeight = 36;
  const netSalesTableRows = netSalesRows.length;
  const tableHeight = ((netSalesTableRows * rowHeight) + rowHeight + 5);

  return (
    <div className='h-fit w-auto p-2 mt-4'>
      <h1 className='text-2xl font-bold p-2 my-2'>
        Net Sales Totals
        <span className='text-xl font-medium'>
          {' (Price Level Details)'}
        </span>
      </h1>

      <div className='bg-slate-50'>
        <h2 className='text-lg font-bold p-2 border'>Net Sales:</h2>
        <DataGrid
          hideFooter
          rows={netSalesRows}
          columns={netSalesColumns}
          disableSelectionOnClick
          density="compact"
          style={{height: `${tableHeight}px`, fontSize: '0.8rem', borderRadius: 0}}
        />
      </div>
    </div>
  );
};

export default NetSalesPriceLevelReport;