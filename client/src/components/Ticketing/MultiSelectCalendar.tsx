/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import Collapse from '@material-ui/core/Collapse';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {useState} from "react";
import {IconButton, makeStyles} from "@material-ui/core";
import {format, isSameDay} from "date-fns";
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",
        color: "inherit",
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    selectedNonCurrentMonthDay: {
        color: theme.palette.common.white
    },
    wrapper: {
        background: "inherit",
        color: theme.palette.common.white,
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    },
    highlight: {
        background: theme.palette.primary.main,
    },
    highlightOutside: {
        background: theme.palette.primary.dark,
    }
}))

// const isSameDay = (a: Date, b: Date) => {
//     const sameDay = a.getDate() == b.getDate()
//     const sameMonth = a.getMonth() == b.getMonth()
//     const sameYear = a.getFullYear() == b.getFullYear()
//     return sameDay && sameMonth && sameYear
// }

export type MultiSelectCalendarProps = {
    value?: Date[],
    onChange?: (a: Date[]) => void,
    disabled?: boolean,
    onDateClicked?: (date: Date) => void,
    bindDates?: boolean,
}
function MultiSelectCalendar({value, onChange, disabled, onDateClicked, bindDates}: MultiSelectCalendarProps) {
    const [dates, setDates] = useState<Date[]>([]);
    let startDate = new Date()
    if (value) {
        startDate = value[0]
    }
    const [selDate, setSelDate] = useState<Date>(startDate);
    let updateDate = true;
    const classes = useStyles();

    const handleChange = (date: MaterialUiPickersDate) => {
        if (!date) return;
        setSelDate(date)
        if (updateDate) {
            toggleDate(date)
        } else {
            updateDate = true
        }
    }

    const toggleDate = (date: Date) => {
        if (onDateClicked) onDateClicked(date)
        if (disabled) return

        const cb = (value && onChange) ? onChange : setDates;
        const ds = (value && onChange) ? value : dates;
        const idx = ds.findIndex(d => isSameDay(d, date))

        if (idx === -1) {
            cb([date, ...ds]);
        } else {
            cb(ds.slice(0, idx).concat(ds.slice(idx + 1)));
        }
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                variant="static"
                openTo="date"
                orientation="landscape"
                value={selDate}
                onChange={handleChange}
                onYearChange={date => {
                    if (!date) return;
                    updateDate = false;
                }}
                minDate={!bindDates || !value ? undefined : value.reduce((a, b) => a < b ? a : b, value[0])}
                maxDate={!bindDates || !value ? undefined : value.reduce((a, b) => a > b ? a : b, value[0])}
                disableToolbar={bindDates}
                renderDay={(day, selectedDate, dayInCurrentMonth, dayComponent) => {
                    if (!day) return <div />
                    const daySelected = (value || dates).some(d => isSameDay(d, day))
                    const wrapperClassName = clsx({
                        [classes.wrapper]: daySelected,
                        [classes.highlight]: daySelected && dayInCurrentMonth,
                        [classes.highlightOutside]: daySelected && !dayInCurrentMonth
                    })
                    const dayClassName = clsx(classes.day, {
                        [classes.nonCurrentMonthDay]: !dayInCurrentMonth && !daySelected,
                        [classes.selectedNonCurrentMonthDay]: !dayInCurrentMonth && daySelected
                    });
                    return <div className={wrapperClassName}>
                        <IconButton className={dayClassName}>
                            <span> {format(day, "d")} </span>
                        </IconButton>
                    </div>
                }}
            />
        </MuiPickersUtilsProvider>
    )
}
export default MultiSelectCalendar;
