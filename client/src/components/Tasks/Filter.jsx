import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxSx() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Box sx={{ display: 'grid', mt: 4, width: '100%', height: 450, maxWidth: 360, bgcolor: 'text.disabled', border: 1,   borderColor: 'text.primary'}}>
        </Box>
        </div>
    );
}