import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseTooltip from '@mui/material/Tooltip';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';


const APIEventsComponent = () => {
    const renderTooltipCell = (params) => (
        <BaseTooltip title={params.value}>
          <div>{params.value}</div>
        </BaseTooltip>
    );

    /** The purpose of this function is to display the event instance in a certain format
     * Result: {Weekday}, {Month} {Day} at {Time}
     */
    function display_event(dateString: number, time: string) {
        const dateStringStr = dateString.toString();
           // Parse the input string to extract year, month, and day components
        const year = parseInt(dateStringStr.substring(0, 4), 10);
        const month = parseInt(dateStringStr.substring(4, 6), 10) - 1; // Month is zero-based
        const day = parseInt(dateStringStr.substring(6, 8), 10);

        const date = new Date(year, month, day);

        // Get the weekday, month name, and day number with suffix
        const options: Intl.DateTimeFormatOptions = {weekday: 'long', month: 'long', day: 'numeric'};
        const formattedDate: string = date.toLocaleDateString('en-US', options);
        let day_suffix = '';

        // Getting the day suffix
        if (day >= 11 && day <= 13) {
            day_suffix = 'th';
        }
        switch (day % 10) {
            case 1: day_suffix ='st'; break;
            case 2: day_suffix = 'nd'; break;
            case 3: day_suffix = 'rd'; break;
            default: day_suffix = 'th'; break;
        }

        // Getting the time
        const time_date = new Date(time);
        const hours = time_date.getUTCHours();
        const display_hours = (hours % 12 || 12).toString();
        const minutes = time_date.getUTCMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        return `${formattedDate}${day_suffix} at ${display_hours}:${minutes} ${ampm}`;
    }

    const [rows, setRows] = useState<any[]>([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_2_URL + '/salesoverview/events')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const info = data.flatMap((event, index) => {
                    const eventInstances = event.eventinstances.map((instance) => ({
                        eventdate: instance.eventdate,
                        eventtime: instance.eventtime,
                        totalseats: instance.totalseats,
                        availableseats: instance.availableseats,
                        eventinstanceid: instance.eventinstanceid,
                        price: instance.ticketrestrictions[0].price, // Might need to modify if there's season tickets or discounts
                    }));
                    const updatedRows = eventInstances.map((instance) => {
                        const sold = instance.totalseats - instance.availableseats;
                        const display_eventinstance = display_event(instance.eventdate, instance.eventtime);

                        // Reservation (Future Implementation)
                        const reservation_quantity = 0;
                        const reservation_amount = 0.0;


                        // Sold Quantity and Amount
                        const price = +instance.price;
                        const total_price = price * sold;

                        // Subscription (Future Implementation)
                        const sub_quantity = 0;
                        const sub_amount = 0.0;

                        // Comp (Future Implementation)
                        const comp = 0;

                        // Summary
                        const summary_quantity = reservation_quantity + sub_quantity + comp + sold;
                        const summary_amount = reservation_amount + sub_amount + total_price;

                        return {
                            id: instance.eventinstanceid, // Assuming eventinstanceid is unique
                            ticketable_event: event.eventname,
                            event_instance: display_eventinstance,
                            quantity_reserve: reservation_quantity,
                            amount_reserve: reservation_amount,
                            quantity_sold: sold,
                            amount_sold: total_price,
                            quantity_sub: sub_quantity,
                            amount_sub: sub_amount,
                            quantity_comp: comp,
                            quantity_summ: summary_quantity,
                            amount_summ: summary_amount,
                            quantity_avail: instance.availableseats,
                        };
                    });
                    return updatedRows;
                });
                console.log('All: ', info);
                setRows(info);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const header_columns: GridColDef[] = [
        // Define your columns here
        {field: 'ticketable_event', headerName: 'Ticketable Event', flex: 3, sortable: true, renderCell: renderTooltipCell},
        {field: 'event_instance', headerName: 'Event Instance', flex: 3, sortable: true, renderCell: renderTooltipCell},
        {field: 'quantity_reserve', headerName: 'Reservation Qty', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'amount_reserve', headerName: 'Reservation Total', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'quantity_sold', headerName: 'Sold Qty', flex: 1, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'amount_sold', headerName: 'Sold Total', flex: 1, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'quantity_sub', headerName: 'Subs Qty', flex: 1, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'amount_sub', headerName: 'Subs Total', flex: 1, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'quantity_comp', headerName: 'Comp Qty', flex: 1, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'quantity_summ', headerName: 'Summary Qty', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'amount_summ', headerName: 'Summary Total', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'quantity_avail', headerName: 'Available', flex: 1, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
    ];

    return (
        <div className='bg-slate-50'>
            <DataGrid className='my-3 mx-2'
                rows={rows}
                columns={header_columns}
                headerHeight={80}
                rowHeight={50}
                disableSelectionOnClick={true}
                disableColumnFilter={true}
                hideFooter={true}
                autoHeight={true}
                pageSize={100}
                style={{borderRadius: 0}}
                sx={{
                    '& .MuiDataGrid-cell': {
                        fontSize: '12px',
                    },
                }}
            />
        </div>
    );
};

export default APIEventsComponent;
