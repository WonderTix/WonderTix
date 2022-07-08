import {Router} from 'express';
import {create, find, findAll, findByUsername, remove, update}
  from './accounts.service';

export const accountsRouter = Router();

// GET /api/accounts
accountsRouter.get('/', async (req, res) => {
  try {
    const accounts = await findAll();
    res.status(200).send(accounts.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/accounts/search?username={username}
accountsRouter.get('/search', async (req, res) => {
  try {
    const accounts = await findByUsername(req.query.username as string);
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

// POST /api/accounts
accountsRouter.post('/', async (req, res) => {
  try {
    const newAccount = await create(req.body);
    res.status(201).send(newAccount.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/accounts/:id
accountsRouter.delete('/:id', async (req, res) => {
  try {
    await remove(req.params.id);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/accounts/:id
accountsRouter.put('/:id', async (req, res) => {
  try {
    const updatedAccount = await update(req);
    res.status(204).send(updatedAccount.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
