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
import WebSocket, {WebSocketServer} from 'ws';
import 'reflect-metadata';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {contactController} from './controllers/contactController';
import {userController} from './controllers/userController';
import {ticketTypeController} from './controllers/ticketTypeController';
import {taskNoteController} from './controllers/taskNoteController';
import {discountController} from './controllers/discountController';
import {donationController} from './controllers/donationController';
import {eventInstanceController} from './controllers/eventInstanceController';
import {eventController} from './controllers/eventController';
import {orderController} from './controllers/orderController';
import {savedreportController} from './controllers/savedReportController';
import {seasonController} from './controllers/seasonController';
import {taskController} from './controllers/taskController';
import {ticketRestrictionController} from './controllers/ticketRestrictionController';
import {seasonTicketTypePriceDefaultController} from './controllers/seasonTicketTypePriceDefaultController';
import {subscriptionController} from './controllers/susbcriptionController';

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
        subscriptionid: {
          name: 'subscriptionid',
          in: 'path',
          description: 'Subscription ID',
          schema: {
            type: 'integer',
          },
        },
        subscriptiontypeid: {
          name: 'subscriptiontypeid',
          in: 'path',
          description: 'Subscription Type ID',
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
        code: {
          name: 'code',
          in: 'path',
          description: 'Discount Code',
          schema: {
            type: 'string',
          },
        },
        customername: {
          name: 'name',
          in: 'path',
          description: 'Customer Name',
          schema: {
            type: 'string',
          },
        },
        email: {
          name: 'email',
          in: 'query',
          description: 'Customer Email',
          schema: {
            type: 'string',
          },
        },
        queryseasonid: {
          name: 'seasonid',
          in: 'query',
          description: 'Season Id',
          schema: {
            type: 'integer',
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
            address: {type: 'string'},
            city: {type: 'string'},
            state: {type: 'string'},
            country: {type: 'string'},
            postalcode: {type: 'string'},
            phone: {type: 'string'},
            donorbadge: {type: 'boolean'},
            seatingaccom: {type: 'string'},
            comments: {type: 'string'},
            vip: {type: 'boolean'},
            volunteerlist: {type: 'boolean'},
            newsletter: {type: 'boolean'},
          },
        },
        Discount: {
          type: 'object',
          properties: {
            discountid: {type: 'integer'},
            code: {type: 'string'},
            active: {type: 'boolean'},
            amount: {type: 'number'},
            percent: {type: 'integer'},
            tickettypeid_fk: {type: 'integer'},
            usagelimit: {type: 'integer'},
            min_tickets: {type: 'integer'},
            min_events: {type: 'integer'},
            deletedat: {type: 'date'},
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
            detail: {type: 'string'},
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
            feetotal: {type: 'number'},
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
        SeasonTicketTypePriceDefault: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {type: 'number'},
              seasonid_fk: {type: 'number'},
              tickettypeid_fk: {type: 'number'},
              price: {type: 'number'},
              fee: {type: 'number'},
            },
          },
        },
        SubscriptionTypes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {type: 'number'},
              name: {type: 'string'},
              description: {type: 'string'},
              previewonly: {type: 'boolean'},
              price: {type: 'number'},
            },
          },
        },
        SubscriptionType: {
          type: 'object',
          properties: {
            id: {type: 'number'},
            name: {type: 'string'},
            description: {type: 'string'},
            previewonly: {type: 'boolean'},
            price: {type: 'number'},
          },
        },
        SeasonSubscriptionTypes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              subscriptiontypeid_fk: {type: 'number'},
              subscriptionlimit: {type: 'number'},
              subscriptionssold: {type: 'number'},
              price: {type: 'number'},
              ticketlimit: {type: 'number'},
              description: {type: 'string'},
            },
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
            fee: {type: 'string'},
            description: {type: 'string'},
            eventinstanceid_fk: {type: 'integer'},
            price: {type: 'number'},
            seasontickettypepricedefaultid_fk: {type: 'number'},
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
            fee: {type: 'number'},
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
            address: {type: 'string'},
            city: {type: 'string'},
            state: {type: 'string'},
            country: {type: 'string'},
            postalcode: {type: 'string'},
            phone: {type: 'string'},
            donorbadge: {type: 'boolean'},
            seatingaccom: {type: 'string'},
            comments: {type: 'string'},
            vip: {type: 'boolean'},
            volunteerlist: {type: 'string'},
            newsletter: {type: 'boolean'},
          },
        },
        Discount: {
          type: 'object',
          properties: {
            code: {type: 'string'},
            active: {type: 'boolean'},
            amount: {type: 'number'},
            percent: {type: 'integer'},
            tickettypeid_fk: {type: 'integer'},
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
            detail: {type: 'string'},
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
            feetotal: {type: 'number'},
            checkout_sessions: {type: 'string'},
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
        SeasonTicketTypePriceDefault: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              tickettypeid_fk: {type: 'number'},
              description: {type: 'string'},
              price: {type: 'number'},
              fee: {type: 'number'},
            },
          },
        },
        SeasonSubscriptionTypes: {
          type: 'object',
          properties: {
            subscriptionTypes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  subscriptiontypeid_fk: {
                    type: 'number',
                  },
                  price: {
                    type: 'number',
                  },
                  ticketlimit: {
                    type: 'number',
                  },
                  subscriptionlimit: {
                    type: 'number',
                  },
                },
              },
            },
          },
        },
        SubscriptionType: {
          type: 'object',
          properties: {
            previewonly: {type: 'boolean'},
            price: {type: 'number'},
            description: {type: 'string'},
            name: {type: 'string'},
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
            description: {type: 'string'},
            price: {type: 'number'},
            fee: {type: 'number'},
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


// eslint-disable-next-line require-jsdoc
function waitForOpenConnection(socket: any) {
  return new Promise((resolve, reject) => {
    const maxNumberOfAttempts = 50;
    const intervalTime = 200; // ms

    let currentAttempt = 0;
    const interval = setInterval(() => {
      if (currentAttempt > maxNumberOfAttempts - 1) {
        clearInterval(interval);
        reject(new Error('Maximum number of attempts exceeded'));
      } else if (socket.readyState === WebSocket.OPEN) {
        clearInterval(interval);
        resolve('Socket Open');
      } else if (socket.readyState === WebSocket.CLOSING) {
        socket.close(); // force close
        clearInterval(interval);
        reject(new Error('Socket closing'));
      }
      currentAttempt++;
    }, intervalTime);
  });
}

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

  // api 2
  app.use('/api/2/contact', contactController);
  app.use('/api/2/discount', discountController);
  app.use('/api/2/donation', donationController);
  app.use('/api/2/events', eventController);
  app.use('/api/2/event-instance', eventInstanceController);
  app.use('/api/2/order', orderController);
  app.use('/api/2/saved-report', savedreportController);
  app.use('/api/2/season', seasonController);
  app.use('/api/2/task', taskController);
  app.use('/api/2/task-note', taskNoteController);
  app.use('/api/2/ticket-restriction', ticketRestrictionController);
  app.use('/api/2/ticket-type', ticketTypeController);
  app.use('/api/2/user', userController);
  app.use('/api/2/season-ticket-type-price-default', seasonTicketTypePriceDefaultController);
  app.use('/api/2/subscription-types/', subscriptionController);

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

  const wss = new WebSocketServer({server: server});

  // Whenever a websocket sends a message, the server sends it to every
  // other websocket. All messages should include a 'messageType' string field
  // so that receiving websockets can tell whether they care about the message.

  // Based on the client broadcast example from the library
  // https://www.npmjs.com/package/ws#server-broadcast
  wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (data, isBinary) => {
      wss.clients.forEach((client) => {
        if (client !== ws) {
          waitForOpenConnection(client).then(() => {
            client.send(data, {binary: isBinary});
          }).catch((error) => {
            console.error(error.message);
          });
        }
      });
    });
  });

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
