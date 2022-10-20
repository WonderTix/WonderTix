
import {response, buildResponse} from '../db';


/**
 * query: get all of the discount codes
 *
 * @type {Promise<response>}
 */

export const getDiscountCodes = async (): Promise<response> => {
  const query = {
  text: `SELECT * FROM discounts;`,
  };
  return buildResponse(query, 'GET');
};

/**
 * query: adds supplied discount code to db
 *
 * @type {Promise<response>}
 */

export const addDiscountCode = async (params: any): Promise<response> => {
  const query = {
    text: `INSERT INTO public.discounts (
      code,
      amount,
      percent,
      startdate,
      enddate,
      tickettypeid,
      createdby,
      usagelimit,
      min_tickets,
      min_events)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
    values: [params.code, params.amount, params.percent, params.startdate, params.enddate,
      params.tickettypeid, params.createdby, params.usagelimit, params.min_tickets, params.min_events],
  };
  console.log(query);
  return buildResponse(query, 'POST');
};



/**
 * query: Set the active flag on the supplied discount code to false
 *
 * @type {Promise<response>}
 */

export const alterDiscountCode = async (id: any): Promise<response> => {
  const query = {
    text: `UPDATE discounts SET usagelimit=0 WHERE discountid=$1;`,
    values: [id],
  };
  return buildResponse(query, 'PUT')
};


/**
 * query: Delete entry from db
 *
 * @type {Promise<response>}
 */

export const deleteDiscountCode = async (id: any): Promise<response> => {
  const query = {
    text: `DELETE FROM discounts WHERE discountid=$1;`,
    values: [id],
  };
  return buildResponse(query, 'DELETE')
};
