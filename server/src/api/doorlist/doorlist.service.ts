import {response, buildResponse} from '../db';

export const getDoorlist = async (params: any): Promise<response> => {
  const myQuery = {
    text: `
                      SELECT 
                        cust.id, 
                        cust.custname as "name", 
                        cust.vip, 
                        cust.donorbadge, 
                        cust.seatingaccom as "accomodations",
                        events.id as "eventid", 
                        events.eventname, 
                        event_instance.id as "event_instance_id", 
                        event_instance.eventdate, 
                        event_instance.starttime, 
                        tix.checkedin, 
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
                      `,
    values: [params.eventinstanceid],
  }

  return buildResponse(myQuery, 'GET');
}
