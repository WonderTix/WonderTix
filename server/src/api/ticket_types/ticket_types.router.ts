import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import TicketType from '../../models/TicketType';
import {pool} from '../db';

export const ticketTypesRouter = Router();

/**
 * @swagger
 *  /ticket-types/{id}:
 *    put:
 *      summary: update ticket type
 *      tags:
 *        - TicketTypes
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                description: {type: string}
 *                price: {type: number}
 *                concessions: {type: number}
 *                deprecated: {type: boolean}
 *      responses:
 *        204:
 *          description: OK
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error: {type: string}
 */
ticketTypesRouter.put('/:id', checkJwt, checkScopes, async (req, res) => {
  try {
    if (req.body.description === undefined) {
      res.status(400).send({error: 'Missing description field'});
      return;
    }
    if (req.body.price === undefined) {
      res.status(400).send({error: 'Missing price field'});
      return;
    }
    if (req.body.concessions === undefined) {
      res.status(400).send({error: 'Missing concessions field'});
      return;
    }
    if (req.body.deprecated === undefined) {
      res.status(400).send({error: 'Missing deprecated field'});
      return;
    }

    const id = Number(req.params.id);
    const currentTicketType: boolean|TicketType = await TicketType.find(pool, id);
    if ( !currentTicketType ) {
      res.sendStatus(404);
      return;
    }

    const updatedTicketType: TicketType = currentTicketType as TicketType;
    updatedTicketType.description = req.body.description;
    updatedTicketType.price = req.body.price;
    updatedTicketType.concessions = req.body.concessions;
    updatedTicketType.deprecated = req.body.deprecated;
    await updatedTicketType.update();
    res.status(204).send();
  } catch (error: any) {
    res.status(500).send({error: error.message});
  }
});
