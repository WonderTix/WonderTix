import {Router, Response, Request} from 'express';
import {create, find, findAll, findByUsername, remove, update}
  from './accounts.service';
import {checkJwt, checkScopes} from '../../auth';

export const accountsRouter = Router();

accountsRouter.use(checkJwt);
accountsRouter.use(checkScopes);

accountsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const resp = await findAll(req.query);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

accountsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const resp = await findByUsername(req.query.username as string);
    let c1 = resp.status.success ? 200 : 404;
    if (resp.status.success === true && resp.data.length === 0) {
      c1 = 404;
    }
    const code = c1;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

accountsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await find(req.params.id);
    let tempc = resp.status.success ? 200 : 404;
    if (tempc === 200 && resp.data.length === 0) {
      tempc = 404;
    }
    const code = tempc;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

accountsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const resp = await create(req.body);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

accountsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await remove(req.params.id);
    let tempc = resp.status.success ? 200 : 404;
    if (tempc === 200 && resp.data.length === 0) {
      tempc = 404;
    }
    const code = tempc;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

accountsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await update(req.body, req.params.id);
    let tempc = resp.status.success ? 200 : 404;
    if (tempc === 200 && resp.data.length === 0) {
      tempc = 404;
    }
    const code = tempc;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
