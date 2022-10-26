import {response, buildResponse} from '../db';

/**
 * query: get doorlist by params.eventinstanceid
 *
 * @type {Promise<response>}
 */

export const getDoorlist = async (params: any): Promise<response> => {
  const myQuery = {
    text: `
                      SELECT(
                        cust.customerid,
                        cust.firstname,
                        cust.lastname,
                        cust.vip,
                        cust.donorbadge,
                        cust.seatingaccom,
                        events.eventid,
                        events.eventname,
                        eventinstance.eventinstanceid,
                        eventinstance.eventdate,
                        eventinstance.eventtime,
                        tix.redeemed,
                          count(cust.customerid))
                      FROM eventinstances as eventinstance
                      LEFT JOIN events ON eventinstance.eventinstanceid = events.eventid
                      LEFT JOIN eventtickets as tix
                      ON eventinstance.eventinstanceid = tix.eventinstanceid_fk
                      JOIN customers as cust ON tix.eventinstanceid_fk = cust.customerid
                      WHERE eventinstance.eventinstanceid = $1
                      GROUP BY
                        cust.customerid,
                        cust.firstname, cust.lastname, events.eventid,
                        events.eventname,
                        eventinstance.eventinstanceid,
                        eventinstance.eventdate,
                        eventinstance.eventtime,
                        tix.redeemed
                      ORDER BY firstname, lastname
                      `,
    values: [params.eventinstanceid],
  };

  return buildResponse(myQuery, 'GET');
};
