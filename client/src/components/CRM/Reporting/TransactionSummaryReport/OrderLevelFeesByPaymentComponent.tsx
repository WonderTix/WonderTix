import React from 'react';
import ReactDOM from 'react-dom';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

const OrderLevelFeesByPaymentComponent = () => {
    // sample data for UI purposes
    const columns: GridColDef[] = [
        {field: 'title', headerName: '', flex: 4},
        {field: 'd_fee', headerName: 'Delivery Fees', flex: 1},
        {field: 'e_fee', headerName: 'Exchange Fees', flex: 1},
    ];

    const rows = [
        {id: 1, title: 'Comp', d_fee: '0.00', e_fee: '0.00'},
        {id: 2, title: 'Credit Card', d_fee: '0.00', e_fee: '30.00'},
        {id: 3, title: 'Donation', d_fee: '0.00', e_fee: '0.00'},
        {id: 4, title: 'Exchange', d_fee: '0.00', e_fee: '0.00'},
        {id: 5, title: 'Gift Certificate Credit', d_fee: '0.00', e_fee: '0.00'},
        {id: 6, title: 'TOTAL', d_fee: '0.00', e_fee: '30.00'},
    ];

    return(
        <div className='bg-slate-50 border'>
            <DataGrid className='text-lg my-1'
                rows={rows}
                columns={columns}
                disableSelectionOnClick={true}
                disableColumnFilter={true}
                hideFooter={true}
                autoHeight={true}
                pageSize={6}
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

export default OrderLevelFeesByPaymentComponent;