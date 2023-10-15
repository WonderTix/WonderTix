import React from 'react';
import ReactDOM from 'react-dom';

import {Divider, Button, Radio, RadioGroup} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const FilterComponent = () => {
    return (
        <div>
            <div className="flex justify-center font-bold text-2xl">
                <h1>Filter Settings</h1>
            </div>
            <Divider
                sx={{'background-color': 'darkgrey'}}
            />
            <h3 className="px-1 py-2">Batch Date Range:</h3>
            <br></br>
            <div className="px-1 py-2">
                <FormControl>
                    <h3>Group By:</h3>
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
            <div className="flex justify-center">
                <Button variant="contained">Generate</Button>
            </div>
        </div>
    );
};

export default FilterComponent;
