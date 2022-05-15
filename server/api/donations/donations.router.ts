// api/donations/donations.router.ts

import { Router, Request, Response } from 'express';
import { findAll, find, create, remove, update }  from './donations.service';

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

// POST /api/donations
donationsRouter.post('/', async (req, res) => {
  try {
    const newDonation = await create(req.body);
    res.status(201).send(newDonation.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/donations/:id
donationsRouter.delete('/:id', async (req, res) => {
  try {
    await remove(req.params.id);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/donations/:id
donationsRouter.put('/:id', async (req, res) => {
  try {
    const updatedDonation = await update(req);
    res.sendStatus(204).send(updatedDonation.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});