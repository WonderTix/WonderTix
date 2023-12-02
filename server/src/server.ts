/**
 * SERVER
 * Responsible for routing correct server
 * execution on changes of url on front end
 *
 * @param app - instantiates express instance
 * that performs URI response to client requests
 */

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import https from 'https';
import http from 'http';
import fs from 'fs';
import 'reflect-metadata';
import {accountsRouter} from './api/accounts/accounts.router';
import {contactsRouter} from './api/contacts/contacts.router';
import {donationsRouter} from './api/donations/donations.router';
import {doorlistRouter} from './api/doorlist/doorlist.router';
import {eventRouter} from './api/events/event.router';
import {newsletterRouter} from './api/newsletter/newsletter.router';
import {orderRouter} from './api/orders/order.router';
import {savedReportsRouter} from './api/saved_reports/saved_reports.router';
import {subscriptionRouter} from './api/subscriptions/subscription.router';
import {tasksRouter} from './api/tasks/tasks.router';
import {taskNotesRouter} from './api/task_notes/task_notes.router';
import {ticketRouter} from './api/tickets/ticket.router';
import {discountsRouter} from './api/discounts/discounts.router';
import {reportingRouter} from './api/reporting/reporting.router';
import {refundsRouter} from './api/refunds/refunds.router';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {ticketTypesRouter} from './api/ticket_types/ticket_types.router';
import {contactController} from './controllers/contactController';
import {userController} from './controllers/userController';
import {ticketTypeController} from './controllers/ticketTypeController';
import {taskNoteController} from './controllers/taskNoteController';
import {discountController} from './controllers/discountController';
import {donationController} from './controllers/donationController';
import {eventInstanceController} from './controllers/eventInstanceController';
import {eventController} from './controllers/eventController';
import {orderController} from './controllers/orderController';
import {orderItemController} from './controllers/orderItemController';
import {savedreportController} from './controllers/savedReportController';
import {seasonController} from './controllers/seasonController';
import {seasonTicketController} from './controllers/seasonTicketController';
import {seasonTicketTypeController} from './controllers/seasonTicketTypeController';
import {taskController} from './controllers/taskController';
import {ticketRestrictionController} from './controllers/ticketRestrictionController';
import {seasonTicketTypePriceDefaultController} from './controllers/seasonTicketTypePriceDefaultController';

const openApiSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    servers: [{
      url: process.env.ROOT_URL + '/api',
    }],
    info: {
      title: 'WonderTix API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      parameters: {
        id: {
          name: 'id',
          in: 'path',
          description: 'ID',
          schema: {
            type: 'integer',
          },
        },
        seasonid: {
          name: 'seasonid',
          in: 'path',
          description: 'Season ID',
          schema: {
            type: 'integer',
          },
        },
        tickettypeid: {
          name: 'tickettypeid',
          in: 'path',
          description: 'ticket type id',
          schema: {
            type: 'integer',
          },
        },
        updatedStatus: {
          name: 'updatedStatus',
          in: 'path',
          description: 'Updated Active status',
          schema: {
            type: 'boolean',
          },
        },
        name: {
          name: 'name',
          in: 'path',
          description: 'Item Name',
          schema: {
            type: 'string',
          },
        },
      },
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            contactid: {type: 'integer'},
            firstname: {type: 'string'},
            lastname: {type: 'string'},
            email: {type: 'string'},
            phone: {type: 'string'},
            donorbadge: {type: 'boolean'},
            seatingaccom: {type: 'string'},
            vip: {type: 'boolean'},
            volunteerlist: {type: 'string'},
            newsletter: {type: 'boolean'},
          },
        },
        Discount: {
          type: 'object',
          properties: {
            discountid: {type: 'integer'},
            code: {type: 'string'},
            amount: {type: 'integer'},
            percent: {type: 'integer'},
            startdate: {type: 'integer'},
            enddate: {type: 'integer'},
            tickettypeid_fk: {type: 'integer'},
            createdby_fk: {type: 'integer'},
            usagelimit: {type: 'integer'},
            min_tickets: {type: 'integer'},
            min_events: {type: 'integer'},
          },
        },
        Donation: {
          type: 'object',
          properties: {
            donationid: {type: 'integer'},
            contactid_fk: {type: 'integer'},
            isanonymous: {type: 'boolean'},
            amount: {type: 'number'},
            donorname: {type: 'string'},
            frequency: {type: 'string'},
            comments: {type: 'string'},
            payment_intent: {type: 'string'},
            refund_intent: {type: 'string'},
            donationdate: {type: 'integer'},
          },
        },
        Event: {
          type: 'object',
          properties: {
            eventid: {type: 'integer'},
            seasonid_fk: {type: 'integer'},
            eventname: {type: 'string'},
            eventdescription: {type: 'string'},
            active: {type: 'boolean'},
            seasonticketeligible: {type: 'boolean'},
            imageurl: {type: 'string'},
          },
        },
        EventInstance: {
          type: 'object',
          properties: {
            eventinstanceid: {type: 'integer'},
            eventid_fk: {type: 'integer'},
            eventdate: {type: 'integer'},
            eventtime: {type: 'string'},
            salesstatus: {type: 'string'},
            totalseats: {type: 'integer'},
            availableseats: {type: 'integer'},
            purchaseurl: {type: 'string'},
            ispreview: {type: 'boolean'},
            defaulttickettype: {type: 'integer'},
          },
        },
        EventTicket: {
          type: 'object',
          properties: {
            eventticketid: {type: 'integer'},
            eventinstanceid_fk: {type: 'integer'},
            tickettypeid_fk: {type: 'integer'},
            singleticket_fk: {type: 'integer'},
            redeemed: {type: 'integer'},
            redeemed_ts: {type: 'string'},
            donated: {type: 'boolean'},
          },
        },
        Order: {
          type: 'object',
          properties: {
            orderid: {type: 'integer'},
            contactid_fk: {type: 'integer'},
            orderdate: {type: 'integer'},
            checkout_sessions: {type: 'string'},
            ordertime: {type: 'string'},
            disocuntid_fk: {type: 'integer'},
            payment_intent: {type: 'string'},
            refund_intent: {type: 'string'},
            ordertotal: {type: 'number'},
          },
        },
        OrderItem: {
          type: 'object',
          properties: {
            orderitemid: {type: 'integer'},
            orderid_fk: {type: 'integer'},
            price: {type: 'number'},
          },
        },
        SavedReport: {
          type: 'object',
          properties: {
            savedreportid: {type: 'integer'},
            tablename: {type: 'string'},
            queryattr: {type: 'string'},
          },
        },
        Season: {
          type: 'object',
          properties: {
            seasonid: {type: 'integer'},
            name: {type: 'string'},
            startdate: {type: 'integer'},
            enddate: {type: 'integer'},
            imageurl: {type: 'string'},
          },
        },
        SeasonTicket: {
          type: 'object',
          properties: {
            seasonticketid: {type: 'integer'},
            orderitemid_fk: {type: 'integer'},
            eventticketid_fk: {type: 'integer'},
            eventid_fk: {type: 'integer'},
            seasontickettypeid_fk: {type: 'integer'},
            ticketwasswapped: {type: 'boolean'},
          },
        },
        SeasonTicketType: {
          type: 'object',
          properties: {
            seasontickettypeid: {type: 'integer'},
            description: {type: 'string'},
            price: {type: 'number'},
          },
        },
        SeasonTicketTypePriceDefault: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {type: 'number'},
              seasonid_fk: {type: 'number'},
              tickettypeid_fk: {type: 'number'},
              price: {type: 'number'},
              concessionprice: {type: 'number'},
            },
          },
        },
        SingleTicket: {
          type: 'object',
          properties: {
            singleticketid: {type: 'integer'},
            orderitemid_fk: {type: 'integer'},
            ticketwasswapped: {type: 'boolean'},
          },
        },
        Task: {
          type: 'object',
          properties: {
            taskid: {type: 'integer'},
            parentid_fk: {type: 'integer'},
            assignto_fk: {type: 'integer'},
            reportto_fk: {type: 'integer'},
            subject: {type: 'string'},
            description: {type: 'string'},
            status: {type: 'string'},
            datecreated: {type: 'integer'},
            dateassigned: {type: 'integer'},
            datedue: {type: 'integer'},
            ref_contact: {type: 'integer'},
            ref_donation: {type: 'integer'},
            ref_order: {type: 'integer'},
            ref_user: {type: 'integer'},
          },
        },
        TaskNote: {
          type: 'object',
          properties: {
            tasknoteid: {type: 'integer'},
            taskid_fk: {type: 'integer'},
            date: {type: 'integer'},
            notes: {type: 'string'},
          },
        },
        TicketRestriction: {
          type: 'object',
          properties: {
            concessionprice: {type: 'string'},
            description: {type: 'string'},
            eventinstanceid_fk: {type: 'integer'},
            price: {type: 'string'},
            seasontickettypepricedefaultid_fk: {type: 'integer'},
            ticketlimit: {type: 'integer'},
            ticketrestrictionsid: {type: 'integer'},
            ticketssold: {type: 'integer'},
            tickettypeid_fk: {type: 'integer'},
          },
        },
        TicketType: {
          type: 'object',
          properties: {
            tickettypeid: {type: 'integer'},
            description: {type: 'string'},
            price: {type: 'number'},
            concessions: {type: 'number'},
            deprecated: {type: 'boolean'},
          },
        },
        User: {
          type: 'object',
          properties: {
            userid: {type: 'integer'},
            username: {type: 'string'},
            is_superadmin: {type: 'boolean'},
            auth0_id: {type: 'string'},
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message from the server.',
            },
          },
        },
      },
      requestBodies: {
        CheckIn: {
          type: 'object',
          properties: {
            isCheckedIn: {type: 'boolean'},
            ticketID: {type: 'number'},
          },
        },
        Contact: {
          type: 'object',
          properties: {
            firstname: {type: 'string'},
            lastname: {type: 'string'},
            email: {type: 'string'},
            phone: {type: 'string'},
            donorbadge: {type: 'boolean'},
            seatingaccom: {type: 'string'},
            vip: {type: 'boolean'},
            volunteerlist: {type: 'string'},
            newsletter: {type: 'boolean'},
          },
        },
        Discount: {
          type: 'object',
          properties: {
            code: {type: 'string'},
            amount: {type: 'integer'},
            percent: {type: 'integer'},
            startdate: {type: 'integer'},
            enddate: {type: 'integer'},
            tickettypeid_fk: {type: 'integer'},
            createdby_fk: {type: 'integer'},
            usagelimit: {type: 'integer'},
            min_tickets: {type: 'integer'},
            min_events: {type: 'integer'},
          },
        },
        Donation: {
          type: 'object',
          properties: {
            contactid_fk: {type: 'integer'},
            isanonymous: {type: 'boolean'},
            amount: {type: 'number'},
            donorname: {type: 'string'},
            frequency: {type: 'string'},
            comments: {type: 'string'},
            payment_intent: {type: 'string'},
            refund_intent: {type: 'string'},
            donationdate: {type: 'integer'},
          },
        },
        Event: {
          type: 'object',
          properties: {
            eventid: {type: 'integer'},
            seasonid_fk: {type: 'integer'},
            eventname: {type: 'string'},
            eventdescription: {type: 'string'},
            active: {type: 'boolean'},
            seasonticketeligible: {type: 'boolean'},
            imageurl: {type: 'string'},
          },
        },
        EventInstance: {
          type: 'object',
          properties: {
            eventid_fk: {type: 'integer'},
            eventdate: {type: 'string'},
            eventtime: {type: 'string'},
            salestatus: {type: 'boolean'},
            totalseats: {type: 'integer'},
            availableseats: {type: 'integer'},
            purchaseuri: {type: 'string'},
            ispreview: {type: 'boolean'},
            defaulttickettype: {type: 'integer'},
            instanceTicketTypes: {type: 'array'},
          },
        },
        EventTicket: {
          type: 'object',
          properties: {
            eventinstanceid_fk: {type: 'integer'},
            tickettypeid_fk: {type: 'integer'},
            singleticket_fk: {type: 'integer'},
            redeemed: {type: 'integer'},
            redeemed_ts: {type: 'string'},
            donated: {type: 'boolean'},
          },
        },
        Order: {
          type: 'object',
          properties: {
            contactid_fk: {type: 'integer'},
            orderdate: {type: 'integer'},
            ordertime: {type: 'string'},
            disocuntid_fk: {type: 'integer'},
            payment_intent: {type: 'string'},
            refund_intent: {type: 'string'},
            ordertotal: {type: 'number'},
            checkout_sessions: {type: 'string'},
          },
        },
        OrderItem: {
          type: 'object',
          properties: {
            orderid_fk: {type: 'integer'},
            price: {type: 'number'},
          },
        },
        SavedReport: {
          type: 'object',
          properties: {
            tablename: {type: 'string'},
            queryattr: {type: 'string'},
          },
        },
        Season: {
          type: 'object',
          properties: {
            name: {type: 'string'},
            startdate: {type: 'integer'},
            enddate: {type: 'integer'},
            imageurl: {type: 'string'},
          },
        },
        SeasonTicket: {
          type: 'object',
          properties: {
            orderitemid_fk: {type: 'integer'},
            eventticketid_fk: {type: 'integer'},
            eventid_fk: {type: 'integer'},
            seasontickettypeid_fk: {type: 'integer'},
            ticketwasswapped: {type: 'boolean'},
          },
        },
        SeasonTicketType: {
          type: 'object',
          properties: {
            description: {type: 'string'},
            price: {type: 'number'},
          },
        },
        SeasonTicketTypePriceDefault: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              tickettypeid_fk: {type: 'number'},
              price: {type: 'number'},
              concessionprice: {type: 'number'},
            },
          },
        },
        SingleTicket: {
          type: 'object',
          properties: {
            orderitemid_fk: {type: 'integer'},
            ticketwasswapped: {type: 'boolean'},
          },
        },
        Task: {
          type: 'object',
          properties: {
            parentid_fk: {type: 'integer'},
            assignto_fk: {type: 'integer'},
            reportto_fk: {type: 'integer'},
            subject: {type: 'string'},
            description: {type: 'string'},
            status: {type: 'string'},
            datecreated: {type: 'integer'},
            dateassigned: {type: 'integer'},
            datedue: {type: 'integer'},
            ref_contact: {type: 'integer'},
            ref_donation: {type: 'integer'},
            ref_order: {type: 'integer'},
            ref_user: {type: 'integer'},
          },
        },
        TaskNote: {
          type: 'object',
          properties: {
            taskid_fk: {type: 'integer'},
            date: {type: 'integer'},
            notes: {type: 'string'},
          },
        },
        TicketRestriction: {
          type: 'object',
          properties: {
            eventinstanceid_fk: {type: 'integer'},
            tickettypeid_fk: {type: 'integer'},
            ticketlimit: {type: 'integer'},
            ticketssold: {type: 'integer'},
          },
        },
        TicketType: {
          type: 'object',
          properties: {
            tickettypeid: {type: 'integer'},
            description: {type: 'string'},
            price: {type: 'number'},
            concessions: {type: 'number'},
            deprecated: {type: 'boolean'},
          },
        },
        User: {
          type: 'object',
          properties: {
            userid: {type: 'integer'},
            username: {type: 'string'},
            is_superadmin: {type: 'boolean'},
            auth0_id: {type: 'string'},
          },
        },
      },
    },
    security: [{
      bearerAuth: ['admin'],
    }],
  },
  apis: ['./src/api/**/*.ts', './src/controllers/**/*.ts'],
});

