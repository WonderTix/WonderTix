// api/donations/donations.router.ts

import {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, findByName, remove, update}
  from './donations.service';

export const donationsRouter = Router();

donationsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newDonation = await create(req.body);
    const code = newDonation.status.success ? 200 : 404;
    res.status(code).send(newDonation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// remaining routes are all private and require user to have admin scope
donationsRouter.use(checkJwt);
donationsRouter.use(checkScopes);

donationsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const donations = await findAll();
    const code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

donationsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const donations = await findByName(req.query.name as string);
    const code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

donationsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const donation = await find(req.params.id);
    let code = donation.status.success ? 200 : 404;
    if(code === 200 && donation.data.length === 0){
      code = 404;
      donation.status.success = false;
    }
    res.status(code).send(donation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

donationsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removedDonations = await remove(req.params.id);
    let code = removedDonations.status.success ? 200 : 404;
    if(code === 200 && removedDonations.data.length === 0){
      code = 404;
      removedDonations.status.success = false;
    }
    res.status(code).send(removedDonations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

donationsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDonation = await update(req);
    let code = updatedDonation.status.success ? 200 : 404;
    if(code === 200 && updatedDonation.data.length === 0){
      code = 404;
      updatedDonation.status.success = false;
    }
    res.status(code).send(updatedDonation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
