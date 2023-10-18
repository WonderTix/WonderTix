import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';

const DateRangePicker = ({start, end, onStartDateChange, onEndDateChange}) => {
    return (
        <div>
            <div className='flex justify-center'>
                <h2 className='text-sm pr-2 mr-[35%]'>Start</h2>
                <h2 className='text-sm pr-3'>End </h2>
            </div>
            <div className='flex pl-2 pb-2'>
                <DatePicker
                    name = 'startDate'
                    className='border border-black rounded text-sm w-[90%]'
                    selected={start}
                    onChange={onStartDateChange}
                    dateFormat="MM/dd/yy"
                />
                <DatePicker
                    name = 'startDate'
                    className='border border-black rounded text-sm w-[90%]'
                    selected={end}
                    onChange={onEndDateChange}
                    dateFormat="MM/dd/yy"
                />
            </div>

        </div>
    );
};

DateRangePicker.propTypes = {
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
};

export default DateRangePicker;
