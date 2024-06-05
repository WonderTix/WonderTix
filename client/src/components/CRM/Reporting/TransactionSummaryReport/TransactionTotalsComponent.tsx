import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseTooltip from '@mui/material/Tooltip';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

interface APIEventsComponentProps {
    begin_date: string,
    end_date: string,
}

const TransactionTotalsComponent: React.FC<APIEventsComponentProps> = ({begin_date, end_date}) => {
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

    const initialTotals = {
        total_price: 0.00,
        total_ticket: 0.00,
        price: 0.00,
        item_fees: 0.00,
        stf_fee: 0.00,
        order_fee: 0.00,
        delivery_fee: 0.00,
        exchange_fee: 0.00,
        total_fees: 0.00,
        dono_fulfil_ticket: 0.00,
        total_donations: 0.00,
        tech_fee: 0.00,
        net_total: 0.00,
    };

    // There is 100% a better way to do this
    const [totals, setTotals] = useState<{[key: string]: number }>(initialTotals);
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
                const aggregatedTotals = {...initialTotals};

                data.forEach((event) => {
                event.eventinstances.forEach((instance) => {
                    if (!isDateInRange(begin_date, end_date, instance.eventdate)) {
                        return;
                    }

                    const qty_sold = instance.totalseats - instance.availableseats;
                    // Sold Quantity and Amount
                    const buyer_price = parseFloat(instance.ticketrestrictions[0]?.price) || 0;
                    // fee_fee should be changed to the total of all fees in the future
                    const fee_fee = parseFloat(instance.ticketrestrictions?.[0]?.fee) || 0 * qty_sold;
                    const donations = parseFloat(instance.donations?.[0]?.amount) || 0;
                    // Statically Allocated Values, update when database is updated to support them
                    const item_fee = 0.00;
                    const stf_fee = 0.00;
                    const order_fee = 0.00;
                    const deliv_fee = 0.00;
                    const exch_fee = 0.00;
                    // Adenum: These ones should be negative, as they should subtract from profit
                    // If these are not negative in the database, negate the value of the fetched data
                    const dono_fulfil_ticket = 0.00;
                    const patron_tech = 0.00;
                    // Calculating some totals
                    const ticket_total = (buyer_price * qty_sold) + fee_fee + order_fee + deliv_fee + exch_fee;
                    const total_price = ticket_total + donations;
                    const net_total = total_price - dono_fulfil_ticket - patron_tech;

                    aggregatedTotals.total_price += total_price;
                    aggregatedTotals.total_ticket += ticket_total;
                    aggregatedTotals.price += buyer_price * qty_sold;
                    aggregatedTotals.item_fees += item_fee;
                    aggregatedTotals.total_fees += fee_fee;
                    aggregatedTotals.stf_fee += stf_fee;
                    aggregatedTotals.order_fee += order_fee;
                    aggregatedTotals.delivery_fee += deliv_fee;
                    aggregatedTotals.exchange_fee += exch_fee;
                    aggregatedTotals.dono_fulfil_ticket += dono_fulfil_ticket;
                    aggregatedTotals.total_donations += donations;
                    aggregatedTotals.tech_fee += patron_tech;
                    aggregatedTotals.net_total += net_total;
                    });
                });

                setTotals(aggregatedTotals);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [begin_date, end_date]);


    const columns: GridColDef[] = [
        {field: 'title', headerName: 'Type', flex: 1, renderCell: renderTooltipCell},
        {field: 'cost', headerName: 'Total $', flex: 1, renderCell: renderTooltipCell},
    ];

    // The names of these rows should never change, so they can be hard-coded in for now
    const rows = [
        {id: 1, title: 'Transaction Gross', cost: totals.total_price},
        {id: 2, title: 'Ticket Total', cost: totals.total_ticket},
        {id: 3, title: 'Buyer Price', cost: totals.price},
        {id: 4, title: 'Item Fees', cost: totals.item_fees},
        {id: 5, title: 'Single Ticket Fee', cost: totals.stf_fee},
        {id: 6, title: 'Order Fees', cost: totals.order_fee},
        {id: 7, title: 'Delivery Fees', cost: totals.delivery_fee},
        {id: 8, title: 'Exchange Fees', cost: totals.exchange_fee},
        {id: 9, title: 'Fees', cost: totals.total_fees},
        {id: 10, title: 'Donated Fulfillment Tickets', cost: totals.dono_fulfil_ticket},
        {id: 11, title: 'Donations', cost: totals.total_donations},
        {id: 12, title: 'Patron Tech Fee', cost: totals.tech_fee},
        {id: 13, title: 'Net Total', cost: totals.net_total},
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
                pageSize={13}
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

export default TransactionTotalsComponent;
