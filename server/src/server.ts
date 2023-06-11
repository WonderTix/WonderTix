/**
 * Server
 * Responsable for routing correct server
 * execution on changes of url on front end
 *
 * @param app - instanciates express instnace
 * that is performs URI responce to client requests
 *
 *
 *
 */

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import https from 'https';
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

const openApiSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    servers: [{
      url: 'https://localhost:8000/api',
    }],
    info: {
      title: 'Wondertix API',
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
      },
    },
    security: [{
      bearerAuth: ['admin'],
    }],
  },
  apis: ['./src/api/**/*.ts', './src/controllers/**/*.ts'],
});

const createServer = async () => {
  dotenv.config({path: path.join(__dirname, '../../.env')});

  const app = express();

  /* Middleware */
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(
      cors({
        origin: 'https://localhost:3000',
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

  // other
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
  app.get('/', (_req, res) => res.redirect('/api/1/docs'));

  return https
      .createServer(
          {
            key: fs.readFileSync('/usr/app/localhost-key.pem'),
            cert: fs.readFileSync('/usr/app/localhost.pem'),
          }, app);
};

createServer().then((server) => {
  const port = 8000;
  server.listen(port);
  console.log(`Listening on port ${port}`);
})
    .catch((err) => {
      console.log(err.stack);
    });
