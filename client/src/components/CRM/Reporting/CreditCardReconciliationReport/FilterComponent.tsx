import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import DateRangePicker from './DateRange';

import {Divider, Button, Radio, RadioGroup} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const FilterComponent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [groupBy, setGroupBy] = useState('');

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Start Date:', startDate);
        console.log('End Date: ', endDate);
        console.log('Group By: ', groupBy);
    };

    return (
        <div>
            <div className="flex justify-center font-bold text-2xl">
                <h1>Filter Settings</h1>
            </div>
            <Divider
                sx={{
                    'background-color': 'darkgrey',
                    'height': '3px',
                }}
            />
            <div className="px-1 py-1">
                <form onSubmit={handleSubmit}>
                    <h3 className="font-bold">Batch Date Range:</h3>
                    <DateRangePicker
                        start={startDate}
                        end={endDate}
                        onStartDateChange={handleStartDateChange}
                        onEndDateChange={handleEndDateChange}
                    />
                    <Divider
                        sx={{
                            'background-color': 'darkgrey',
                            }}
                    />
                    <FormControl>
                        <h3 className="font-bold">Group By:</h3>
                        <div className="flex justify-between">
                            <RadioGroup
                                row
                                name="row-radio-buttons-group"
                                defaultValue="event"
                            >
                                <FormControlLabel value="event" control={<Radio />} label="Event" />
                                <FormControlLabel value="ql_code" control={<Radio />} label="QL Code" />
                            </RadioGroup>
                        </div>
                    </FormControl>
                    <Divider
                        sx={{
                            'background-color': 'darkgrey',
                            }}
                    />
                    <div className="flex justify-center pt-1.5">
                        <Button type="submit" variant="contained">Generate</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FilterComponent;
