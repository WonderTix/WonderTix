// api/donations/donations.router.ts

import { Router, Request, Response } from 'express';
import { find, findAll } from './donations.service';

export const donationsRouter = Router();

// GET /api/donations
donationsRouter.get('/', async (req, res) => {
  try {
    const donations = await findAll(req.query);
    res.status(200).send(donations.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/donations/:id
donationsRouter.get('/:id', async (req, res) => {
  try {
    const donation = await find(req.params.id);
    res.status(200).send(donation.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
