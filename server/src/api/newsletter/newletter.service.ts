import {response, buildResponse} from '../db';

/**
 * query: get count of customer rows with email matching params.email
 *
 * @type {Promise<response>}
 */

export const getNewsletterCount = async (params: any): Promise<response> => {
  const myQuery = {
    text: 'SELECT COUNT(*) FROM customers WHERE email = $1',
    values: [params.email],
  };
  return buildResponse(myQuery, 'GET');
};

/**
 * query: update newsletter and volunteer list values where email matching params.email
 *
 * @type {Promise<response>}
 */

export const updateNewsletter = async (params: any): Promise<response> => {
  const myQuery = {
    text: `UPDATE public.customers
                  SET newsletter=$1, "volunteer list"=$2
                  WHERE email = $3;`,
    values: [params.news_opt, params.volunteer_opt, params.email],
  };
  return buildResponse(myQuery, 'UPDATE');
};

/**
 * query: insert new customer
 *
 * @type Promise<response>
 */

export const insertNewsletter = async (params: any): Promise<response> => {
  const myQuery = {
    text: `INSERT INTO public.customers (
                  custname, 
                  email, 
                  phone, 
                  custaddress, 
                  newsletter, 
                  donorbadge, 
                  seatingaccom, 
                  vip, 
                  "volunteer list")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
    values: [
      params.custname,
      params.email,
      params.phone,
      params.custaddress,
      params.news_opt,
      false,
      false,
      false,
      params.volunteer_opt,
    ],
  };
  return buildResponse(myQuery, 'POST');
};
