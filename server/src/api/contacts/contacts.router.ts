// api/contacts/contacts.router.ts

import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, findByName, remove, update, findContactTicket}
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

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Retrieve contacts
 *     description: Retrieve a list of contacts.
 *     parameters:
 *       - in: query
 *         name: custname
 *         schema:
 *           type: string
 *         description: custname of the contact to filter by
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: email of the contact to filter by
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: phone number of the contact to filter by
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: address of the contact to filter by
 *       - in: query
 *         name: vip
 *         schema:
 *           type: boolean
 *         description: vip status of the contact to filter by
 *       - in: query
 *         name: volunteerlist
 *         schema:
 *           type: string
 *         description: volunteer status of the contact to filter by
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all of the contacts in the database. Requires Auth0 authentication with admin scope.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/contacts-get"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *     tags:
 *      - Contacts
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
 * /contacts/search:
 *   get:
 *     summary: Search contacts by first name and last name
 *     description: Returns a list of contacts matching first and last name
 *     parameters:
 *       - name: full_name
 *         in: query
 *         description: Full name of the contact to search for
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of contacts matching the first and last name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacts'
 *       '404':
 *         description: No contacts were found with the first and last name.
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *      - Contacts
 */
contactsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const resp = await findByName(req.query.firstname as string, req.query.lastname as string);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 * /contacts/show/{id}:
 *   get:
 *     summary: Get contact details by show ID
 *     description: Returns the details of a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the contact to retrieve
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The details of the contact with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the contact
 *                 firstname:
 *                   type: string
 *                   description: The first name of the contact
 *                 lastname:
 *                   type: string
 *                   description: The last name of the contact
 *                 email:
 *                   type: string
 *                   description: The email address of the contact
 *                 phone:
 *                   type: string
 *                   description: The phone number of the contact
 *       '404':
 *         description: No contact was found with the ID
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *      - Contacts
 */
contactsRouter.get('/show/:id', async (req: Request, res: Response) => {
  try {
    const resp = await findContactTicket(req.params.id);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp); 
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *
 * /contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     description: Retrieve a contact by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the contact to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Contact found.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "status": {
 *                   "success": true,
 *                   "message": "Contact found."
 *                 },
 *                 "data": {
 *                   "id": "123",
 *                   "name": "John Doe",
 *                   "email": "johndoe@example.com",
 *                   "phone": "(503)-123-4567"
 *                 }
 *               }
 *       '404':
 *         description: Contact not found.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "status": {
 *                   "success": false,
 *                   "message": "Contact not found."
 *                 },
 *                 "data": null
 *               }
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Contacts
 */
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

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Remove a contact by ID
 *     description: Deletes a contact by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the contact to remove
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact was removed successfully
 *       404:
 *         description: Contact with the ID was not found
 *       500:
 *         description: An error occurred while trying to remove the contact
 *     tags:
 *       - Contacts
 */
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

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     description: Update a contact by providing its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the contact to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated contact information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               vip: 
 *                 type: boolean
 *               volunteerlist:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the request 
 *                 message:
 *                   type: string
 *                   description: Additional message from the server.
 *                 data:
 *                   type: object
 *                   description: The updated contact information.
 *                   properties:
 *                     custname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     vip: 
 *                       type: boolean
 *                     volunteerlist:
 *                       type: string
 *       404:
 *         description: Contact not found with ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the request. 
 *                 message:
 *                   type: string
 *                   description: Error message from the server.
 *                 data:
 *                   type: object
 *                   description: Empty object, contact was not found.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *     tags:
 *       - Contacts 
*/

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
