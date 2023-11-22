import React from 'react';
import ReactDOM from 'react-dom';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

const TransactionTotalsComponent = () => {
    // SAMPLE DATA FOR UI PURPOSES
    const columns: GridColDef[] = [
        {field: 'title', headerName: 'Type', flex: 1},
        {field: 'cost', headerName: 'Total $', flex: 1},
    ];

    const rows = [
        {id: 1, title: 'Transaction Gross', cost: '130,174.64'},
        {id: 2, title: 'Ticket Total', cost: '18,724.64'},
        {id: 3, title: 'Buyer Price', cost: '17,845.64'},
        {id: 4, title: 'Item Fees', cost: '849.00'},
        {id: 5, title: 'Fees', cost: '849.00'},
        {id: 6, title: 'Single Ticket Fee', cost: '0.00'},
        {id: 7, title: 'Order Fees', cost: '0.00'},
        {id: 8, title: 'Delivery Fees', cost: '0.00'},
        {id: 9, title: 'Exchange Fees', cost: '30.00'},
        {id: 10, title: 'Donated Fulfillment Tickets', cost: '-89.34'},
        {id: 11, title: 'Donations', cost: '111,539.34'},
        {id: 12, title: 'Patron Tech Fee', cost: '-445.00'},
        {id: 13, title: 'Net Total', cost: '120,729.64'},
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
                        fontSize: '16px',
                        margin: '0px',
                    },
                }}
            />
        </div>
    );
};

export default TransactionTotalsComponent;
