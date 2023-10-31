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
                '(%s,%s,%s,%s,%s,%s,%s,"%s",%s,%s,%s,%s)',
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
                COUNT(et.redeemed),
                SUM(CASE WHEN et.redeemed = true THEN 1 ELSE 0 END)
            ) AS row
        FROM 
            eventinstances ei
        LEFT JOIN 
            eventtickets et ON ei.eventinstanceid = et.eventinstanceid_fk
        LEFT JOIN
            singletickets st ON et.singleticket_fk = st.singleticketid
        LEFT JOIN 
            orderitems oi ON st.orderitemid_fk = oi.orderitemid
        LEFT JOIN 
            orders o ON oi.orderid_fk = o.orderid
        LEFT JOIN 
            contacts c ON o.contactid_fk = c.contactid
        LEFT JOIN 
            events e ON ei.eventid_fk = e.eventid
        WHERE 
            ei.eventinstanceid = $1
            AND 
            et.tickettypeid_fk = $2
        AND 
            ei.deletedat is null
        AND
            e.deletedat is null
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
            ei.eventtime
        ORDER BY 
            c.firstname, c.lastname;`,
    values: [params.eventinstanceid, 1],
  };

  return buildResponse(myQuery, 'GET');
};
