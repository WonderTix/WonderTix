import {response, buildResponse} from '../db';

/**
 * query: get doorlist by params.eventinstanceid
 *
 * @type {Promise<response>}
 */

export const getDoorlist = async (params: any): Promise<response> => {
  const myQuery = {
    text: `
          SELECT 
              FORMAT(
                  '(%s,%s,%s,%s,%s,%s,%s,"%s",%s,%s,%s,%s,%s)',
                  c.contactid,
                  c.firstname,
                  c.lastname,
                  c.vip,
                  c.donorbadge,
                  c.seatingaccom,
                  e.eventid,
                  e.eventname,
                  ei.eventinstanceid,
                  ei.eventdate,
                  ei.eventtime,
                  et.redeemed,
                  COUNT(et.redeemed)
              ) AS formatted_output
          FROM 
              contacts c
          JOIN 
              orders o ON c.contactid = o.contactid_fk
          JOIN 
              orderitems oi ON o.orderid = oi.orderid_fk
          JOIN 
              eventtickets et ON oi.orderitemid = et.eventticketid
          JOIN 
              eventinstances ei ON et.eventinstanceid_fk = ei.eventinstanceid
          JOIN 
              events e ON ei.eventid_fk = e.eventid
          WHERE 
              e.eventid = $1
          GROUP BY 
              c.contactid,
              c.firstname,
              c.lastname,
              c.vip,
              c.donorbadge,
              c.seatingaccom,
              e.eventid,
              e.eventname,
              ei.eventinstanceid,
              ei.eventdate,
              ei.eventtime,
              et.redeemed
          ORDER BY 
              c.firstname, c.lastname;`,
    values: [params.eventinstanceid],
  };

  return buildResponse(myQuery, 'GET');
};
