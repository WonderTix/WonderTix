// api/donations/donations.router.ts

import { Router, Request, Response } from 'express';
import { pool } from '../db';

export const donationsRouter = Router();

// GET donations
donationsRouter.get('/', async (req: Request, res: Response) => {
  const query = 'SELECT * FROM donations';

  try {
    const donations = await pool.query(query);
    console.log(donations);
    res.status(200).send(donations.rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST donations
