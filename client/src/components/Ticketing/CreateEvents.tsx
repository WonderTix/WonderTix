/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { TextField, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function CreateEvents(props: {}) {
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventTickets, setEventTickets] = useState(0);
  const [eventDate, setEventDate] = useState(new Date()); // Use React datetime??
  const [eventTime, setEventTime] = useState(eventDate.getTime()); // Use React datetime??

  const eventCreate = async () => {
    const data = {
      eventName: eventName,
      eventDesc: eventDesc,
      eventTickets: eventTickets,
      eventDate: eventDate,
      eventTime: eventTime,
    };

    const req = await fetch("/api/create-event", {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return req.json();
  };

  return (
    <div>
      <h3>Enter Event Name</h3>
      <TextField
        id="Event"
        label="Event Name"
        variant="outlined"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setEventName(ev.target.value)
        }
        fullWidth
      />
      <h3>Enter Short Event Description</h3>
      <TextField
        id="EventDescription"
        label="Event Description"
        variant="outlined"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setEventDesc(ev.target.value)
        }
        fullWidth
      />
      <h3>Enter Image for Event</h3>
      {/*taken from https://dev.to/asimdahall/client-side-image-upload-in-react-5ffc*/}
      <input type="file" accept="image/*" multiple={false} />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h3>Enter Date</h3>
          <TextField type="date" id="eventDate" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <h3>Enter Time</h3>
          <TextField type="time" id="eventtime" variant="outlined" fullWidth />
        </Grid>
      </Grid>
      <h3>Enter Number of Tickets Available</h3>
      <TextField
        id="NumTicketsAvailable"
        label="Number of Tickets Available"
        variant="outlined"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setEventTickets(parseInt(ev.target.value, 10))
        }
        fullWidth
      />
      <Button variant="contained" type="submit" onClick={eventCreate}>
        Submit
      </Button>
      <h3>To Delete An Event click the Link Below</h3>
      <Link to="/admin/DeleteEvents">Go To Event Deletion Page</Link>
    </div>
  );
}
