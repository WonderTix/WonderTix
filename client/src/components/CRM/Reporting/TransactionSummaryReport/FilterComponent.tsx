import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import DateRangePicker from './DateRange';
import PropTypes from 'prop-types';

import {Divider, Button, Radio, RadioGroup} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const FilterComponent = ({filterData, onFilterChange, onFilterSubmit, onFilterReset, isDisabled}) => {
    const {startDate, endDate} = filterData;

    const [formData, setFormData] = useState({
        startDate: startDate,
        endDate: endDate,
        excDonationRecordTypes: 'None',
    });

    const handleStartDateChange = (date) => {
        onFilterChange('startDate', date);
    };

    const handleEndDateChange = (date) => {
        onFilterChange('endDate', date);
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

    const handleReset = (e) => {
        onFilterReset();
    };

    return (
        <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
            <div className="flex p-3 justify-center border-b font-bold text-lg bg-slate-100">
                <h1>Filter Settings</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="px-1 py-1">
                    <div className='flex justify-center'>
                        <h3 className="font-bold">Batch Date Range:</h3>
                    </div>
                    <DateRangePicker
                        start={startDate}
                        end={endDate}
                        onStartDateChange={handleStartDateChange}
                        onEndDateChange={handleEndDateChange}
                        isDisabled={isDisabled}
                    />
                </div>
                <div className='flex justify-center'>
                    <h3 className='font-bold text-center'>Excluded Donation Record Types:</h3>
                </div>
                <div className='flex justify-center py-2'>
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
                <Divider
                    sx={{
                        'backgroundColor': 'slate-100',
                        }}
                />
                <div className="flex justify-evenly pt-1.5 px-1 py-1">
                    <Button className='w-2/5 font-bold bg-gradient-to-t to-slate-100 hover:bg-gradient-to-b hover:shadow-inner shadow shadow-slate-600 active:opacity-75' type="submit" variant="contained" title='Submit filter'>Generate</Button>
                    <Button className='w-2/5 rounded uppercase font-bold text-center text-slate-900 text-sm bg-gradient-to-t from-slate-400/100 to-slate-100 hover:shadow-inner shadow shadow-slate-600 active:opacity-75' type='reset' title='Reset filter' onClick={handleReset}>Reset</Button>
                </div>
            </form>
        </div>
    );
};

FilterComponent.propTypes = {
    filterData: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date).isRequired,
      endDate: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onFilterSubmit: PropTypes.func.isRequired,
    onFilterReset: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};

export default FilterComponent;
