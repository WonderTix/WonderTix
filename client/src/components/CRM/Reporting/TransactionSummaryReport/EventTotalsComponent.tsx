import React from 'react';
import ReactDOM from 'react-dom';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

const EventTotalsComponent = () => {
    // SAMPLE DATA FOR UI PURPOSES
    const columns: GridColDef[] = [
        {field: 'title', headerName: 'Event Type', flex: 4},
        {field: 'qty', headerName: 'Qty', flex: 1},
        {field: 'buyer_price', headerName: 'Buyer Price', flex: 1},
        {field: 'fee', headerName: 'Fee', flex: 1},
        {field: 'single_ticket_fee', headerName: 'Single Ticket Fee', flex: 1},
        {field: 'pm_fee', headerName: 'PM Fee', flex: 1},
    ];

    const rows = [
        {id: 1, title: 'A Christmas Carol (Season 16)', qty: 390, buyer_price: 16325.54, fee: 780.00, single_ticket_fee: 0.00, pm_fee: -376.00},
        {id: 2, title: 'Notes from the Field', qty: 2, buyer_price: 113.90, fee: 6.00, single_ticket_fee: 0.00, pm_fee: -2.00},
        {id: 3, title: 'Roald Dahl\'s Matilda the Musical', qty: -4, buyer_price: -123.90, fee: -6.00, single_ticket_fee: 0.00, pm_fee: 4.00},
        {id: 4, title: 'Roald Dahl\'s Matilda the Musical 2.0', qty: 71, buyer_price: 1530.10, fee: 69.00, single_ticket_fee: 0.00, pm_fee: -71.00},
        {id: 5, title: 'EVENT TOTALS', qty: 459, buyer_price: 17845.64, fee: 849.00, single_ticket_fee: 0.00, pm_fee: -445.00},
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
