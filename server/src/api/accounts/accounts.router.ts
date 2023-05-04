import {Router, Response, Request} from 'express';
import {create, find, findAll, findByUsername, remove, update}
  from './accounts.service';
import {checkJwt, checkScopes} from '../../auth';

export const accountsRouter = Router();

accountsRouter.use(checkJwt);
accountsRouter.use(checkScopes);

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Retrieve all accounts.
 *     description: >
 *         Retrieve a list of all accounts, with the option to filter by username and superadmin status.
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
 *     security:
 *       - bearerAuth: []
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
 *       '500':
 *         description: Internal server error
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
 * /accounts/search:
 *   get:
 *     summary: Search for an account by username.
 *     description: Retrieve an account by username.
 *     parameters:
 *       - name: username
 *         in: query
 *         description: Username of the account to filter by.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
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
 *       '500':
 *         description: Internal server error
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

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get an account by id.
 *     description: Retrieve an account by its id.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The identification number for the account.
 *         schema:
 *           type: number
 *     security:
 *       - bearerAuth: []
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
 *       '500':
 *         description: Internal server error
 *     tags:
 *       - Accounts
 */
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

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account.
 *     description: Create a new account with the provided information.
 *     requestBody:
 *       description: The account to be created.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new account.
 *               username:
 *                 type: string
 *                 description: The username for the new account.
 *               password:
 *                 type: string
 *                 description: The password for the new account.
 *               email:
 *                 type: string
 *                 description: The email for the new account.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with the newly created account object.
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
 *                       description: The identification number for the new account.
 *                     name:
 *                       type: string
 *                       description: The name of the new account.
 *                     username:
 *                       type: string
 *                       description: The username for the new account.
 *                     email:
 *                       type: string
 *                       description: The email for the new account.
 *       '404':
 *         description: Account not created.
 *       '500':
 *         description: Internal server error
 *     tags:
 *       - Accounts
 */
accountsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const resp = await create(req.body);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         description: id of the account to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
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
 *                       description: Indicates if the delete was successful
 *                 data:
 *                   type: object
 *                   description: Empty object
 *                   example: {}
 *       404:
 *         description: Account not found
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
 *                       description: Indicates if the delete was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *     tags:
 *       - Accounts
 */
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

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: Update an account.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         description: The ID of the account to update.
 *       - in: body
 *         name: account
 *         description: The account object to update.
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             auth0_id:
 *               type: string
 *             is_superadmin:
 *               type: boolean
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully updated the account.
 *       '404':
 *         description: The specified account was not found.
 *       '500':
 *         description: Internal server error
 *     tags:
 *       - Accounts
 */
// TODO: add $ref to proper directory
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
