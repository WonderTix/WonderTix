/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from "react";
import {dayMonthDate, militaryToCivilian} from '../utils';

export default function DeleteEvents() {
    async function deleteEvent(showId: string) {
        const data = {
            id: showId,
        }

        const response = await fetch("/api/delete-event",
        {
           credentials: 'include',
           method: 'POST',
           headers:
           {
              'Content-Type': 'application/json',
           },
           body: JSON.stringify(data),
        });
        getEvents();
        return response.json();
    }

    // Create columns that appears in data
    const columns = [
        { field: "id", headerName: "Event Instance ID", width: 100},
        { field: "eventname", headerName: "Event", width: 150},
        { field: "eventdescription", headerName: "Event Description", width: 150},
        { field: "eventdate", headerName: "Date", width: 150},
        { field: "starttime", headerName: "Time", width: 100},
        { field: "Delete", headerName: "Delete", width: 150, renderCell: (params: any) => (
            <Button variant="contained" color="secondary" onClick={() => deleteEvent(JSON.stringify(params.row.id))}>Delete</Button>
        )}
    ]

    const [eventList, setEventList] = useState([]);
    const getEvents = async () => {
        try {
            const response = await fetch("/api/active-event-instance-list");
            const jsonData = await response.json();
            Object.keys(jsonData).forEach(function(key) {
                jsonData[key].eventdate = dayMonthDate(jsonData[key].eventdate);
                jsonData[key].starttime = militaryToCivilian(jsonData[key].starttime);
            });
            setEventList(jsonData);
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => { getEvents();}, []);
    return (
        <div>
            <Typography variant="h2">Delete Events</Typography>
            <DataGrid autoHeight rows={eventList} columns={columns} pageSize={10} />
        </div>
    );
}
