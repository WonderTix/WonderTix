import React from 'react';
import ReactDOM from 'react-dom';

import DataGridComponent from './DataGridComponent';

import {Divider, Button} from '@mui/material';

const ReportComponent = () => {
    const header = {'org': 'Portland Playhouse', 'range': 'Temp', 'grouped': 'QL Code'};

    const sample_transaction_cols = ['titles', 'cost'];
    const sample_transactions_totals = [7002.50, 4715.50, 18.00, 18.00, 0.00, 0.00, 0.00, 0.00, 2269.00, -104.00];

    const sample_event_cols = ['title', 'Qty', 'Buyer Price', 'Fee', 'Single Ticket Fee', 'PTech Fee'];
    const sample_event_totals = [];
    const sample_event_totals_by_cc = [];

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
                <h3>Organization: {header.org}</h3>
                <h3>Batch Date Range: {header.range}</h3>
                <h3>Grouped By: {header.grouped}</h3>
            </div>
            <Divider
                sx={{'backgroundColor': 'darkgrey'}}
            />
            <div className="px-4">
                <h1 className="font-bold text-2xl">Credit Card Transaction Totals</h1>
                <DataGridComponent/>
            </div>
            <Divider
                sx={{
                    'backgroundColor': 'darkgrey',
                    'width': '100%',
                }}
            />
            <div className="px-4">
                <h1 className="font-bold text-2xl">Event Totals</h1>
            </div>
            <Divider
                sx={{'backgroundColor': 'darkgrey'}}
            />
            <div className="px-4">
                <h1 className="font-bold text-2xl"> Event Totals by Credit Card Type</h1>
            </div>
            <Divider
                sx={{'backgroundColor': 'darkgrey'}}
            />
        </div>
    );
};

export default ReportComponent;
