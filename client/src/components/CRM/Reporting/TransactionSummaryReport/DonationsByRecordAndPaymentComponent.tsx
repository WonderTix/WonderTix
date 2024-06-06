import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseTooltip from '@mui/material/Tooltip';
import {Divider} from '@mui/material';
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
    // These were derived from the demo page that was originally here, ask for clarification
    const initialTotals = {
        check: 0.00,
        credit: 0.00,
        direct_deposit: 0.00,
        donation: 0.00,
        other: 0.00,
        grant: 0.00,
        cc_patron_ticket: 0.00,
        dono_patron_ticket: 0.00,
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
                    // IE Any Values that are not in the database are set to 0.00 by default here
                    const check_val = 0.00;
                    const credit_val = parseFloat(donation?.amount);
                    const direct_val = 0.00;
                    const dono_val = 0.00;
                    const other_val = 0.00;
                    const grant = 0.00;
                    const cc_patron_ticket = 0.00;
                    const dono_patron_ticket = 0.00;

                    aggregatedRows.check += check_val;
                    aggregatedRows.credit += credit_val;
                    aggregatedRows.direct_deposit += direct_val;
                    aggregatedRows.donation += dono_val;
                    aggregatedRows.other += other_val;
                    aggregatedRows.grant += grant;
                    aggregatedRows.cc_patron_ticket += cc_patron_ticket;
                    aggregatedRows.dono_patron_ticket += dono_patron_ticket;
                });
                setTotals(aggregatedRows);
            })
        .catch((error) => {
            console.error('There was a problem with the donations fetch operation:', error);
        });
    }, [begin_date, end_date]);

    const columns: GridColDef[] = [
        {field: 'r_type', headerName: 'Record Type:', flex: 3},
        {field: 'amount', headerName: 'Amount:', flex: 1},
    ];

    const check_rows = [
        {id: 2, r_type: 'Donation', amount: totals.check.toFixed(2)},
        {id: 3, r_type: 'Grant Payment', amount: totals.grant.toFixed(2)},
    ];

    const cc_rows = [
        {id: 2, r_type: 'Donation', amount: totals.credit.toFixed(2)},
        {id: 3, r_type: 'PatronTicket Donation', amount: totals.cc_patron_ticket.toFixed(2)},
    ];

    const dd_rows = [
        {id: 2, r_type: 'Donation', amount: totals.direct_deposit.toFixed(2)},
    ];

    const don_rows = [
        {id: 2, r_type: 'PatronTicket Donation', amount: totals.dono_patron_ticket.toFixed(2)},
    ];

    const other_rows = [
        {id: 1, r_type: 'Donation', amount: totals.other.toFixed(2)},
    ];

    return (
        <>
            <div className='bg-slate-50 my-2 border'>
                <h2 className='p-2 font-bold'>Check</h2>
                <Divider
                    sx={{
                        'backgroundColor': 'slate-100',
                        }}
                />
                <DataGrid className='my-1'
                    rows={check_rows}
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
            <div className='bg-slate-50 my-2 border'>
                <h2 className='p-2 font-bold'>Credit Card</h2>
                <Divider
                    sx={{
                        'backgroundColor': 'slate-100',
                        }}
                />
                <DataGrid className='my-1'
                    rows={cc_rows}
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
            <div className='bg-slate-50 my-2 border'>
                <h2 className='p-2 font-bold'>Direct Deposit</h2>
                <Divider
                    sx={{
                        'backgroundColor': 'slate-100',
                        }}
                />
                <DataGrid className='text-lg my-1'
                    rows={dd_rows}
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
            <div className='bg-slate-50 my-2 border'>
                <h2 className='p-2 font-bold'>Donation</h2>
                <Divider
                    sx={{
                        'backgroundColor': 'slate-100',
                        }}
                />
                <DataGrid className='text-lg my-1'
                    rows={don_rows}
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
            <div className='bg-slate-50 my-2 border'>
                <h2 className='p-2 font-bold'>Other</h2>
                <Divider
                    sx={{
                        'backgroundColor': 'slate-100',
                        }}
                />
                <DataGrid className='text-lg my-1'
                    rows={other_rows}
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
        </>
    );
};

export default DonationsByPaymentComponent;
