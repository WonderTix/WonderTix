import { app } from "../server";
import { pool } from "../db";
import { formatDoorlistResponse } from "../utilities/doorlistUtils";

//Door list route
app.get("/api/doorlist", async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const querystring = `select cust.id as "custid", cust.custname as "name", cust.vip, cust.donorbadge, cust.seatingaccom,
              events.id as "eventid", events.eventname, event_instance.id as "event_instance_id", event_instance.eventdate, event_instance.starttime, tix.checkedin as "arrived", count(cust.id) as "num_tickets"
              from event_instances as event_instance left join events on event_instance.eventid = events.id left join
              tickets as tix on event_instance.id = tix.eventinstanceid
              join customers as cust on tix.custid = cust.id
              where event_instance.id = $1
              group by cust.id, name, events.id, events.eventname, event_instance.id, event_instance.eventdate, event_instance.starttime, tix.checkedin
              order by name`;
    const values = [req.query.eventinstanceid];
    const doorlist = await pool.query(querystring, values);
    res.json(formatDoorlistResponse(doorlist.rows));
  } catch (err) {
    console.error(err.message);
  }
});
