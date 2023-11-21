import React from 'react';
import ReactDOM from 'react-dom';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

const DonationsByPaymentComponent = () => {
    // sample data for UI purposes
    const columns: GridColDef[] = [
        {field: 'title', headerName: '', flex: 1},
        {field: 'cost', headerName: 'Amount', flex: 1},
    ];

    const rows = [
        {id: 1, title: 'Check', cost: '104,850.00'},
        {id: 2, title: 'Credit Card', cost: '425.00'},
        {id: 3, title: 'Direct Deposit', cost: '5,000.00'},
        {id: 4, title: 'Donation', cost: '89.34'},
        {id: 5, title: 'Other', cost: '1,175.00'},
        {id: 6, title: 'TOTAL', cost: '111,539.34'},
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

export default DonationsByPaymentComponent;