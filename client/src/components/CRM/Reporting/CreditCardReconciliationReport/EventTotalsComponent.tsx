import React from 'react';
import ReactDOM from 'react-dom';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

const EventTotalsComponent = () => {
    const columns: GridColDef[] = [
        {field: 'title', headerName: 'Event Type', flex: 4},
        {field: 'qty', headerName: 'Qty', flex: 1},
        {field: 'buyer_price', headerName: 'Buyer Price', flex: 1},
        {field: 'fee', headerName: 'Fee', flex: 1},
        {field: 'single_ticket_fee', headerName: 'Single Ticket Fee', flex: 1},
        {field: 'ptech_fee', headerName: 'PTech Fee', flex: 1},
    ];

    const rows = [
        {id: 1, title: 'A Christmas Carol (Season 16)', qty: 6, buyer_price: 307.50, fee: 18.00, single_ticket_fee: 0.00, ptech_fee: -6.00},
        {id: 2, title: 'Gift Certificates', qty: 2, buyer_price: 200.00, fee: 0.00, single_ticket_fee: 0.00, ptech_fee: -2.00},
        {id: 3, title: 'Season 16 Subscriptions', qty: 32, buyer_price: 4208.00, fee: 0.00, single_ticket_fee: 0.00, ptech_fee: -96.00},
        {id: 4, title: 'EVENT TOTALS', qty: 40, buyer_price: 4715.50, fee: 18.00, single_ticket_fee: 0.00, ptech_fee: -104.00},
    ];

    return (
        <div className='bg-slate-50'>
            <DataGrid className='my-1'
                rows={rows}
                columns={columns}
                disableSelectionOnClick={true}
                disableColumnFilter={true}
                hideFooter={true}
                autoHeight={true}
                pageSize={11}
                style={{borderRadius: 0}}
                sx={{
                    '& .MuiDataGrid-cell': {
                        fontSize: '16px',
                    },
                }}
            />
        </div>
    );
};

export default EventTotalsComponent;
