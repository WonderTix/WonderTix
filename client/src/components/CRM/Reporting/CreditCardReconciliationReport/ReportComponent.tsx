import React from 'react';
import ReactDOM from 'react-dom';

import TableComponent from './TableComponent';

import {Divider, Button} from '@mui/material';

const ReportComponent = () => {
    const Org = 'This is sample text';
    const Range = 'This is sample text';
    const grouped = 'This is sample text';

    return (
        <div>
            <div className="flex justify-between px-4 font-bold text-2xl">
                <h1>Report</h1>
                <Button>Export to Excel</Button>
            </div>
            <Divider
                sx={{
                    'backgroundColor': 'darkgrey',
                    'height': '3px',
                }}
            />
            <div className="flex justify-between px-4">
                <h3>Organization: {Org}</h3>
                <h3>Batch Date Range: {Range}</h3>
                <h3>Grouped By: {grouped}</h3>
            </div>
            <Divider
                sx={{'backgroundColor': 'darkgrey'}}
            />
            <div className="px-4">
                <h1 className="font-bold text-2xl">Credit Card Transaction Totals</h1>
                <TableComponent/>
            </div>
            <Divider
                sx={{
                    'backgroundColor': 'darkgrey',
                    'width': '100%',
                }}
            />
            <div className="px-4">
                <h1 className="font-bold text-2xl">Event Totals</h1>
                <TableComponent/>
            </div>
            <Divider
                sx={{'backgroundColor': 'darkgrey'}}
            />
            <div className="px-4">
                <h1 className="font-bold text-2xl"> Event Totals by Credit Card Type</h1>
                <TableComponent/>
            </div>
            <Divider
                sx={{'backgroundColor': 'darkgrey'}}
            />
        </div>
    );
};

export default ReportComponent;
