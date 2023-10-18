import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker'

const DateRangePicker = ({start, end, onStartDateChange, onEndDateChange}) => {
    return (
        <div>
            <div>
                <label className='text-sm pr-2'>Start:</label>
                <input
                    type='date'
                    id='startDate'
                    name='startDate'
                    className='border border-black rounded text-sm w-1/2'
                    value={start}
                    onChange={onStartDateChange}
                />
            </div>
            <div className='pb-2'>
                <label className='text-sm pr-3'>End: </label>
                <input
                    type='date'
                    id='startDate'
                    name='startDate'
                    className='border border-black rounded text-sm w-1/2'
                    value={end}
                    onChange={onEndDateChange}
                />
            </div>
        </div>
    );
};

DateRangePicker.propTypes = {
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
};

export default DateRangePicker;
