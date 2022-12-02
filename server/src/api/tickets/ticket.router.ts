import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import * as ticketUtils from './ticket.service';

export const ticketRouter = Router();


// Responds with tickets subset of Redux state
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


// GET /api/tickets/validTypes
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

// GET /api/tickets/allTypes
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


// PUT /api/tickets/updateType
ticketRouter.put('/updateType', checkJwt, checkScopes, async (req, res) => {
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
