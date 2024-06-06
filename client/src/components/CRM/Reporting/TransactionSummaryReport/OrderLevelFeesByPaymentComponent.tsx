import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseTooltip from '@mui/material/Tooltip';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

interface APIEventsComponentProps {
    begin_date: string,
    end_date: string,
}

const OrderLevelFeesByPaymentComponent: React.FC<APIEventsComponentProps> = ({begin_date, end_date}) => {
    const renderTooltipCell = (params) => (
        <BaseTooltip title = {params.value}>
            <div>{params.value}</div>
        </BaseTooltip>
    );

    const isDateInRange = (begin_date: string, end_date:string, event_date: number) => {
        const beginDateObj = new Date(begin_date);
        const endDateObj = new Date(end_date);

        const eventDateObj = new Date(
            parseInt(event_date.toString().substring(0, 4)), // Year
            parseInt(event_date.toString().substring(4, 6)) - 1, // Month (0-indexed)
            parseInt(event_date.toString().substring(6, 8)), // Day
        );

        // Check if event_date falls within the range
        return eventDateObj >= beginDateObj && eventDateObj <= endDateObj;
    };

    const initialTotals = {
        comp: 0.00,
        credit: 0.00,
        donation: 0.00,
        exchange: 0.00,
        gift_cert: 0.00,
        total: 0.00,
    };

    const [totals, setTotals] = useState<{[key: string]: number }>(initialTotals);
    begin_date = begin_date.split('/').join('-');
    end_date = end_date.split('/').join('-');

    useEffect(() => {
        // Fetch donations data
        fetch(process.env.REACT_APP_API_2_URL + '/transactionSummary/events')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const aggregatedRows = {...initialTotals};

                data.forEach((event) => {
                    event.eventinstances.forEach((instance) => {
                        if (!isDateInRange(begin_date, end_date, instance.eventdate)) {
                            return;
                        }

                        // Delivery and Exchange Fees are not currently in the database
                        // For now these will be statically allocated but update once database is updated

                        // Things to do for the future:
                        //      1) Set up multiple variables for both delivery and exchange fees (ex. d_comp, e_comp)
                        //      2) Connect them to the database

                        const comp = 0.00;
                        const credit = 0.00;
                        const dono = 0.00;
                        const exch = 0.00;
                        const gift = 0.00;
                        const total = comp + credit + dono + exch + gift;

                        aggregatedRows.comp = comp;
                        aggregatedRows.credit = credit;
                        aggregatedRows.donation = dono;
                        aggregatedRows.exchange = exch;
                        aggregatedRows.gift_cert = gift;
                        aggregatedRows.total = total;
                    });
                });
                setTotals(aggregatedRows);
            })
        .catch((error) => {
            console.error('There was a problem with the donations fetch operation:', error);
        });
    }, [begin_date, end_date]);

    const columns: GridColDef[] = [
        {field: 'title', headerName: '', flex: 4},
        {field: 'd_fee', headerName: 'Delivery Fees', flex: 1},
        {field: 'e_fee', headerName: 'Exchange Fees', flex: 1},
    ];

    // Currently the database doesn't support these specific types, so they're currently set to 0
    // When the database gets updated, change these to the appropriate values
    const rows = [
        {id: 1, title: 'Comp', d_fee: totals.comp.toFixed(2), e_fee: totals.comp.toFixed(2)},
        {id: 2, title: 'Credit Card', d_fee: totals.credit.toFixed(2), e_fee: totals.credit.toFixed(2)},
        {id: 3, title: 'Donation', d_fee: totals.donation.toFixed(2), e_fee: totals.donation.toFixed(2)},
        {id: 4, title: 'Exchange', d_fee: totals.exchange.toFixed(2), e_fee: totals.exchange.toFixed(2)},
        {id: 5, title: 'Gift Certificate Credit', d_fee: totals.gift_cert.toFixed(2), e_fee: totals.gift_cert.toFixed(2)},
        {id: 6, title: 'TOTAL', d_fee: totals.total.toFixed(2), e_fee: totals.total.toFixed(2)},
    ];

    return (
        <div className='bg-slate-50 border'>
            <DataGrid className='my-1'
                rows={rows}
                columns={columns}
                disableSelectionOnClick={true}
                disableColumnFilter={true}
                hideFooter={true}
                autoHeight={true}
                pageSize={6}
                sx={{
                    'border': 'none',
                    '& .MuiDataGrid-cell': {
                        fontSize: '14px',
                        margin: '0px',
                    },
                }}
            />
        </div>
    );
};

export default OrderLevelFeesByPaymentComponent;
