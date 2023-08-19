// api/db.ts

import dotenv from 'dotenv';
import path from 'path';
import {Pool, PoolConfig} from 'pg';

let envPath;
if (process.env.ENV === 'local') {
    envPath = path.join(__dirname, '../../../.env');
} else if (process.env.ENV === 'dev') {
    envPath = path.join(__dirname, '../../.env.dev');
} else {
    throw new Error('Unknown ENV value');
}
dotenv.config({ path: envPath });

// console.log("process env in server db.ts");
// console.log(process.env);


const dbPort = process.env.DB_PORT as number | undefined ? process.env.DB_PORT as number | undefined : 5432;

const config: PoolConfig = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: dbPort,
  host: process.env.DB_HOST,
};

/**
 * create pool object from configuration
 *
 * @type {?}
 */

export const pool: any = new Pool(config);

/**
 * connect pool to database host
 */

pool.on('connect', () => {
  console.log(
      `
      [database]: Connected to ${config.database}/${config.user}@${config.host}
      `,
  );
});

export type response = {
  data: Array<any>,
  status: {
    success: boolean,
    message: string,
  }
};

/**
 * builds a response message for a query result
 *
 * @type {Promise<response>}
 */

export const buildResponse = async (
    query: any,
    type: string,
): Promise<response> => {
  let resp: response = {
    data: [],
    status: {
      success: false,
      message: '',
    },
  };
  try {
    const res = await pool.query(query);
    console.log('query result code: ' + res.rowCount);
    let verificationString;
    switch (type) {
      case 'UPDATE':
        verificationString = 'updated';
        break;
      case 'GET':
        verificationString = 'returned';
        break;
      case 'DELETE':
        verificationString = 'deleted';
        break;
      case 'POST':
        verificationString = 'inserted';
        break;
    }
    resp = {
      data: res.rows,
      status: {
        success: true,
        message: `${res.rowCount} ${res.rowCount === 1 ?
          'row' :
          'rows'
        } ${verificationString}.`,
      },
    };
  } catch (error: any) {
    console.log('stack: ');
    console.log(error.stack);
    resp.status.message = error.message;
  }
  return resp;
};


// converts the databases integer representation of a date into a JS date object
// 20220512 -> 2022-05-12 == May 12 2022
export const parseIntToDate = (d : number) => {
  const year = d / 10000 | 0;
  d -= year *10000;
  const month = d / 100 | 0;
  const day = d - month*100;
  // month-1 because the month field is 0-indexed in JS
  return new Date(year, month-1, day);
};

// converts a JS date object to the databases integer representation of the date
// May 12 2022 -> 20220512
export const parseDateToInt = (d : Date) => {
  return d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate();
};
