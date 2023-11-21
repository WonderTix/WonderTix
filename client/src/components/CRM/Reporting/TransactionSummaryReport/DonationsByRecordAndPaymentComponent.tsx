import React from 'react';
import ReactDOM from 'react-dom';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

const DonationsByPaymentComponent = () => {
    const columns: GridColDef[] = [
        {field: 'r_type', headerName: 'Record Type', flex: 4},
        {field: 'amount', headerName: 'Amount', flex: 1},
    ];

    const check_rows = [
        {id: 1, r_type: 'Check', amount: ''},
        {id: 2, r_type: 'Donation', amount: '0.00'},
        {id: 3, r_type: 'Grant Payment', amount: '0.00'},
    ];

    const cc_rows = [
        {id: 1, r_type: 'Credit Card', amount: ''},
        {id: 2, r_type: 'Donation', amount: '0.00'},
        {id: 3, r_type: 'PatronTicket Donation', amount: '0.00'},
    ];

    const dd_rows = [
        {id: 1, r_type: 'Direct Deposit', amount: ''},
        {id: 2, r_type: 'Donation', amount: '0.00'},
    ];

    const don_rows = [
        {id: 1, r_type: 'Donation', amount: ''},
        {id: 2, r_type: 'PatronTicket Donation', amount: '0.00'},
    ];

    const other_rows = [
        {id: 1, r_type: 'Donation', amount: '0.00'},
    ];

    return(
        <div className='bg-slate-50 border'>
            <DataGrid className='text-lg my-1'
                rows={check_rows}
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
            <DataGrid className='text-lg my-1'
                rows={cc_rows}
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
            <DataGrid className='text-lg my-1'
                rows={dd_rows}
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
            <DataGrid className='text-lg my-1'
                rows={don_rows}
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
            <DataGrid className='text-lg my-1'
                rows={other_rows}
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