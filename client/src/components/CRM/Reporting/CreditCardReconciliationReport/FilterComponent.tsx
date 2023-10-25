import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import DateRangePicker from './DateRange';

import {Divider, Button, Radio, RadioGroup} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const FilterComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
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
                                defaultValue="event"
                            >
                                <FormControlLabel value="event" control={<Radio />} label="Event" />
                                <FormControlLabel value="ql_code" control={<Radio />} label="QL Code" />
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

export default FilterComponent;
