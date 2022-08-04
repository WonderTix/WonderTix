import express from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {pool} from '../db';

export const newsletterRouter = express.Router();

// News Letter Route
newsletterRouter.get('/count', checkJwt, checkScopes, async (req, res) => {
  try {
    const emails = await pool.query(
        'SELECT COUNT(*) FROM customers WHERE email = $1',
        [req.body.email],
    );
    res.json(emails.rows);
  } catch (err: any) {
    console.error(err.message);
  }
});

// Nesletter Route
newsletterRouter.put('/', async (req, res) => {
  try {
    const body = req.body;
    const values = [body.news_opt, body.volunteer_opt, body.email];
    const rows = await pool.query(
        `UPDATE public.customers
              SET newsletter=$1, "volunteer list"=$2
              WHERE email = $3;`,
        values,
    );
    res.json(rows.rows);
  } catch (err: any) {
    console.error(err.message);
  }
});

newsletterRouter.post('/', async (req, res) => {
  try {
    const body = req.body;
    const values = [
      body.custname,
      body.email,
      body.phone,
      body.custaddress,
      body.news_opt,
      false,
      false,
      false,
      body.volunteer_opt,
    ];
    const query = `
                  INSERT INTO public.customers (
                    custname, 
                    email, 
                    phone, 
                    custaddress, 
                    newsletter, 
                    donorbadge, 
                    seatingaccom, 
                    vip, 
                    "volunteer list")
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    const emails = await pool.query(
        query,
        values,
    );
    res.json(emails.rows);
  } catch (err: any) {
    console.error(err.message);
    res.sendStatus(500);
  }
});
