import React from 'react';
import ReactDOM from 'react-dom';

import {Box} from '@mui/system';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

const columns_others: GridColDef[] = [
    {field: 'title', headerName: 'Visa / MC / Discover', flex: 4},
    {field: 'qty', headerName: 'Qty', flex: 1},
    {field: 'buyer_price', headerName: 'Buyer Price', flex: 1},
    {field: 'fee', headerName: 'Fee', flex: 1},
    {field: 'single_ticket_fee', headerName: 'Single Ticket Fee', flex: 1},
    {field: 'ptech_fee', headerName: 'PTech Fee', flex: 1},
];

const rows_others = [
    {id: 1, title: 'A Christmas Carol (Season 16)', qty: 3, buyer_price: 205.00, fee: 12.00, single_ticket_fee: 0.00, ptech_fee: -4.00},
    {id: 2, title: 'Gift Certificates', qty: 2, buyer_price: 200.00, fee: 0.00, single_ticket_fee: 0.00, ptech_fee: -2.00},
    {id: 3, title: 'Season 16 Subscriptions', qty: 30, buyer_price: 3910.00, fee: 0.00, single_ticket_fee: 0.00, ptech_fee: -90.00},
    {id: 4, title: 'EVENT TOTALS', qty: 36, buyer_price: 4315.50, fee: 12.00, single_ticket_fee: 0.00, ptech_fee: -96.00},
];

const columns_amex: GridColDef[] = [
    {field: 'title', headerName: 'Amex', flex: 4},
    {field: 'qty', headerName: 'Qty', flex: 1},
    {field: 'buyer_price', headerName: 'Buyer Price', flex: 1},
    {field: 'fee', headerName: 'Fee', flex: 1},
    {field: 'single_ticket_fee', headerName: 'Single Ticket Fee', flex: 1},
    {field: 'ptech_fee', headerName: 'PTech Fee', flex: 1},
];

const rows_amex = [
    {id: 1, title: 'A Christmas Carol (Season 16)', qty: 2, buyer_price: 102.00, fee: 6.00, single_ticket_fee: 0.00, ptech_fee: -4.00},
    {id: 2, title: 'Gift Certificates', qty: 0, buyer_price: 0.00, fee: 0.00, single_ticket_fee: 0.00, ptech_fee: 0.00},
    {id: 3, title: 'Season 16 Subscriptions', qty: 2, buyer_price: 250.00, fee: 0.00, single_ticket_fee: 0.00, ptech_fee: -4.00},
    {id: 4, title: 'EVENT TOTALS', qty: 4, buyer_price: 307.00, fee: 6.00, single_ticket_fee: 0.00, ptech_fee: -8.00},
];

const EventTotalsByCCComponent = () => {
    return (
        <>
            <div className='bg-slate-50 mb-2'>
                <DataGrid className='my-1'
                    rows={rows_others}
                    columns={columns_others}
                    disableSelectionOnClick={true}
                    disableColumnFilter={true}
                    hideFooter={true}
                    autoHeight={true}
                    pageSize={11}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            fontSize: '16px',
                        },
                    }}
                />
            </div>
            <div className='bg-slate-50'>
                <DataGrid className='my-1'
                    rows={rows_amex}
                    columns={columns_amex}
                    disableSelectionOnClick={true}
                    disableColumnFilter={true}
                    hideFooter={true}
                    autoHeight={true}
                    pageSize={11}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            fontSize: '16px',
                        },
                    }}
                />
            </div>
        </>
    );
};

export default EventTotalsByCCComponent;
