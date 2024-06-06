import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseTooltip from '@mui/material/Tooltip';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
interface APIEventsComponentProps {
    begin_date: string,
    end_date: string,
}

const DonationsByPaymentComponent: React.FC<APIEventsComponentProps> = ({begin_date, end_date}) => {
    const renderTooltipCell = (params) => (
        <BaseTooltip title = {params.value}>
            <div>{params.value}</div>
        </BaseTooltip>
    );

    /** The purpose of this function is to check if the date is within the date range that the user inputs */
    const isDateInRange = (begin_date: string, end_date:string, date: number) => {
        const beginDateObj = new Date(begin_date);
        const endDateObj = new Date(end_date);

        const eventDateObj = new Date(
            parseInt(date.toString().substring(0, 4)), // Year
            parseInt(date.toString().substring(4, 6)) - 1, // Month (0-indexed)
            parseInt(date.toString().substring(6, 8)), // Day
        );

        // Check if event_date falls within the range
        return eventDateObj >= beginDateObj && eventDateObj <= endDateObj;
    };

    // The rows should theoretically be constant so I'll have this here for convenience
    const initialTotals = {
        check: 0.00,
        credit: 0.00,
        direct_deposit: 0.00,
        donation: 0.00,
        other: 0.00,
        total: 0.00,
    };

     // API fetch happens here
     const [totals, setTotals] = useState<{[key: string]: number}>(initialTotals);
     begin_date = begin_date.split('/').join('-');
     end_date = end_date.split('/').join('-');

     useEffect(() => {
        // Fetch donations data
        fetch(process.env.REACT_APP_API_2_URL + '/transactionSummary/donations')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const aggregatedRows = {...initialTotals};

                data.forEach((donation) => {
                    // The database currently doesn't differentiate between different payment methods, assumption is being made
                    // that CURRENTLY the payments are being made via card and not something such as Check

                    // Once these have been added into the database, update these
                    const check_val = 0.00;
                    const credit_val = parseFloat(donation?.amount);
                    const direct_val = 0.00;
                    const dono_val = 0.00;
                    const other_val = 0.00;
                    const total_val = check_val + credit_val + direct_val + dono_val;

                    aggregatedRows.check += check_val;
                    aggregatedRows.credit += credit_val;
                    aggregatedRows.direct_deposit += direct_val;
                    aggregatedRows.donation += dono_val;
                    aggregatedRows.other += other_val;
                    aggregatedRows.total += total_val;
                });
                setTotals(aggregatedRows);
            })
        .catch((error) => {
            console.error('There was a problem with the donations fetch operation:', error);
        });
    }, [begin_date, end_date]);

    const columns: GridColDef[] = [
        {field: 'title', headerName: '', flex: 3, headerClassName: 'bold-header'},
        {field: 'cost', headerName: 'Amount', flex: 1, headerClassName: 'bold-header'},
    ];

    // These should be the only things that are displayed so they'll be left here for now
    const rows = [
        {id: 1, title: 'Check', cost: totals.check.toFixed(2)},
        {id: 2, title: 'Credit Card', cost: totals.credit.toFixed(2)},
        {id: 3, title: 'Direct Deposit', cost: totals.direct_deposit.toFixed(2)},
        {id: 4, title: 'Donation', cost: totals.donation.toFixed(2)},
        {id: 5, title: 'Other', cost: totals.other.toFixed(2)},
        {id: 6, title: 'TOTAL', cost: totals.total.toFixed(2)},
    ];

    return (
        <div className='bg-slate-50 border'>
            <DataGrid className='text-lg my-1'
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
                    '& .bold-header': {
                        fontWeight: 'bold',
                    },
                }}
            />
        </div>
    );
};

export default DonationsByPaymentComponent;
