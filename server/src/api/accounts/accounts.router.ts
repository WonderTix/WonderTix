import {Router, Response, Request} from 'express';
import {create, find, findAll, findByUsername, remove, update}
  from './accounts.service';
import {checkJwt, checkScopes} from '../../auth';

export const accountsRouter = Router();

accountsRouter.use(checkJwt);
accountsRouter.use(checkScopes);

// GET /api/accounts
accountsRouter.get('/', async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const resp = await findAll(req.query);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp)
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/accounts/search?username={username}
accountsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const resp = await findByUsername(req.query.username as string);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/accounts/:id
accountsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await find(req.params.id);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST /api/accounts
accountsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const resp = await create(req.body);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/accounts/:id
accountsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await remove(req.params.id);
    let code = resp.status.success ? 204 : 404;
    res.sendStatus(code);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/accounts/:id
accountsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await update(req);
    let code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
