import React from 'react';
import ReactDOM from 'react-dom';
import BaseTooltip from '@mui/material/Tooltip';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';


const FakeEventsComponent = () => {
    const renderTooltipCell = (params) => (
        <BaseTooltip title={params.value}>
          <div>{params.value}</div>
        </BaseTooltip>
    );

    const header_columns: GridColDef[] = [
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
    // Will need to rework the rows where we would dynamically retrieve the data and put it into rows
    const rows = [
        {
            id: 0,
            ticketable_event: 'A Christmas Carol (Season 16)',
            event_instance: 'Friday, December 1st at 7:00 PM',
            quantity_reserve: '0',
            amount_reserve: '0.00',
            quantity_sold: '52',
            amount_sold: '2,106.41',
            quantity_sub: '0',
            amount_sub: '0.00',
            quantity_comp: '59',
            quantity_summ: '111',
            amount_summ: '2,106.41',
            quantity_avail: '2',
        },
        {
            id: 1,
            ticketable_event: 'A Christmas Carol (Season 16)',
            event_instance: 'Saturday, December 2nd at 2:00 PM (BIPOC Night)',
            quantity_reserve: '12',
            amount_reserve: '60.00',
            quantity_sold: '93',
            amount_sold: '1,163.90',
            quantity_sub: '0',
            amount_sub: '0.00',
            quantity_comp: '3',
            quantity_summ: '108',
            amount_summ: '1,223.90',
            quantity_avail: '2',
        },
        {
            id: 2,
            ticketable_event: `A Midsummer Night's Dream - Full Festival of Shakespeare`,
            event_instance: 'Saturday, January 6th at 4:00 PM',
            quantity_reserve: '0',
            amount_reserve: '0.00',
            quantity_sold: '108',
            amount_sold: '1,015,00',
            quantity_sub: '0',
            amount_sub: '0.00',
            quantity_comp: '0',
            quantity_summ: '108',
            amount_summ: '1,015.00',
            quantity_avail: '2',
        },
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
                pageSize={11}
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

export default FakeEventsComponent;
