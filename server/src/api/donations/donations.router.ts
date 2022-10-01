// api/donations/donations.router.ts

import {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, findByName, remove, update}
  from './donations.service';

export const donationsRouter = Router();

// Public route
// POST /api/donations
donationsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newDonation = await create(req.body);
    const code = newDonation.status.success ? 200 : 404;
    res.status(code).send(newDonation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

donationsRouter.use(checkJwt);
donationsRouter.use(checkScopes);

// GET /api/donations
donationsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const donations = await findAll();
    const code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/donations/search?name={name}
donationsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const donations = await findByName(req.query.name as string);
    const code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/donations/:id
donationsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const donation = await find(req.params.id);
    const code = donation.status.success ? 200 : 404;
    res.status(code).send(donation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/donations/:id
donationsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removedDonations = await remove(req.params.id);
    const code = removedDonations.status.success ? 204 : 404;
    res.status(code).send(removedDonations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/donations/:id
donationsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDonation = await update(req);
    const code = updatedDonation.status.success ? 200 : 404;
    res.status(code).send(updatedDonation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
