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
    eevent: 'None',
    EventInstances: 'None',
    groupedBy: 'No',
  });

  const handleStartDateChange = (date) => {
    onFilterChange('startDate', date);
  };

  const handleEndDateChange = (date) => {
    onFilterChange('endDate', date);
  };

  const handleGroupChange = (event) => {
    onFilterChange('groupedBy', event.target.value);
    setFormData({
      ...formData,
      groupedBy: event.target.value as string,
    });
  };

  const handleEventChange = (event) => {
    onFilterChange('eevent', event.target.value);
    setFormData({
      ...formData,
      eevent: event.target.value as string,
    });
  };

  const handleEventInstancesChange = (event) => {
    onFilterChange('EventInstances', event.target.value);
    setFormData({
      ...formData,
      EventInstances: event.target.value as string,
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
          <h3 className='font-bold m-1'>Batch Date Range:</h3>
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
            <h3 className='font-bold'>Event:</h3>
            <div className='py-2'>
              <Select
                value={formData.eevent}
                onChange={handleEventChange}
                className='w-48 h-8'
              >
                <MenuItem value={'None'}>--None--</MenuItem>
                <MenuItem value={'Test'}>Test</MenuItem>
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
            <h3 className='font-bold'>EventInstances:</h3>
            <div className='py-2'>
              <Select
                value={formData.EventInstances}
                onChange={handleEventInstancesChange}
                className='w-48 h-8'
              >
                <MenuItem value={'None'}>--None--</MenuItem>
                <MenuItem value={'Fund'}>Test</MenuItem>
              </Select>
            </div>
          </FormControl>
          <Divider
            sx={{
              backgroundColor: 'slate-100',
            }}
          />
          <FormControl>
            <h3 className='font-bold m-1'>Grouped By:</h3>
            <div className='flex justify-between pt-1.5 px-1 py-1'>
              <RadioGroup
                row
                name='row-radio-buttons-group'
                value={formData.groupedBy}
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
            Generate
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
    Event: PropTypes.string.isRequired,
    EventInstances: PropTypes.string.isRequired,
    groupedBy: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
};

export default FilterComponent;
