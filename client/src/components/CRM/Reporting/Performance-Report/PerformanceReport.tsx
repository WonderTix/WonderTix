{/* import React, {useState} from 'react';

import FilterComponent from './FilterComponent';
//import ReportComponent from './ReportComponent';
import Navigation from '../../Navigation';

import {Box, Grid} from '@mui/material';

const PerformanceReport = () => {
    const [displayReport, setDisplayReport] = useState(false);

    const [filterData, setFilterData] = useState({
        startDate: new Date(),
        endDate: new Date(),
        eventName: '',
        eventType: 'None',
        venue: 'None',
        activeEvents: useState(false),
        pageSize: '25',
    });

    const handleFilterChange = (name, value) => {
        setFilterData({
          ...filterData,
          [name]: value,
        });
        console.log(filterData.primGrouping);
      };

      const handleFilterSubmit = () => {
        console.log('Filter Data:', filterData);
        setDisplayReport(true);
      };

    return (
        <div>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              overflowX: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                marginLeft: '16.7rem',
                marginRight: '4rem',
              }}
            >
              <Box
                sx={{
                  marginTop: '6rem',
                  marginBottom: '1.5rem',
                }}
              >
                <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500'>
                  Performance Report
                </h1>
              </Box>
              <Grid container direction='row' justifyContent='flex-start'>
                <Grid item xs={1.9}>
                  <Box
                    sx={{
                      width: '90%',
                      height: '15rem',
                    }}
                  >
                    <FilterComponent
                      filterData={filterData}
                      onFilterChange={handleFilterChange}
                      onFilterSubmit={handleFilterSubmit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box
                    sx={{
                      width: '95%',
                      height: '100%',
                    }}
                  >
                    {displayReport && <ReportComponent filterData={filterData} />}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Navigation />
        </div>
    );
};

export default PerformanceReport; */}
export {};
