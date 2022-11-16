
import {response, buildResponse} from '../db';

// Get the gross revenue for all events in the current season
export const getActiveEventSales = async (): Promise<response> => {
  const myQuery = {
    text: `
          SELECT 
            eventid_fk eventid, 
            e.eventname,
            SUM(instance_gross)
          FROM 
              (SELECT eventid_fk,
                eventinstanceid,
                SUM(price) instance_gross
              FROM eventinstances ei
                JOIN eventtickets et on ei.eventinstanceid = et.eventinstanceid_fk
                JOIN tickettype tt on et.tickettypeid_fk = tt.tickettypeid
              WHERE et.purchased = true
                AND eventid_fk 
                  IN 
                    (SELECT eventid 
                    FROM events e,
                      (SELECT seasonid
                      FROM seasons s
                      ORDER BY s.seasonid DESC LIMIT 1) season
                    WHERE e.seasonid_fk = season.seasonid)
              GROUP BY 
                eventid_fk,
                eventinstanceid) s1
          JOIN events e 
            ON s1.eventid_fk = e.eventid
          GROUP BY 
            s1.eventid_fk,
            e.eventname;`,
  };
  return await buildResponse(myQuery, 'GET');
};


// Gets orderids that contain a season ticket purchase for the current season
// where the customer has yet to select a showing for an event
export const getUnfulfilledSeasonTickets = async (): Promise<response> => {
  const myQuery = {
    text: `
    SELECT orderid_fk orderid
    FROM seasontickets st
    JOIN orderitems oi ON oi.orderitemid = st.orderitemid_fk 
    WHERE st.eventid_fk
    IN
      (SELECT eventid 
      FROM events e,
        (SELECT seasonid
          FROM seasons s
          ORDER BY s.seasonid DESC LIMIT 1) season
      WHERE e.seasonid_fk = season.seasonid
      ORDER BY eventid) 
    
    AND eventticketid_fk = null
    GROUP BY orderid_fk;`,
  };
  return await buildResponse(myQuery, 'GET');
};


// Get all of the orders by a given contact
export const getOrdersByContact = async (params: any): Promise<response> => {
  const myQuery = {
    text: `
          SELECT * 
          FROM orders
          WHERE orders.contactid_fk = $1;`,
          values: [
            params.contactid
          ],
  };
  return await buildResponse(myQuery, 'GET');
};