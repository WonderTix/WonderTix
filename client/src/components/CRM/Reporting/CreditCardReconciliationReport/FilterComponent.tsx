import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import DateRangePicker from './DateRange';
import PropTypes from 'prop-types';

import {Divider, Button, Radio, RadioGroup} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const FilterComponent = ({filterData, onFilterChange, onFilterSubmit, onFilterReset}) => {
    const {startDate, endDate} = filterData;

    const [formData, setFormData] = useState({
        startDate: startDate,
        endDate: endDate,
    });

    const handleStartDateChange = (date) => {
        onFilterChange('startDate', date);
    };

    const handleEndDateChange = (date) => {
        onFilterChange('endDate', date);
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
                    />
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
};

export default FilterComponent;
