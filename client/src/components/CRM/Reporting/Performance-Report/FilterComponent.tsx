import React, {useState} from 'react';

import DateRangePicker from './DateRange';
import PropTypes from 'prop-types';

import {Divider, Button, Radio, RadioGroup} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const FilterComponent = ({filterData, onFilterChange, onFilterSubmit}) => {
  const {startDate, endDate} = filterData;

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    primGrouping: 'None',
    secGrouping: 'None',
    groupByRecordType: 'No',
    excDonationRecordTypes: 'None',
  });

  const handleStartDateChange = (date) => {
    onFilterChange('startDate', date);
  };

  const handleEndDateChange = (date) => {
    onFilterChange('endDate', date);
  };

  const handleGroupChange = (event) => {
    onFilterChange('groupByRecordType', event.target.value);
    setFormData({
      ...formData,
      groupByRecordType: event.target.value as string,
    });
  };

  const handlePrimGroupingChange = (event) => {
    onFilterChange('primGrouping', event.target.value);
    setFormData({
      ...formData,
      primGrouping: event.target.value as string,
    });
  };

  const handleSecGroupingChange = (event) => {
    onFilterChange('secGrouping', event.target.value);
    setFormData({
      ...formData,
      secGrouping: event.target.value as string,
    });
  };

  const handleExcDRT = (event) => {
    onFilterChange('excDonationRecordTypes', event.target.value);
    setFormData({
      ...formData,
      excDonationRecordTypes: event.target.value as string,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit();
  };

  return (
    <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
      <div className='flex p-3 justify-center border-b font-bold text-lg bg-slate-100'>
        <h1>Filter Settings</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='px-1 py-1'>
          <h3 className='font-bold m-1'>Event Date Range:</h3>
          <DateRangePicker
            start={startDate}
            end={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
          <Divider
            sx={{
              backgroundColor: 'slate-100',
            }}
          />
          <FormControl
            variant='standard'
            sx={{m: 1, minWidth: 120}}
            size='small'
          >
            <h3 className='font-bold'>Primary Grouping:</h3>
            <div className='py-2'>
              <Select
                value={formData.primGrouping}
                onChange={handlePrimGroupingChange}
                className='w-48 h-8'
              >
                <MenuItem value={'None'}>--None--</MenuItem>
                <MenuItem value={'Fund'}>Fund</MenuItem>
                <MenuItem value={'Donation Origin'}>Donation Origin</MenuItem>
                <MenuItem value={'Campaign'}>Campaign</MenuItem>
              </Select>
            </div>
          </FormControl>
          <Divider
            sx={{
              backgroundColor: 'slate-100',
            }}
          />
          <FormControl
            variant='standard'
            sx={{m: 1, minWidth: 120}}
            size='small'
          >
            <h3 className='font-bold'>Secondary Grouping:</h3>
            <div className='py-2'>
              <Select
                value={formData.secGrouping}
                onChange={handleSecGroupingChange}
                className='w-48 h-8'
              >
                <MenuItem value={'None'}>--None--</MenuItem>
                <MenuItem value={'Fund'}>Fund</MenuItem>
                <MenuItem value={'Donation Origin'}>Donation Origin</MenuItem>
                <MenuItem value={'Campaign'}>Campaign</MenuItem>
              </Select>
            </div>
          </FormControl>
          <Divider
            sx={{
              backgroundColor: 'slate-100',
            }}
          />
          <FormControl>
            <h3 className='font-bold m-1'>Group By Record Type First:</h3>
            <div className='flex justify-between pt-1.5 px-1 py-1'>
              <RadioGroup
                row
                name='row-radio-buttons-group'
                value={formData.groupByRecordType}
                onChange={handleGroupChange}
              >
                <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='No' control={<Radio />} label='No' />
              </RadioGroup>
            </div>
          </FormControl>
          <Divider
            sx={{
              backgroundColor: 'slate-100',
            }}
          />
          <FormControl
            variant='standard'
            sx={{m: 1, minWidth: 120}}
            size='small'
          >
            <h3 className='font-bold'>Excluded Donation Record Types:</h3>
            <div className='py-2'>
              <Select
                value={formData.excDonationRecordTypes}
                onChange={handleExcDRT}
                className='w-48 h-8'
              >
                <MenuItem value={'None'}>--None--</MenuItem>
                <MenuItem value={'Corporate Donation'}>
                  Corporate Donation
                </MenuItem>
                <MenuItem value={'Donation'}>Donation</MenuItem>
                <MenuItem value={'Fundraiser Tickets'}>
                  Fundraiser Tickets
                </MenuItem>
                <MenuItem value={'Grant'}>Grant</MenuItem>
                <MenuItem value={'Grant Payment'}>Grant Payment</MenuItem>
                <MenuItem value={'Group Sale'}>Group Sale</MenuItem>
                <MenuItem value={'Group Sale Payment'}>
                  Group Sale Payment
                </MenuItem>
                <MenuItem value={'In Kind'}>In Kind</MenuItem>
              </Select>
            </div>
          </FormControl>
        </div>
        <Divider
          sx={{
            backgroundColor: 'slate-100',
          }}
        />
        <div className='flex justify-center pt-1.5 px-1 py-4'>
          <Button
            className='font-bold bg-gradient-to-t from slate-400/50 to-slate-100 hover:bg-gradient-to-b hover:shadow-inner shadow shadow-slate-600 active:opacity-75 py-2'
            type='submit'
            variant='contained'
          >
            Filter
          </Button>
        </div>
      </form>
    </div>
  );
};

FilterComponent.propTypes = {
  filterData: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    primGrouping: PropTypes.string.isRequired,
    secGrouping: PropTypes.string.isRequired,
    groupByRecordType: PropTypes.string.isRequired,
    excDonationRecordTypes: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
};

export default FilterComponent;
