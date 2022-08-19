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
    let code = newDonation.status.success ? 200 : 404;
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
    let code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/donations/search?name={name}
donationsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const donations = await findByName(req.query.name as string);
    let code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/donations/:id
donationsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const donation = await find(req.params.id);
    let code = donation.status.success ? 200 : 404;
    res.status(code).send(donation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/donations/:id
donationsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removed_donations = await remove(req.params.id);
    let code = removed_donations.status.success ? 204 : 404;
    res.sendStatus(code);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/donations/:id
donationsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDonation = await update(req);
    let code = updatedDonation.status.success ? 200 : 404;
    if (updatedDonation.data.length > 0) {
      res.status(code).send(updatedDonation);
    } else {
      res.sendStatus(404);
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
