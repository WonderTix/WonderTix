// api/donations/donations.router.ts

import {Request, Response, Router} from 'express';
import {create, find, findAll, findByName, remove, update}
  from './donations.service';

export const donationsRouter = Router();

// GET /api/donations
donationsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const donations = await findAll();
    res.status(200).send(donations.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/donations/search?name={name}
donationsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const donations = await findByName(req.query.name as string);
    res.status(200).send(donations.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/donations/:id
donationsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const donation = await find(req.params.id);
    res.status(200).send(donation.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST /api/donations
donationsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newDonation = await create(req.body);
    res.status(201).send(newDonation.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/donations/:id
donationsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await remove(req.params.id);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/donations/:id
donationsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDonation = await update(req);
    if (updatedDonation.rowCount > 0) {
      res.status(200).send(updatedDonation.rows);
    } else {
      res.sendStatus(404);
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
