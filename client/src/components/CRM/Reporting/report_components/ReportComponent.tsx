import React from 'react';
import ReactDOM from 'react-dom';

import TableComponent from './TableComponent';

import {Divider} from '@mui/material';

const ReportComponent = () => {
    return (
        <div>
            <div className="flex px-4 font-bold text-2xl">
                <h1>Report</h1>
            </div>
            <Divider
                sx={{'background-color': 'darkgrey'}}
            />
            <div className="px-4">
                <h3>Organization:</h3>
                <h3>Batch Date Range:</h3>
                <h3>Grouped By:</h3>
            </div>
            <Divider
                sx={{'background-color': 'darkgrey'}}
            />
            <div className="px-4">
                <h1 className="font-bold text-2xl">Credit Card Transaction Totals</h1>
                <TableComponent/>
            </div>
            <Divider
                sx={{
                    'background-color': 'darkgrey',
                    'width': '100%',
                }}
            />
            <div className="px-4">
                <h1 className="font-bold text-2xl">Event Totals</h1>
                <TableComponent/>
            </div>
            <Divider
                sx={{'background-color': 'darkgrey'}}
            />
            <div className="px-4">
                <h1 className="font-bold text-2xl"> Event Totals by Credit Card Type</h1>
                <TableComponent/>
            </div>
            <Divider
                sx={{'background-color': 'darkgrey'}}
            />
        </div>
    );
};

export default ReportComponent;
