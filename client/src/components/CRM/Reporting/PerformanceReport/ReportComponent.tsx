import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Divider, Button} from '@mui/material';

/*import TableData from './Table/TableData';*/
import TableHeader from './Table/TableHeader';

const ReportComponent = ({filterData}) => {
  const header = {
    org: 'Portland Playhouse',
    eevent: 'Temp',
    EventInstances: 'Temp',
    DateRanges: '',
    GroupedBy: 'None',
  };
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [eevent, setEvent] = useState('');
  const [EventInstances, setEventInstances] = useState('');
  const [groupedBy, setGroupedBy] = useState('');

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
    setEvent(filterData.eevent);
    setEventInstances(filterData.EventInstances);
    setGroupedBy(filterData.groupedBy);
  });

  return (
    <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
      <div className='flex justify-between px-4 font-bold text-2xl bg-slate-100 p-2'>
        <h1 className='text-3xl font-bold'>Performance Report</h1>
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
          {groupedBy}
        </h3>
      </div>
      <div className='px-4'>
        {/* <TableData
          eevent={eevent}
          EventInstances={EventInstances}
          groupedBy={groupedBy}
  /> */}
      </div>
      <Divider sx={{backgroundColor: 'darkgrey'}} />
    </div>
  );
};

ReportComponent.propTypes = {
  filterData: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    eevent: PropTypes.string.isRequired,
    EventInstances: PropTypes.string.isRequired,
    groupedBy: PropTypes.string.isRequired,
  }),
};

export default ReportComponent;
