import { Router } from 'express';
import { findAll, find } from './accounts.service';

export const accountsRouter = Router();

// GET /api/accounts
accountsRouter.get('/', async (req, res) => {
  try {
    const accounts = await findAll(req.query);
    res.status(200).send(accounts.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/accounts/:id
accountsRouter.get('/:id', async (req, res) => {
  try {
    const account = await find(req.params.id);
    res.status(200).send(account.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
