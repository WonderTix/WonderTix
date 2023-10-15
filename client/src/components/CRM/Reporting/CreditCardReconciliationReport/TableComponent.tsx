import React from 'react';
import ReactDOM from 'react-dom';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

const TableComponent = (rows, cols) => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Table HERE</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableComponent;
