import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import CCTTotalsComponent from './CCTTotalsComponent';
import EventTotalsComponent from './EventTotalsComponent';
import EventTotalsByCCComponent from './EventTotalsByCCComponent';

import {Divider, Button} from '@mui/material';

const ReportComponent = ({filterData}) => {
<<<<<<< HEAD
  const header = {org: 'Portland Playhouse', range: 'Temp', grouped: 'Event'};
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [groupBy, setGroupBy] = useState('');
=======
    const header = {'org': 'Portland Playhouse', 'range': 'Temp'};
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
>>>>>>> a595ae04ffb93b2f02182fd6881c9e4be6024298

  // dates are still not populating the report correctly
  const formatDateToMMDDYYYY = (date: Date) => {
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const year = date.getFullYear().toString();

    return `${month}/${day}/${year}`;
  };

<<<<<<< HEAD
  useEffect(() => {
    setStart(formatDateToMMDDYYYY(filterData.startDate));
    setEnd(formatDateToMMDDYYYY(filterData.endDate));
    setGroupBy(filterData.groupBy);
    console.log(filterData.groupBy);
  });

  return (
    <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
      <div className='flex justify-between px-4 font-bold text-2xl bg-slate-100 p-2'>
        <h1 className='text-3xl font-bold'>
          Credit Card Reconciliation Report
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
          Credit Card Transaction Totals
        </h1>
        <CCTTotalsComponent />
      </div>
      <div className='px-4'>
        <h1 className='font-bold text-2xl py-2'>Event Totals</h1>
        <EventTotalsComponent />
      </div>
      <div className='px-4'>
        <h1 className='font-bold text-2xl py-2'>
          {' '}
          Event Totals by Credit Card Type
        </h1>
        <EventTotalsByCCComponent />
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
=======
    useEffect(() => {
        setStart(formatDateToMMDDYYYY(filterData.startDate));
        setEnd(formatDateToMMDDYYYY(filterData.endDate));
    });

    return (
        <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
            <div className="flex justify-between px-4 font-bold text-2xl bg-slate-100 p-2">
                <h1 className='text-3xl font-bold'>Credit Card Reconciliation Report</h1>
                <Button>Export to Excel</Button>
            </div>
            <div className="flex justify-evenly border-b px-4 py-1 bg-slate-100">
                <h3><strong>Organization: </strong> {header.org}</h3>
                <h3><strong>Batch Date Range: </strong>{start} - {end}</h3>
            </div>
            <div className="px-4">
                <h1 className="font-bold text-2xl py-2">Credit Card Transaction Totals</h1>
                <CCTTotalsComponent/>
            </div>
            <div className="px-4">
                <h1 className="font-bold text-2xl py-2">Event Totals</h1>
                <EventTotalsComponent/>
            </div>
            <div className="px-4">
                <h1 className="font-bold text-2xl py-2"> Event Totals by Credit Card Type</h1>
                <EventTotalsByCCComponent/>
            </div>
            <Divider
                sx={{'backgroundColor': 'darkgrey'}}
            />
        </div>
    );
};

ReportComponent.propTypes = {
    filterData: PropTypes.shape({
        startDate: PropTypes.instanceOf(Date).isRequired,
        endDate: PropTypes.instanceOf(Date).isRequired,
    }),
>>>>>>> a595ae04ffb93b2f02182fd6881c9e4be6024298
};

export default ReportComponent;
