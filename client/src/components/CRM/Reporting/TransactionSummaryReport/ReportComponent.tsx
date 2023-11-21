import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import TransactionTotalsComponent from './TransactionTotalsComponent';
import EventTotalsComponent from './EventTotalsComponent';
import EventTotalsByPaymentComponent from './EventTotalsByPaymentComponent';
import OrderLevelFeesByPaymentComponent from './OrderLevelFeesByPaymentComponent';
import DonationsByPaymentComponent from './DonationsByPaymentComponent';
import DonationsByRecordAndPaymentComponent from './DonationsByRecordAndPaymentComponent';

import {Divider, Button} from '@mui/material';

const ReportComponent = ({filterData}) => {
  const header = {org: 'Portland Playhouse', range: 'Temp', grouped: 'Event'};
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [groupBy, setGroupBy] = useState('');

  const formatDateToMMDDYYYY = (date: Date) => {
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const year = date.getFullYear().toString();

    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    setStart(formatDateToMMDDYYYY(filterData.startDate));
    setEnd(formatDateToMMDDYYYY(filterData.endDate));
    setGroupBy(filterData.groupBy);
  });

  return (
    <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
      <div className='flex justify-between px-4 font-bold text-2xl bg-slate-100 p-2'>
        <h1 className='text-3xl font-bold'>
          Transaction Summary Report
        </h1>
        <Button>Export to Excel</Button>
      </div>
      <div className='flex justify-evenly border-b px-4 py-1 bg-slate-100'>
        <h3>
          <strong>Organization: </strong> {header.org}
        </h3>
        <h3>
          <strong>Batch Date Range: </strong>
          {start} - {end}
        </h3>
        <h3>
          <strong>Grouped By: </strong>
          {groupBy}
        </h3>
      </div>
      <div className='px-4'>
        <h1 className='font-bold text-2xl py-2'>
          Transaction Totals
        </h1>
        <TransactionTotalsComponent />
      </div>
      <div className='px-4'>
        <h1 className='font-bold text-2xl py-2'>Event Totals</h1>
        <EventTotalsComponent />
      </div>
      <div className='px-4'>
        <h1 className='font-bold text-2xl py-2'>
          {' '}
          Event Totals by Payment Method
        </h1>
        <EventTotalsByPaymentComponent />
      </div>
      <div className='px-4'>
        <h1 className='font-bold text-2xl py-2'>
          {' '}
          Order-Level Fees by Payment Method
        </h1>
        <OrderLevelFeesByPaymentComponent />
      </div>
      <div className='px-4'>
        <h1 className='font-bold text-2xl py-2'>
          {' '}
          Donations by Payment Type
        </h1>
        <DonationsByPaymentComponent />
      </div>
      <div className='px-4'>
        <h1 className='font-bold text-2xl py-2'>
          {' '}
          Donations by Record Type & Payment Type
        </h1>
        <DonationsByRecordAndPaymentComponent />
      </div>
      <Divider sx={{backgroundColor: 'darkgrey'}} />
    </div>
  );
};

ReportComponent.propTypes = {
  filterData: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    groupBy: PropTypes.string.isRequired,
  }),
};

export default ReportComponent;
