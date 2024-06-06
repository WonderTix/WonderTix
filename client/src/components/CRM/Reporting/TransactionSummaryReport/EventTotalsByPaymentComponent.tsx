import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseTooltip from '@mui/material/Tooltip';
import {Divider} from '@mui/material';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

interface APIEventsComponentProps {
    begin_date: string,
    end_date: string,
}


const EventTotalsByPaymentComponent: React.FC<APIEventsComponentProps> = ({begin_date, end_date}) => {
    const renderTooltipCell = (params) => (
        <BaseTooltip title = {params.value}>
            <div>{params.value}</div>
        </BaseTooltip>
    );

    /** The purpose of this function is to check if the date is within the date range that the user inputs */
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

    // API fetch happens here
    const [ccRows, setCCRows] = useState<any[]>([]);
    const [giftRows, setGiftRows] = useState<any[]>([]);
    begin_date = begin_date.split('/').join('-');
    end_date = end_date.split('/').join('-');

    useEffect(() => {
        fetch(process.env.REACT_APP_API_2_URL + '/transactionSummary/events')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const aggregatedRows = {};

                data.forEach((event) => {
                    const eventID = event.eventname;
                    // Gets the event ID, checks if the event happened within our date range
                    event.eventinstances.forEach((instance) => {
                        if (!isDateInRange(begin_date, end_date, instance.eventdate)) {
                            return;
                        }

                        if (!aggregatedRows[eventID]) {
                            aggregatedRows[eventID] = {
                                id: eventID,
                                title: event.eventname,
                                qty: 0,
                                buyer_price: 0,
                                amount_sold: 0,
                                fee: 0,
                                // these currently aren't in the DB, make changes when they are
                                single_ticket_fee: 0,
                                pm_fee: 0,
                            };
                        }

                    const qty_sold = instance.totalseats - instance.availableseats;
                    // Sold Quantity and Amount
                    const buyer_price = parseFloat(instance.ticketrestrictions[0]?.price) || 0;
                    const total_price = buyer_price * qty_sold;
                    // Summary and/or generic values
                    const summary_fee = instance.ticketrestrictions[0]?.fee * qty_sold;
                    const proj_man_fee = 0.00;
                    const stf = 0.00;

                    // we need it to aggregate all the values for this specific report
                    aggregatedRows[eventID].qty += qty_sold;
                    aggregatedRows[eventID].amount_sold += total_price;
                    aggregatedRows[eventID].fee += summary_fee;
                    // the values here are hard coded in
                    aggregatedRows[eventID].single_ticket_fee += stf;
                    aggregatedRows[eventID].pm_fee += proj_man_fee;
                    });
                });
                const aggregatedRowsArray = Object.values(aggregatedRows);

                setCCRows(aggregatedRowsArray);

                  // Generate gift certificate rows with all values but title as 0.00
                  // This is because, until we can discern orders paid by gift_certificates
                  // In the DB, we'll have these set to 0
                  const giftCertRowsArray = aggregatedRowsArray.map((row: any) => ({
                    ...row,
                    qty: 0.00,
                    buyer_price: 0.00,
                    amount_sold: 0.00,
                    fee: 0.00,
                    single_ticket_fee: 0.00,
                    pm_fee: 0.00,
                }));

                setGiftRows(giftCertRowsArray);
            })

            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [begin_date, end_date]);

    const columns: GridColDef[] = [
        {field: 'title', headerName: 'Event Type', flex: 4, renderCell: renderTooltipCell},
        {field: 'qty', headerName: 'Qty', flex: 1, renderCell: renderTooltipCell},
        {field: 'amount_sold', headerName: 'Buyer Price', flex: 1, renderCell: renderTooltipCell},
        {field: 'fee', headerName: 'Fee', flex: 1, renderCell: renderTooltipCell},
        {field: 'single_ticket_fee', headerName: 'Single Ticket Fee', flex: 1, renderCell: renderTooltipCell},
        {field: 'pm_fee', headerName: 'PM Fee', flex: 1, renderCell: renderTooltipCell},
    ];

    return (
        <>
            <div className='bg-slate-50 mb-2 border'>
                <h2 className='p-2 font-bold'>Credit Card</h2>
                <Divider
                    sx={{
                        'backgroundColor': 'slate-100',
                        }}
                />
                <DataGrid className=''
                    rows={ccRows}
                    columns={columns}
                    disableSelectionOnClick={true}
                    disableColumnFilter={true}
                    hideFooter={true}
                    autoHeight={true}
                    pageSize={36}
                    sx={{
                        'border': 'none',
                        '& .MuiDataGrid-cell': {
                            fontSize: '14px',
                            margin: '0px',
                        },
                    }}
                />
            </div>
            <div className='bg-slate-50 mb-2 border'>
                <h2 className='p-2 font-bold'>Gift Certificate Credit</h2>
                <Divider
                    sx={{
                        'backgroundColor': 'slate-100',
                        }}
                />
                <DataGrid className='my-1'
                    rows={giftRows}
                    columns={columns}
                    disableSelectionOnClick={true}
                    disableColumnFilter={true}
                    hideFooter={true}
                    autoHeight={true}
                    pageSize={36}
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

export default EventTotalsByPaymentComponent;
