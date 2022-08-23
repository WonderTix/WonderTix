// api/donations/donations.router.ts

import {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, findByName, remove, update}
  from './donations.service';

export const donationsRouter = Router();

/**
 * @swagger
 *  /donations
 *    post:
 *      summary: Create a record of a donation
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                donorid
 *                isanonymous: boolean
 *                amount: number
 *                dononame: string
 *                frequency: string
 *                comments: string
 *                payment_intent: string
 *                donodate: string
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
 *                    donorid
 *                    isanonymous: boolean
 *                    amount: number
 *                    dononame: string
 *                    frequency: string
 *                    comments: string
 *                    payment_intent: string
 *                    donodate: string
 *        404:
 *          description: An error occured querying the database
 */
donationsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newDonation = await create(req.body);
    const code = newDonation.status.success ? 200 : 404;
    res.status(code).send(newDonation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// remaining routes are all private and require user to have admin scope
donationsRouter.use(checkJwt);
donationsRouter.use(checkScopes);

/**
 * @swagger
 *  /donations
 *    get:
 *      summary: Retrieve all donation records
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
 *                    donorid
 *                    isanonymous: boolean
 *                    amount: number
 *                    dononame: string
 *                    frequency: string
 *                    comments: string
 *                    payment_intent: string
 *                    donodate: string
 *        404:
 *          description: An error occured querying the database
 */
donationsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const donations = await findAll();
    const code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *  /donations/search
 *    get:
 *      summary: Create a record of a donation
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: The name of the donor to filter by
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
 *                    donorid
 *                    isanonymous: boolean
 *                    amount: number
 *                    dononame: string
 *                    frequency: string
 *                    comments: string
 *                    payment_intent: string
 *                    donodate: string
 *        404:
 *          description: An error occured querying the database
 */
donationsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const donations = await findByName(req.query.name as string);
    const code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *  /donations/search
 *    get:
 *      summary: Create a record of a donation
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The ID of the donation to filter by
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
 *                    donorid
 *                    isanonymous: boolean
 *                    amount: number
 *                    dononame: string
 *                    frequency: string
 *                    comments: string
 *                    payment_intent: string
 *                    donodate: string
 *        404:
 *          description: An error occured querying the database
 */
donationsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const donation = await find(req.params.id);
    const code = donation.status.success ? 200 : 404;
    res.status(code).send(donation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *  /donations/search
 *    get:
 *      summary: Create a record of a donation
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The ID of the donation to delete
 *      responses:
 *        204:
 *          description: The resource was deleted successfully
 *        404:
 *          description: An error occured querying the database
 */
donationsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removedDonations = await remove(req.params.id);
    const code = removedDonations.status.success ? 204 : 404;
    res.status(code).send(removedDonations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *  /donations
 *    put:
 *      summary: Update a record of a donation
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                donorid
 *                isanonymous: boolean
 *                amount: number
 *                dononame: string
 *                frequency: string
 *                comments: string
 *                payment_intent: string
 *                donodate: string
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
 *                    donorid
 *                    isanonymous: boolean
 *                    amount: number
 *                    dononame: string
 *                    frequency: string
 *                    comments: string
 *                    payment_intent: string
 *                    donodate: string
 *        404:
 *          description: An error occured querying the database
 */
donationsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDonation = await update(req);
    const code = updatedDonation.status.success ? 200 : 404;
    res.status(code).send(updatedDonation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
