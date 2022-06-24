import TicketsState from '../../../../interfaces/TicketsState';
import {pool} from '../../../db';
import {app} from '../../server';
import * as ticketUtils from './ticket.service';

// Get all ticket types
app.get('/api/tickets/type', async (req, res) => {
  try {
    const query = 'select * from tickettype';
    const getAllTickets = await pool.query(query);
    res.json(getAllTickets.rows);
  } catch (error) {
    console.error(error);
  }
});

// Set which tickets can be sold for an event
app.post('/api/set-tickets', async (req, res) => {
  try {
    const body = req.body;
    const values = [body.event_instance_id, body.ticket_type];
    const query =
      'INSERT INTO linkedtickets (event_instance_id, type) VALUES ($1, $2)';
    const setTickets = await pool.query(query, values);
    res.json(setTickets);
  } catch (error) {
    console.error(error);
  }
});

// Get list of which tickets can be purchased for the show along with its prices
app.get('/api/show-tickets', async (req, res) => {
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
    res.json(availableTickets);
    console.log(availableTickets.rows);
    return availableTickets.rows;
  } catch (error) {
    console.error(error);
  }
});

// Responds with tickets subset of Redux state
app.get('/api/tickets', async (req, res) => {
  try {
    const qs = `SELECT
                  ei.id AS event_instance_id,
                  eventid,
                  eventdate,
                  starttime,
                  totalseats,
                  availableseats,
                  tt.name AS admission_type,
                  price AS ticket_price,
                  concessions AS concession_price
              FROM event_instances ei
                  JOIN linkedtickets lt ON ei.id=lt.event_instance_id
                  JOIN tickettype tt ON lt.ticket_type=tt.id
              WHERE salestatus=true AND isseason=false AND availableseats > 0
              ORDER BY ei.id, event_instance_id;`;
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
  }
});
