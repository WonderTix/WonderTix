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
                    'margin-right': '4rem',
                }}
            >
                <Box
                    sx = {{
                        'margin-top': '6rem',
                        'margin-bottom': '1.5rem',
                    }}
                >
                    <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500'>
                    Credit Card Reconciliation Report
                    </h1>
                </Box>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                >
                    <Grid item xs={1.90}>
                        <Box
                            sx = {{
                                'width': '90%',
                                'height': '5rem',
                                'background-color': 'red',
                            }}
                        />
                        <h1>Filter</h1>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            sx = {{
                                'width': '90%',
                                'height': '10rem',
                                'background-color': 'blue',
                            }}
                        />
                        <h1>Report</h1>
                    </Grid>
                </Grid>
            </Box>
        </Box>


    );
  };

export default CreditCardRecon;
