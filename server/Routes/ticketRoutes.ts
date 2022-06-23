import { app } from "../server";
import { pool } from "../db";
import * as ticketUtils from "../utilities/ticketUtils";
import TicketsState from "../../interfaces/TicketsState";

// Get all ticket types
app.get("/api/tickets/type", async (req, res) => {
  try {
    const query = "select * from tickettype";
    const get_all_tickets = await pool.query(query);
    res.json(get_all_tickets.rows);
  } catch (error) {
    console.error(error);
  }
});

// Set which tickets can be sold for an event
app.post("/api/set-tickets", async (req, res) => {
  try {
    let body = req.body;
    const values = [body.event_instance_id, body.ticket_type];
    const query =
      "insert into linkedtickets (event_instance_id, type) values ($1, $2)";
    const set_tickets = await pool.query(query, values);
    res.json(set_tickets);
  } catch (error) {
    console.error(error);
  }
});

// Get list of which tickets can be purchased for the show along with its prices
app.get("/api/show-tickets", async (req, res) => {
  try {
    const query = `SELECT ev.id as event_id, ei.id as event_instance_id, eventname, eventdescription, eventdate, starttime, totalseats, availableseats, price, concessions
              FROM events ev
                  LEFT JOIN event_instances ei ON ev.id=ei.eventid
                  JOIN linkedtickets lt ON lt.event_instance_id=ei.id
                  JOIN tickettype tt ON lt.ticket_type=tt.id
              WHERE ev.id=$1 AND isseason=false;`;
    const values = [req.query.event];
    const available_tickets = await pool.query(query, values);
    res.json(available_tickets);
    console.log(available_tickets.rows);
    return available_tickets.rows;
  } catch (error) {
    console.error(error);
  }
});

// Responds with tickets subset of Redux state
app.get("/api/tickets", async (req, res) => {
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
    const query_res = await pool.query(qs);
    res.json(
      query_res.rows
        .map(ticketUtils.toTicket)
        .reduce(ticketUtils.reduceToTicketState, {
          byId: {},
          allIds: [],
        } as TicketsState)
    );
    console.log("# tickets:", query_res.rowCount);
  } catch (err) {
    console.error(err.message);
  }
});
