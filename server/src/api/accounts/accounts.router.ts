import {Router, Response, Request} from 'express';
import {create, find, findAll, findByUsername, remove, update}
  from './accounts.service';
import {checkJwt, checkScopes} from '../../auth';

export const accountsRouter = Router();

accountsRouter.use(checkJwt);
accountsRouter.use(checkScopes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all accounts.
 *     description: Retrieve a list of all accounts, with the option to filter by username and superadmin status.
 *     parameters:
 *       - name: username
 *         in: query
 *         description: Filter the results by username (case-insensitive).
 *         schema:
 *           type: string
 *       - name: is_superadmin
 *         in: query
 *         description: Filter the results by superadmin status.
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: A successful response with an array of account objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: The identification number for the account.
 *                   username:
 *                     type: string
 *                     description: The username for the account.
 *                   is_superadmin:
 *                     type: boolean
 *                     description: Indicates if the account has superadmin status.
 *       '404':
 *         description: No accounts found.
 *     tags:
 *       - Accounts
 */


accountsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const resp = await findAll(req.query);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for an account by username.
 *     description: Retrieve an account by username.
 *     parameters:
 *       - name: username
 *         in: query
 *         description: Username of the account to filter by.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with an account object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       description: Indicates if the operation was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: The identification number for the account.
 *                     name:
 *                       type: string
 *                       description: The name of the account.
 *       '404':
 *         description: Account not found.
 *     tags:
 *       - Accounts
 */
accountsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const resp = await findByUsername(req.query.username as string);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

accountsRouter.get('/:id', async (req: Request, res: Response) => {
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

accountsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await update(req.body, req.params.id);
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