const createServer = async () => {
  let envPath;
  if (process.env.ENV === 'local') {
    envPath = path.join(__dirname, '../../.env');
  } else if (process.env.ENV === 'dev' || process.env.ENV === 'stg' || process.env.ENV === 'prd') {
    envPath = path.join(__dirname, '../.env');
  } else {
    throw new Error('Unknown ENV value');
  }

  dotenv.config({path: envPath});


  const app = express();

  /* Middleware */
  // webhook needs raw request body
  app.use('/api/2/order/webhook', express.raw({type: 'application/json'}));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      }),
  );


  // api 1
  app.use('/api/1/donations', donationsRouter);
  app.use('/api/1/contacts', contactsRouter);
  app.use('/api/1/accounts', accountsRouter);
  app.use('/api/1/tasks', tasksRouter);
  app.use('/api/1/task_notes', taskNotesRouter);
  app.use('/api/1/saved_reports', savedReportsRouter);
  app.use('/api/1/newsletter/', newsletterRouter);
  app.use('/api/1/events', eventRouter);
  app.use('/api/1/email_subscriptions', subscriptionRouter);
  app.use('/api/1/tickets', ticketRouter);
  app.use('/api/1/ticket-types', ticketTypesRouter);
  app.use('/api/1/doorlist', doorlistRouter);
  app.use('/api/1/discounts', discountsRouter);
  app.use('/api/1/refunds', refundsRouter);
  app.use('/api/1/reporting', reportingRouter);
  app.use('/api/1/order', orderRouter);

  // api 2
  app.use('/api/2/contact', contactController);
  app.use('/api/2/discount', discountController);
  app.use('/api/2/donation', donationController);
  app.use('/api/2/events', eventController);
  app.use('/api/2/event-instance', eventInstanceController);
  app.use('/api/2/order', orderController);
  app.use('/api/2/order-item', orderItemController);
  app.use('/api/2/saved-report', savedreportController);
  app.use('/api/2/season', seasonController);
  app.use('/api/2/season-ticket', seasonTicketController);
  app.use('/api/2/season-ticket-type', seasonTicketTypeController);
  app.use('/api/2/task', taskController);
  app.use('/api/2/task-note', taskNoteController);
  app.use('/api/2/ticket-restriction', ticketRestrictionController);
  app.use('/api/2/ticket-type', ticketTypeController);
  app.use('/api/2/user', userController);
  app.use('/api/2/season-ticket-type-price-default', seasonTicketTypePriceDefaultController);

  // other
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
  app.get('/', (_req, res) => res.redirect('/api/docs'));

  let server;

  if (process.env.ENV === 'local') {
    const privateKey = fs.readFileSync('localhost-key.pem', 'utf8');
    const certificate = fs.readFileSync('localhost.pem', 'utf8');
    const credentials = {key: privateKey, cert: certificate};
    server = https.createServer(credentials, app);
  } else {
    server = http.createServer(app);
  }

  return server;
};

createServer().then((server) => {
  const port = process.env.PORT || 8000;
  server.listen(port);
  console.log(`Listening on port ${port}`);
})
    .catch((err) => {
      console.log(err.stack);
    });
