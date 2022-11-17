import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import TicketsState from '../../interfaces/TicketsState';
import {pool} from '../db';
import * as ticketUtils from './ticket.service';
import Ticket from '../../interfaces/Ticket';

export const ticketRouter = Router();


//
// **BROKEN** Will require refactor and DB update for
//  eventinstance: defaulttickettype
//
// Responds with tickets subset of Redux state

// ticketRouter.get('/', async (req: Request, res: Response) => {
//   try {
//     const tickets = await ticketUtils.getAvailableTickets();
//     const code = tickets.status.success ? 200 : 404;
//     res.status(code).send(tickets);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

ticketRouter.get('/', async (req, res) => {
  try {
    const qs = `
                SELECT
                  ei.eventinstanceid event_instance_id,
                  ei.eventid_fk eventid,
                  ei.eventdate,
                  ei.eventtime starttime,
                  ei.totalseats,
                  ei.availableseats,
                  tt.description AS admission_type,
                  tt.price AS ticket_price,
                  tt.concessions AS concession_price
                FROM
                  eventtickets et
                  JOIN eventinstances ei 
                    ON et.eventinstanceid_fk = ei.eventinstanceid
                  JOIN tickettype tt 
                    ON et.tickettypeid_fk = tt.tickettypeid
                WHERE 
                  ei.availableseats > 0
                AND 
                  ei.salestatus = true;`;
    const queryRes = await pool.query(qs);
    res.json(
        queryRes.rows
            .map(ticketUtils.toTicket)
            .reduce(ticketUtils.reduceToTicketState, {
              byId: {},
              allIds: [],
            } as TicketsState),
    );
    console.log('# tickets:', queryRes.rowCount);
  } catch (err: any) {
    console.error(err.message);
    res.sendStatus(500);
  }
});


// GET /api/tickets/types
ticketRouter.get('/types', async (req: Request, res: Response) => {
  try {
    const ticketTypes = await ticketUtils.getValidTicketTypes();
    const code = ticketTypes.status.success ? 200 : 404;
    res.status(code).send(ticketTypes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// POST /api/tickets/types
ticketRouter.post('/types', checkJwt, checkScopes, async (req, res) => {
  try {
    const data = await ticketUtils.setDefaultTicketForEvent(req.params);
    const code = data.status.success ? 200 : 404;
    res.status(code).send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});


// POST /api/tickets/newType
ticketRouter.post('/newType', checkJwt, checkScopes, async (req, res) => {
  try {
    const newTicket = await ticketUtils.createTicketType(req.body);
    const code = newTicket.status.success ? 200 : 404;
    res.status(code).send(newTicket);
  } catch (error: any) {
    res.sendStatus(500).send(error.message);
  }
});


// POST /api/tickets/updateType
ticketRouter.post('/updateType', checkJwt, checkScopes, async (req, res) => {
  try {
    const updatedTicket = await ticketUtils.updateTicketType(req.body);
    const code = updatedTicket.status.success ? 200 : 404;
    res.status(code).send(updatedTicket);
  } catch (error: any) {
    res.sendStatus(500).send(error.message);
  }
});


// DELETE /api/tickets/:id
ticketRouter.delete('/:id', checkJwt, checkScopes, async (req, res) => {
  try {
    const resp = await ticketUtils.removeTicketType(req.params.id);
    const code = resp.status.success ? 200 : 404;
    res.status(code).send(resp);
  } catch (error: any) {
    res.sendStatus(500).send(error.message);
  }
});
