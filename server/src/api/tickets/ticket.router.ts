import express from 'express';
import {checkJwt, checkScopes} from '../../auth';
import TicketsState from '../../interfaces/TicketsState';
import {pool} from '../db';
import * as ticketUtils from './ticket.service';
import Ticket from '../../interfaces/Ticket';

export const ticketRouter = express.Router();

// Responds with tickets subset of Redux state
ticketRouter.get('/', async (req, res) => {
  try {
    const qs = `
              SELECT
              eventinstanceid event_instance_id,
              eventid,
              eventdate,
              eventtime starttime,
              totalseats,
              availableseats,
              description AS admission_type,
              price AS ticket_price,
              concessions AS concession_price
              FROM eventinstances NATURAL JOIN eventtickets NATURAL JOIN tickettype
              WHERE availableseats > 0`;
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

// Get all ticket types
ticketRouter.get('/types', async (req, res) => {
  try {
    const query = 'select * from tickettype';
    const getAllTickets = await pool.query(query);
    res.json(getAllTickets.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Set which tickets can be sold for an event
ticketRouter.post('/types', checkJwt, checkScopes, async (req, res) => {
  try {
    const body = req.body;
    const values = [body.event_instance_id, body.ticket_type];
    const query =
      `
        INSERT INTO linkedtickets (event_instance_id, ticket_type)
        VALUES ($1, $2)
      `;
    const setTickets = await pool.query(query, values);
    res.json(setTickets.rows);
  } catch (error) {
    console.error(error);
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

// Get list of which tickets can be purchased for the show along with its prices
ticketRouter.get('/list', async (req, res) => {
  try {
    const query = `
                    SELECT 
                        ev.id as event_id,
                        ei.id as event_instance_id,
                        eventname,
                        eventdescription,
                        eventdate,
                        starttime,
                        totalseats, 
                        availableseats,
                        price,
                        concessions
                    FROM events ev
                    LEFT JOIN event_instances ei ON ev.id=ei.eventid
                    JOIN linkedtickets lt ON lt.event_instance_id=ei.id
                    JOIN tickettype tt ON lt.ticket_type=tt.id
                    WHERE ev.id=$1 AND isseason=false;
                  `;
    const values = [req.query.event];
    const availableTickets = await pool.query(query, values);
    res.json(availableTickets.rows);
    console.log(availableTickets.rows);
    return availableTickets.rows;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
