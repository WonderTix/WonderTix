// api/contacts/contacts.router.ts

import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, findByName, remove, update}
  from './contacts.service';

export const contactsRouter = Router();

/**
 * @swagger
 *  /contacts
 *    post:
 *      summary: Create a new customer or 'contact'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                custname: string
 *                email: string
 *                phone: string
 *                custaddress: string
 *                newsletter: boolean
 *                donorbadge: string
 *                seatingaccom: boolean
 *                vip: boolean
 *                volunteer_list: boolean
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
 *                    custname: string
 *                    email: string
 *                    phone: string
 *                    custaddress: string
 *                    newsletter: boolean
 *                    donorbadge: string
 *                    seatingaccom: boolean
 *                    vip: boolean
 *                    volunteer_list: boolean
 *        404:
 *          description: An error occured querying the database
 */
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

/**
 * @swagger
 *  /contacts
 *    get:
 *      summary: Retrieve a list of existing customers
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
 *                    custname: string
 *                    email: string
 *                    phone: string
 *                    custaddress: string
 *                    newsletter: boolean
 *                    donorbadge: string
 *                    seatingaccom: boolean
 *                    vip: boolean
 *                    volunteer_list: boolean
 *        404:
 *          description: An error occured querying the database
 */
contactsRouter.get('/', async (req: Request, res: Response) => {
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
 *  /contacts/search
 *    get:
 *      summary: Retrieve a list of customers filtered by name
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: The name to filter by
 *          required: true
 *      responses:
*        200:
 *          description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      custname: string
 *                      email: string
 *                      phone: string
 *                      custaddress: string
 *                      newsletter: boolean
 *                      donorbadge: string
 *                      seatingaccom: boolean
 *                      vip: boolean
 *                      volunteer_list: boolean
 *        404:
 *          description: An error occured querying the database
 */
contactsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const resp = await findByName(req.query.name as string);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *  /contacts/:id
 *    get:
 *      summary: Retrieve a customer with a specific ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The ID of the customer to search for
 *      responses:
 *        200:
 *          description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      custname: string
 *                      email: string
 *                      phone: string
 *                      custaddress: string
 *                      newsletter: boolean
 *                      donorbadge: string
 *                      seatingaccom: boolean
 *                      vip: boolean
 *                      volunteer_list: boolean
 *        404:
 *          description: An error occured querying the database
 */
contactsRouter.get('/:id', async (req: Request, res: Response) => {
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
 *  /contacts/:id
 *    delete:
 *      summary: Deletes a customer with a specific ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The ID of the customer to search for
 *      responses:
 *        204:
 *          description: The resource was deleted successfully
 *        404:
 *          description: An error occured querying the database
 */
contactsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await remove(req.params.id);
    const code = resp.status.success ? 204 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *  /contacts
 *    put:
 *      summary: Update an existing customer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                custname: string
 *                email: string
 *                phone: string
 *                custaddress: string
 *                newsletter: boolean
 *                donorbadge: string
 *                seatingaccom: boolean
 *                vip: boolean
 *                volunteer_list: boolean
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
 *                    custname: string
 *                    email: string
 *                    phone: string
 *                    custaddress: string
 *                    newsletter: boolean
 *                    donorbadge: string
 *                    seatingaccom: boolean
 *                    vip: boolean
 *                    volunteer_list: boolean
 *        404:
 *          description: An error occured querying the database
 */
contactsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const resp = await update(req);
    console.log(resp);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
