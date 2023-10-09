import React from 'react';
import ReactDOM from 'react-dom';

import FilterComponent from './report_components/FilterComponent';
import ReportComponent from './report_components/ReportComponent';

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
                                'height': '15rem',
                                'background-color': 'lightgrey',
                                'border': '2px solid gray',
                                'border-radius': '8px',
                            }}
                        >
                            <FilterComponent/>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            sx = {{
                                'width': '95%',
                                'height': '40rem',
                                'background-color': 'lightgrey',
                                'border': '2px solid gray',
                                'border-radius': '8px',
                            }}
                        >
                            <ReportComponent/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>


    );
  };

export default CreditCardRecon;
