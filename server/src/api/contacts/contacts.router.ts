// api/contacts/contacts.router.ts

import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, findByName, remove, update}
  from './contacts.service';

export const contactsRouter = Router();

contactsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const resp = await create(req.body);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// Remaining routes will all be private and require user to have admin scope
contactsRouter.use(checkJwt);
contactsRouter.use(checkScopes);

contactsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const resp = await findAll(req.query);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

contactsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const resp = await findByName(req.query.firstname as string, req.query.lastname as string);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

contactsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await find(req.params.id);
    let code = resp.status.success ? 200 : 404;
    if (code === 200 && resp.data.length === 0) {
      code = 404;
      resp.status.success = false;
    }
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

contactsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await remove(req.params.id);
    let code = resp.status.success ? 200 : 404;
    if (code === 200 && resp.data.length === 0) {
      code = 404;
      resp.status.success = false;
    }
    res.sendStatus(code);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

contactsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await update(req);
    let code = resp.status.success ? 200 : 404;
    if (code === 200 && resp.data.length === 0) {
      code = 404;
      resp.status.success = false;
    }
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
