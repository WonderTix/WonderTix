import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import { pool } from '../db';
import * as ticketUtils from './ticket.service';

export const ticketRouter = Router();

/**
 * @swagger
 *  /tickets:
 *    get:
 *      summary: get available tickets
 *      tags:
 *        - Tickets
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        byId:
 *                          type: object
 *                          properties:
 *                            ticketid:
 *                              type: object
 *                              properties:
 *                                event_instance_id: {type: integer}
 *                                eventid: {type: integer}
 *                                totalseats: {type: integer}
 *                                availableseats: {type: integer}
 *                                admission_type: {type: string}
 *                                ticket_price: {type: integer}
 *                                concession_price: {type: integer}
 *                                date: {type: string}
 *                        allIds: {type: array, items: {type: integer}}
 *                  status:
 *                    type: object
 *                    properties:
 *                      success: {type: boolean}
 *                      message: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
ticketRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tickets = await ticketUtils.getAvailableTickets();
    const code = tickets.status.success ? 200 : 404;
    res.status(code).send(tickets);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


/**
 * @swagger
 *  /tickets/validTypes:
 *    get:
 *      summary: get valid ticket types
 *      tags:
 *        - Tickets
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id: {type: integer}
 *                        description: {type: string}
 *                        price: {type: string}
 *                        concessions: {type: string}
 *                  status:
 *                    type: object
 *                    properties:
 *                      success: {type: boolean}
 *                      message: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
ticketRouter.get('/validTypes', async (req, res) => {
  try {
    const ticketTypes = await ticketUtils.getValidTicketTypes();
    const code = ticketTypes.status.success ? 200 : 404;
    res.status(code).send(ticketTypes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/**
 * @swagger
 *  /tickets/allTypes:
 *    get:
 *      summary: get all ticket types
 *      tags:
 *        - Tickets
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id: {type: integer}
 *                        description: {type: string}
 *                        price: {type: string}
 *                        concessions: {type: string}
 *                  status:
 *                    type: object
 *                    properties:
 *                      success: {type: boolean}
 *                      message: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
ticketRouter.get('/allTypes', async (req, res) => {
  try {
    const ticketTypes = await ticketUtils.getAllTicketTypes();
    const code = ticketTypes.status.success ? 200 : 404;
    res.status(code).send(ticketTypes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


/**
 * @swagger
 *  /tickets/types:
 *    post:
 *      summary: set default ticket type for event
 *      tags:
 *        - Tickets
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: eventinstanceid
 *        - in: path
 *          name: tickettypeid
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id: {type: integer}
 *                        description: {type: string}
 *                        price: {type: string}
 *                        concessions: {type: string}
 *                  status:
 *                    type: object
 *                    properties:
 *                      success: {type: boolean}
 *                      message: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
ticketRouter.post('/types', checkJwt, checkScopes, async (req, res) => {
  try {
    const data = await ticketUtils.setDefaultTicketForEvent(req.params);
    const code = data.status.success ? 200 : 404;
    res.status(code).send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * @swagger
 *  /tickets/newType:
 *    post:
 *      summary: create new ticket type
 *      tags:
 *        - Tickets
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name: {type: string}
 *                price: {type: integer}
 *                concessions: {type: integer}
 *            example:
 *              name: "Adult"
 *              price: 10
 *              concessions: 5
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        tickettypeid: {type: integer}
 *                        description: {type: string}
 *                        price: {type: string}
 *                        concessions: {type: string}
 *                        deprecated: {type: boolean}
 *                  status:
 *                    type: object
 *                    properties:
 *                      success: {type: boolean}
 *                      message: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
ticketRouter.post('/newType', checkJwt, checkScopes, async (req, res) => {
  try {
    const newTicket = await ticketUtils.createTicketType(req.body);
    const code = newTicket.status.success ? 200 : 404;
    res.status(code).send(newTicket);
  } catch (error: any) {
    res.sendStatus(500).send(error.message);
  }
});


/**
 * @swagger
 *  /tickets/updateType:
 *    put:
 *      summary: update ticket type
 *      tags:
 *        - Tickets
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id: {type: integer}
 *              name: {type: string}
 *              price: {type: integer}
 *              concessions: {type: integer}
 *          example:
 *            name: "Adult"
 *            price: 10
 *            concessions: 5
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items: {type: object}
 *                  status:
 *                    type: object
 *                    properties:
 *                      success: {type: boolean}
 *                      message: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
ticketRouter.put('/updateType', checkJwt, checkScopes, async (req, res) => {
  try {
    const updatedTicket = await ticketUtils.updateTicketType(req.body);
    const code = updatedTicket.status.success ? 200 : 404;
    res.status(code).send(updatedTicket);
  } catch (error: any) {
    res.sendStatus(500).send(error.message);
  }
});

/**
 * @swagger
 *  /tickets/{id}:
 *    delete:
 *      summary: Delete ticket type
 *      tags:
 *        - Tickets
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: id
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items: {type: object}
 *                  status:
 *                    type: object
 *                    properties:
 *                      success: {type: boolean}
 *                      message: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
ticketRouter.delete('/:id', checkJwt, checkScopes, async (req, res) => {
  try {
    const resp = await ticketUtils.removeTicketType(req.params.id);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (error: any) {
    res.sendStatus(500).send(error.message);
  }
});

