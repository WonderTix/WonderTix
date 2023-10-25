import React from 'react';
import ReactDOM from 'react-dom';

import CCTTotalsComponent from './CCTTotalsComponent';
import EventTotalsComponent from './EventTotalsComponent';
import EventTotalsByCCComponent from './EventTotalsByCCComponent';

import {Divider, Button} from '@mui/material';

const ReportComponent = () => {
    const header = {'org': 'Portland Playhouse', 'range': 'Temp', 'grouped': 'Event'};

    const sample_transaction_cols = ['titles', 'cost'];
    const sample_transactions_totals = [7002.50, 4715.50, 18.00, 18.00, 0.00, 0.00, 0.00, 0.00, 2269.00, -104.00];

    const sample_event_cols = ['title', 'Qty', 'Buyer Price', 'Fee', 'Single Ticket Fee', 'PTech Fee'];
    const sample_event_totals = [];
    const sample_event_totals_by_cc = [];

    return (
        <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
            <div className="flex justify-between px-4 font-bold text-2xl bg-slate-100 p-2">
                <h1 className='text-3xl font-bold'>Credit Card Reconciliation Report</h1>
                <Button>Export to Excel</Button>
            </div>
            <div className="flex justify-evenly border-b px-4 py-1 bg-slate-100">
                <h3><strong>Organization: </strong> {header.org}</h3>
                <h3><strong>Batch Date Range: </strong>{header.range}</h3>
                <h3><strong>Grouped By: </strong>{header.grouped}</h3>
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

export default ReportComponent;
