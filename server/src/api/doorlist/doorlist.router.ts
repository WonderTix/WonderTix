import express from 'express';
import {pool} from '../db';
import {formatDoorlistResponse} from './doorlist.service';

export const doorlistRouter = express.Router();

// Door list route
doorlistRouter.get('/api/doorlist', async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const querystring = `
                        SELECT 
                          cust.id as "custid", 
                          cust.custname as "name", 
                          cust.vip, 
                          cust.donorbadge, 
                          cust.seatingaccom,
                          events.id as "eventid", 
                          events.eventname, 
                          event_instance.id as "event_instance_id", 
                          event_instance.eventdate, 
                          event_instance.starttime, 
                          tix.checkedin as "arrived", 
                          count(cust.id) as "num_tickets"
                        FROM event_instances as event_instance 
                        LEFT JOIN events ON event_instance.eventid = events.id 
                        LEFT JOIN tickets as tix 
                        ON event_instance.id = tix.eventinstanceid
                        JOIN customers as cust ON tix.custid = cust.id
                        WHERE event_instance.id = $1
                        GROUP BY 
                          cust.id, 
                          name, events.id, 
                          events.eventname, 
                          event_instance.id, 
                          event_instance.eventdate, 
                          event_instance.starttime, 
                          tix.checkedin
                        ORDER BY name
                        `;
    const values = [req.query.eventinstanceid];
    const doorlist = await pool.query(querystring, values);
    res.json(formatDoorlistResponse(doorlist.rows));
  } catch (err: any) {
    console.error(err.message);
  }
});
