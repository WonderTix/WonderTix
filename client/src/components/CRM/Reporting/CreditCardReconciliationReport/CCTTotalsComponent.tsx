import React from 'react';
import ReactDOM from 'react-dom';

import {Box} from '@mui/system';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

const CCTTotalsComponent = () => {
    const columns: GridColDef[] = [
        {field: 'title', headerName: 'Type', flex: 1},
        {field: 'cost', headerName: 'Total $', flex: 1},
    ];

    const rows = [
        {id: 1, title: 'Transaction Gross', cost: '7,002.50'},
        {id: 2, title: 'Buyer Price', cost: '4,715.50'},
        {id: 3, title: 'Item Fees', cost: '18.00'},
        {id: 4, title: 'Fees', cost: '18.00'},
        {id: 5, title: 'Single Ticket Fee', cost: '0.00'},
        {id: 6, title: 'Order Fees', cost: '0.00'},
        {id: 7, title: 'Delivery Fees', cost: '0.00'},
        {id: 8, title: 'Exchange Fees', cost: '0.00'},
        {id: 9, title: 'Donations', cost: '2,269.00'},
        {id: 10, title: 'Patron Tech Fee', cost: '-104.00'},
        {id: 11, title: 'TOTAL', cost: '6,898.50'},
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
                pageSize={11}
                sx={{
                    'border': 'none',
                    '& .MuiDataGrid-cell': {
                        fontSize: '16px',
                        margin: '0px',
                    },
                }}
            />
        </div>
    );
};

export default CCTTotalsComponent;
