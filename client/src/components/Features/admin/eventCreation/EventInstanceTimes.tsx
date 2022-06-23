/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { useState, useEffect } from "react";
import { Grid, Fab, RadioGroup, FormControl } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CalendarTable from "./CalendarTable";
import EventTimePicker from "./EventTimePicker";
import EventInstanceListing from "./EventInstanceListing";

interface EventInstanceDetails {
    id: number,
    eventid: number,
    eventInstanceid: number,
    eventName: string,
    eventDate: Date,
    eventTime: string,
    seats: number,
    price: number,
}

type EventInstanceProps = {
    eventTitle: string,
    eventInstanceDetails: EventInstanceDetails[],
}

interface EventInstanceSelector {
    id: number,
    time: string,
    seats: number,
    current: boolean,
}

export default function EventInstanceTimes({ eventTitle, eventInstanceDetails } : EventInstanceProps) {
    const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
    const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
    // We need at least one
    const [eventInstances, setEventInstances] = useState<EventInstanceSelector[]>([]);
    // TODO: Change this v
    const colors = ["aqua", "crimson", "forestgreen", "blue", "deeppink", "greenyellow", "indigo", "maroon", "steelblue"];

    const setUpTimes = () => {
        let times: EventInstanceSelector[] = [];
        eventInstanceDetails.forEach((val) => {
            console.log('Found!')
            const found = times.find(ele => ele.time === val.eventTime);
            if (!found) {
                times.push({ id: times.length, time: val.eventTime.slice(0,6), seats: val.seats, current: times.length === 0 ? true : false })
            }
        })

        if (times.length === 0) {
            times.push({ id: 0, time: "", seats: 0, current: true });
        }
        setEventInstances(times);

        console.log("Times: " + times.length + " Event: " + eventInstanceDetails.length)
    }
 
    useEffect(() => {
       setUpTimes();
    }, [eventInstanceDetails])

    // Increment the calendar month
    const onMonthIncr = () => {
        const newMonth = calendarMonth + 1;
        if (newMonth % 12 === 0) {
            setCalendarMonth(0);
            setCalendarYear(calendarYear + 1);
        } else {
            setCalendarMonth(newMonth);
        }
    };

    // Decerment calendar month
    const onMonthDecr = () => {
        const newMonth = calendarMonth - 1;
        if (newMonth < 0) {
            setCalendarMonth(11);
            setCalendarYear(calendarYear - 1);
        } else {
            setCalendarMonth(newMonth);
        }
    };

    // onSelectDayOfWeek:
    // If the user selects the top calendar bar where the days of the week are listed
    // we get a callback here.
    // 
    // TODO (Greg)
    const onSelectDayOfWeek = (dayOfWeek: number) => {
        console.log(`The day ${dayOfWeek} was clicked`);
    }

    // onSelectDay:
    // When the user selects a specific day of the month to add a show time to
    // we register it here.
    // 
    // key: The index from the month table
    // fullDate: The full date as if gotten from getDate(year, month, day). No time 
    //      information.
    const onSelectDay = (key: number, fullDate: Date | null) => {
        if (fullDate !== null) {
            // Get the currently selected time information
            let i = 0;
            for (; i < eventInstances.length; i++) {
                if (eventInstances[i].current)
                    break;
            }
            console.log('Date is: ' + fullDate + ' time is :' + eventInstances[i].time);
        }
    }

    // Add a show time to the list
    const onNewEventInstances = () => {
        let st = eventInstances.slice();
        let id = eventInstances.length;
        st.push({id: id, time: "", seats: 0, current: false});
        setEventInstances(st);
        console.log('Setting eventinstances: ' + eventInstances.length);
    }

    // Change one of the current show times on the list
    const onAddEventInstance = (time: string, seats: number, index: number) => {
        console.log("Time: " + time + " seats: " + seats + " id: " + index + ' Length: ' + eventInstances.length);
        let times = eventInstances.slice();
        times[index] = {id: times[index].id, time: time, seats: seats, current: times[index].current};
        setEventInstances(times);

    }

    // TODO: What if the currently selected show time is the one being deleted?
    // We need to change that. 
    const onRemoveEventInstance = (index: number) => {
        let showTime = eventInstances.slice();
        showTime.splice(index, 1);
        setEventInstances(showTime);
    }

    // Called when the user selects a different time
    const onChangeSelectedTime = (index: number) => {
        let st = eventInstances.slice()
        st.forEach(ele => ele.current = false);
        st[index].current = true;
        setEventInstances(st);
    }

    return (
        <div>
            <Grid container style={{ marginTop: "20px" }}>
                <Grid item xs={6}>
                    <h3><em>{ eventTitle }</em> details</h3>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={1}>
                    <Fab size="small" onClick={onNewEventInstances}>
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
            <FormControl component="fieldset" fullWidth>
                <RadioGroup name="radio-button-group">
                    {
                        eventInstances.map((value, index) => {
                            return <EventTimePicker
                                key={ value.id }
                                id={ index }
                                eventTime={ value.time }
                                eventSeats={ value.seats }
                                checked={ value.current }
                                color={ colors[index] }
                                onAddTime={ onAddEventInstance }
                                onRemoveTime={ onRemoveEventInstance }
                                onChangeTime={ onChangeSelectedTime }
                            />;
                        })
                    }
                </RadioGroup>
            </FormControl>
            <CalendarTable
                targetMonth={calendarMonth}
                targetYear={calendarYear}
                onSelectDaysOfWeek={onSelectDayOfWeek}
                onSelectDay={onSelectDay}
                onMonthDecr={onMonthDecr}
                onMonthIncr={onMonthIncr}
                key={calendarMonth}
            />
            <div>
                {
                    eventInstanceDetails.length > 0 ? eventInstanceDetails.map((val, index) => {
                        return <EventInstanceListing 
                            key={ index } 
                            id={ val.id } 
                            eventDate={ val.eventDate } 
                            startTime={ val.eventTime } 
                            totalSeats={ val.seats }
                        />
                    }) : ""
                }
            </div>
        </div>
    )
}
