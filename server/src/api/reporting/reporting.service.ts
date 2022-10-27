
import {response, buildResponse} from '../db';


export const getActiveSales = async (): Promise<response> => {
  const myQuery = {
    text: `
    SELECT

    FROM

    WHERE 

    ORDER BY ;`,
  };
  return await buildResponse(myQuery, 'GET');
};