import React from 'react';
import ReactDOM from 'react-dom';

import FilterComponent from './FilterComponent';
import ReportComponent from './ReportComponent';
import Navigation from '../../Navigation';

import {Box, Grid} from '@mui/material';

const CreditCardReconciliationReport=() =>{
    return (
        <div>
            <Box
                sx={{
                    'width': '100%',
                    'height': '100%',
                    'position': 'absolute',
                    'overflowX': 'hidden',
                }}
            >
                <Box
                    sx={{
                        'width': '100%',
                        'height': '100%',
                        'marginLeft': '16.7rem',
                        'marginRight': '4rem',
                    }}
                >
                    <Box
                        sx = {{
                            'marginTop': '6rem',
                            'marginBottom': '1.5rem',
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
                                    'backgroundColor': 'lightgrey',
                                    'border': '2px solid gray',
                                    'borderRadius': '7px',
                                }}
                            >
                                <FilterComponent/>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box
                                sx = {{
                                    'width': '95%',
                                    'height': '100%',
                                    'backgroundColor': 'lightgrey',
                                    'border': '2px solid gray',
                                    'borderRadius': '7px',
                                }}
                            >
                                <ReportComponent/>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Navigation/>
        </div>
    );
  };

export default CreditCardReconciliationReport;
