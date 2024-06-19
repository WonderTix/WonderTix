import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';

const DateRangePicker = ({start, end, onStartDateChange, onEndDateChange, isDisabled}) => {
    const handleStartDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        selectedDate.setDate(selectedDate.getDate() + 1);
        if (selectedDate > end) {
            onStartDateChange(end);
        } else {
            onStartDateChange(selectedDate);
        }
    };

    const handleEndDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        selectedDate.setDate(selectedDate.getDate() + 1);
        if (selectedDate < start) {
            onEndDateChange(start);
        } else {
            onEndDateChange(selectedDate);
        }
    };

    /**
     * Format a Date object to the "YYYY-MM-DD" format.
     *
     * @param {Date} date - The Date object to be formatted.
     * @returns {string} The formatted date string in "YYYY-MM-DD" format.
     */
    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return (
        <div>
            <div className='flex-1'>
                <div className='flex justify-center'>
                    <label htmlFor='BegingDate' className='block text-sm font-bold leading-6'>
                        Beginning Date:
                    </label>
                </div>
                <div className='flex justify-center'>
                    <input
                        required
                        type='date'
                        id='BegingDate'
                        name='BegingDate'
                        aria-required='true'
                        value={formatDateToYYYYMMDD(start)}
                        onChange={handleStartDateChange}
                        className='p-1.5 border rounded text-sm bg-slate-50'
                        disabled={isDisabled}
                    />
                </div>
            </div>
            <div className='flex-1'>
                <div className='flex justify-center'>
                    <label htmlFor='EndDate' className='block text-sm font-bold leading-6'>
                        End Date:
                    </label>
                </div>
                <div className='flex justify-center'>
                    <input
                        required
                        type='date'
                        id='EndDate'
                        name='EndDate'
                        aria-required='true'
                        value={formatDateToYYYYMMDD(end)}
                        onChange={handleEndDateChange}
                        className='p-1.5 border rounded text-sm bg-slate-50'
                        disabled={isDisabled}
                    />
                </div>
            </div>
        </div>
    );
};

DateRangePicker.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};

export default DateRangePicker;
