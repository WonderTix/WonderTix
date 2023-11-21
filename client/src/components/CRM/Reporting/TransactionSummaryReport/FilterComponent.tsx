import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import DateRangePicker from './DateRange';
import PropTypes from 'prop-types';

import {Divider, Button, Radio, RadioGroup} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const FilterComponent = ({filterData, onFilterChange, onFilterSubmit}) => {
    const {startDate, endDate, groupBy} = filterData;

    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        groupBy: 'Event',
    });

    const handleStartDateChange = (date) => {
        onFilterChange('startDate', date);
    };

    const handleEndDateChange = (date) => {
        onFilterChange('endDate', date);
    };

    const handleGroupChange = (event) => {
        onFilterChange('groupBy', event.target.value);
        setFormData({
            ...formData,
            groupBy: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterSubmit();
    };

    return (
        <div className='shadow-xl rounded-md bg-white border-t-4 border-black'>
            <div className="flex p-3 justify-center border-b font-bold text-lg bg-slate-100">
                <h1>Filter Settings</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="px-1 py-1">
                    <h3 className="font-bold">Batch Date Range:</h3>
                    <DateRangePicker
                        start={startDate}
                        end={endDate}
                        onStartDateChange={handleStartDateChange}
                        onEndDateChange={handleEndDateChange}
                    />
                    <FormControl>
                        <h3 className="font-bold">Group By:</h3>
                        <div className="flex justify-between">
                            <RadioGroup
                                row
                                name="row-radio-buttons-group"
                                value={formData.groupBy}
                                onChange={handleGroupChange}
                            >
                                <FormControlLabel value="Event" control={<Radio />} label="Event" />
                                <FormControlLabel value="QL Code" control={<Radio />} label="QL Code" />
                            </RadioGroup>
                        </div>
                    </FormControl>
                </div>
                <Divider
                    sx={{
                        'backgroundColor': 'slate-100',
                        }}
                />
                <div className="flex justify-center pt-1.5 px-1 py-1">
                    <Button className='font-bold bg-gradient-to-t from slate-400/50 to-slate-100 hover:bg-gradient-to-b hover:shadow-inner shadow shadow-slate-600 active:opacity-75' type="submit" variant="contained">Generate</Button>
                </div>
            </form>
        </div>
    );
};

FilterComponent.propTypes = {
    filterData: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date).isRequired,
      endDate: PropTypes.instanceOf(Date).isRequired,
      groupBy: PropTypes.string.isRequired,
    }).isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onFilterSubmit: PropTypes.func.isRequired,
};

export default FilterComponent;
