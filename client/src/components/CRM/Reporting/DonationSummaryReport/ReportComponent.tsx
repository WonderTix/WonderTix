import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Divider, Button} from '@mui/material';

import TableData from './Table/TableData';
import TableHeader from './Table/TableHeader';
import APIEventsComponent from './Events/APIEvents';

const ReportComponent = ({filterData}) => {
  const header = {
    org: 'Portland Playhouse',
    range: 'Temp',
    groupByRecordType: 'No',
    primGrouping: 'None',
    secGrouping: 'None',
    excDonationRecordTypes: 'None',
  };
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [groupByRecordType, setGroupByRecordType] = useState('');
  const [primGrouping, setPrimGrouping] = useState('');
  const [secGrouping, setSecGrouping] = useState('');
  const [excDonationRecordTypes, setExcDRT] = useState('');

  // dates are still not populating the report correctly
  const formatDateToMMDDYYYY = (date: Date) => {
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const year = date.getFullYear().toString();

    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    setStart(formatDateToMMDDYYYY(filterData.startDate));
    setEnd(formatDateToMMDDYYYY(filterData.endDate));
    setGroupByRecordType(filterData.groupByRecordType);
    setPrimGrouping(filterData.primGrouping);
    setSecGrouping(filterData.secGrouping);
    setExcDRT(filterData.excDonationRecordTypes);
  });

  return (
    <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
      <div className='flex justify-between px-4 font-bold text-2xl bg-slate-100 p-2'>
        <h1 className='text-3xl font-bold'>Donation Summary Report</h1>
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
        {/* <h3>
         <strong>Grouped By Record Type: </strong>
          {groupByRecordType}
        </h3>
        <h3>
          <strong>Grouped By: </strong>
          {primGrouping}, {secGrouping}
        </h3>*/}
      </div>
      <div className='px-4'>
        <APIEventsComponent begin_date={filterData.startDate.toDateString()} end_date={filterData.endDate.toDateString()}/>
      </div>
      <Divider sx={{backgroundColor: 'darkgrey'}} />
    </div>
  );
};

ReportComponent.propTypes = {
  filterData: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    primGrouping: PropTypes.string.isRequired,
    secGrouping: PropTypes.string.isRequired,
    groupByRecordType: PropTypes.string.isRequired,
    excDonationRecordTypes: PropTypes.string.isRequired,
  }),
};

export default ReportComponent;
