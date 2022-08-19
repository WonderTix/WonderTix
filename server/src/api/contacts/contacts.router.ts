// api/contacts/contacts.router.ts

import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, findByName, remove, update}
  from './contacts.service';

export const contactsRouter = Router();

// PUBLIC
// POST /api/contacts
contactsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const resp = await create(req.body);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

contactsRouter.use(checkJwt);
contactsRouter.use(checkScopes);

// GET /api/contacts
contactsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const resp = await findAll(req.query);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/contacts/search?name={name}
contactsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const resp = await findByName(req.query.name as string);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/contacts/:id
contactsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await find(req.params.id);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/contacts/:id
contactsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await remove(req.params.id);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/contacts/:id
contactsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await update(req);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
