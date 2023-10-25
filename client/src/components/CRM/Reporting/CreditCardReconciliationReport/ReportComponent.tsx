import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import CCTTotalsComponent from './CCTTotalsComponent';
import EventTotalsComponent from './EventTotalsComponent';
import EventTotalsByCCComponent from './EventTotalsByCCComponent';

import {Divider, Button} from '@mui/material';

const ReportComponent = ({filterData}) => {
    const header = {'org': 'Portland Playhouse', 'range': 'Temp', 'grouped': 'Event'};
    let start = '';
    let end = '';

    // dates are still not populating the report correctly
    const formatDateToMMDDYYYY = (date: Date) => {
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        const year = date.getFullYear().toString();

        return `${month}/${day}/${year}`;
    };

    useEffect(() => {
        start = formatDateToMMDDYYYY(filterData.startDate);
        end = formatDateToMMDDYYYY(filterData.endDate);
    });

    return (
        <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
            <div className="flex justify-between px-4 font-bold text-2xl bg-slate-100 p-2">
                <h1 className='text-3xl font-bold'>Credit Card Reconciliation Report</h1>
                <Button>Export to Excel</Button>
            </div>
            <div className="flex justify-evenly border-b px-4 py-1 bg-slate-100">
                <h3><strong>Organization: </strong> {header.org}</h3>
                <h3><strong>Batch Date Range: </strong>{start}</h3>
                <h3><strong>Grouped By: </strong>{filterData.groupBy}</h3>
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
        groupBy: PropTypes.string.isRequired,
    }),
};

export default ReportComponent;
