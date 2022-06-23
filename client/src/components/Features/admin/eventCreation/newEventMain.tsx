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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import EventInstanceTimes from "./EventInstanceTimes";
import NewEvent from "./createEvent";
//import Event from '../../events/eventsSlice'; Why doesn't this work??

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(2),
            minWidth: 200,
        }
    })
);

interface EventListings {
    name: string,
    id: number,
}

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

/* TODO: 
    - Francis '/api/event-list' needs to return id's as well 
    - There should be no event with an id of 0    
*/

export default function NewEventMain() {
    const classes = useStyles();
    const [eventIndex, setEventIndex] = useState<number>(0);
    // "New" should always be the first value, set in useEffect
    const [eventTitles, setEventTitles] = useState<EventListings[]>([]);
    const [eventInstanceDetails, setEventInstanceDetails] = useState<EventInstanceDetails[]>([]);

    useEffect(() => {
        fetch('/api/event-list')
            .then(response => response.json())
            .then(data => {
                let val: EventListings[] = [{ name: 'New', id: 0 }];
                console.log(data);
                data.forEach((x: any) => {
                    val.push({ name: x.eventname, id: x.id });
                })
                setEventTitles(val);
            })
    }, [setEventTitles, eventInstanceDetails])

    /* Prop passed down to createEvent. When an event is saved, we store the
       values and pass them along to eventTimes */
    const onEventSaved = (title: string, marquee: string[], description: string) => {
       // I think this should call the server to get a UUID and store the information
       // about the event.
       console.log('Event Name: ' + title);
       let titles = eventTitles.slice();
       titles.push({ name: title, id: 100 }); // TODO we should get a UUID for this
       setEventTitles(titles);
       setEventIndex(eventTitles.length); 
    }

    /* Handler for the select event */
    const onInputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEventIndex(event.target.value as number);
        let rows: EventInstanceDetails[] = [];
        fetch(`/api/show-tickets?event=${eventTitles[event.target.value as number].id}`)
            .then(request => request.json())
            .then(data => {
                console.log(data.rows);
                data.rows.forEach((val: any, index: number) => {
                    rows.push({
                        id: index,
                        eventid: val.event_id,
                        eventInstanceid: val.event_instance_id,
                        eventName: val.eventname,
                        eventDate: new Date(val.eventdate),
                        eventTime: val.starttime.slice(0, 5),
                        seats: val.availableseats,
                        price: val.price,
                    })
                })
            })
            setEventInstanceDetails(rows);
            console.log(rows);
    }

    return (
        <div>
            <h3>Create or edit an event</h3>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel>Options</InputLabel>
                    <Select
                        onChange={onInputChange}
                        value={ eventIndex}
                        defaultValue=""
                    >
                        {
                            eventTitles.map((val, index) => {
                                return(
                                    <MenuItem key={ index } value={ index }>{ val.name }</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            {
                // If the index is 0, then we have a new event, show the event creation page (createEvent) or if the
                // value is something else, we can edit the event event instance times (eventInstanceTimes).
                eventIndex === 0 ? <NewEvent eventSaved={onEventSaved} /> : <EventInstanceTimes eventTitle={eventTitles[eventIndex].name} eventInstanceDetails={eventInstanceDetails} />
            }            
        </div>
    )
}
