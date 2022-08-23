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
 *  get:
 *    summary: Retrieves a list of all user accounts or
 *      filters by username and/or admin status
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id: integer
 *                  username: string
 *                  is_superadmin: boolean
 *                  auth0_id: string
 *      404:
 *        description: An error occured querying the database
 */
accountsRouter.get('/', async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const resp = await findAll(req.query);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *  /accounts/search
 *    get:
 *      summary: Retrieves a list of user accounts with the specified username
 *      parameters:
 *        - in: query
 *          name: username
 *          schema:
 *            type: string
 *          description: The username of an account to search for
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id: integer
 *                    username: string
 *                    is_superadmin: boolean
 *                    auth0_id: string
 *        404:
 *          description: An error occured querying the database
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
 *  /accounts/:id
 *    get:
 *      summary: Retrieves a list of size 1 containing the user account with
 *        the specified ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The ID of the user
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id: integer
 *                    username: string
 *                    is_superadmin: boolean
 *                    auth0_id: string
 *        404:
 *          description: An error occured querying the database
 */
accountsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await find(req.params.id);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *  /accounts
 *    post:
 *      summary: Create a new user account
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                auth0_id:
 *                  type: string
 *              required:
 *                - username
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id: integer
 *                    username: string
 *                    is_superadmin: boolean
 *                    auth0_id: string
 *        404:
 *          description: An error occured querying the database
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
 *  /accounts/:id
 *    delete:
 *      summary: Deletes a user account
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *      responses:
 *        204:
 *          description: The resource was deleted successfully
 *        404:
 *          description: An error occured querying the database
 */
accountsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await remove(req.params.id);
    const code = resp.status.success ? 204 : 404;
    res.sendStatus(code);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *  /accounts/:id
 *    put:
 *      summary: Updates a user account
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The ID of the user account to update
  *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                auth0_id:
 *                  type: string
 *              required:
 *                - username
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id: integer
 *                    username: string
 *                    is_superadmin: boolean
 *                    auth0_id: string
 *        404:
 *          description: An error occured querying the database
 */
accountsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await update(req);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
