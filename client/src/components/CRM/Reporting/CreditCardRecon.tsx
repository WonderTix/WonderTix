import React from 'react';
import ReactDOM from 'react-dom';

import Reporting from './Reporting';
import Navigation from '../Navigation';

import {Box, Grid} from '@mui/material';

const CreditCardRecon=() =>{
    return (
        <Box
            sx={{
                'width': '100%',
                'height': '100%',
                'position': 'absolute',
                'overflow-x': 'hidden',
            }}
        >
            <Box
                sx={{
                    'width': '100%',
                    'height': '100%',
                    'margin-left': '16.7rem',
                    'margin-top': '4rem',
                }}
            >
                <Box
                    sx = {{
                        'margin-top': '6em',
                        'margin-bottom': '6em',
                    }}
                >
                    <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-10 pb-4'>
                    Credit Card Reconciliation Report
                    </h1>
                </Box>
                <Grid>
                </Grid>
            </Box>
        </Box>


    );
  };

export default CreditCardRecon;
