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
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import {resolveRefs} from 'json-refs';


/**
 * Return JSON object. Source: https://github.com/chuve/swagger-multi-file-spec
 * @param {array | object} root
 * @returns {Promise.<JSON>}
 */
const multiFileSwagger = (root: any) => {
  const options = {
    filter: ["relative", "remote"],
    loaderOptions: {
      processContent: function (res: any, callback: any) {
        callback(null, yamljs.parse(res.text));
      },
    },
  };

  return resolveRefs(root, options).then(
    function (results: any) {
      console.log(results);
      return results.resolved;
    },
    function (err: any) {
      console.log(err.stack);
    }
  );
};

const createServer = async () => {
  dotenv.config({path: path.join(__dirname, '../../.env')});

  const app = express();
  const hostname = process.env.HOSTNAME || 'localhost';


  // const stripeKey = process.env.PRIVATE_STRIPE_KEY ?
  //   process.env.PRIVATE_STRIPE_KEY : '';

  // const stripe = new Stripe(stripeKey, {
  //   apiVersion: '2020-08-27',
  // });


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


  /* Connect Routers */

  app.use('/api/donations', donationsRouter);
  app.use('/api/contacts', contactsRouter);
  app.use('/api/accounts', accountsRouter);
  app.use('/api/tasks', tasksRouter);
  app.use('/api/task_notes', taskNotesRouter);
  app.use('/api/saved_reports', savedReportsRouter);
  app.use('/api/newsletter/', newsletterRouter);
  app.use('/api/events', eventRouter);
  app.use('/api/email_subscriptions', subscriptionRouter);
  app.use('/api/tickets', ticketRouter);
  app.use('/api/doorlist', doorlistRouter);
  app.use('/api/discounts', discountsRouter);
  app.use('/webhook', orderRouter);

  app.get('/', (_req, res) => res.send('Hello World.'));

  const swaggerDocument = await multiFileSwagger(
    yamljs.load(path.resolve(__dirname, "./schema/test.yaml"))
  );

  console.log(swaggerDocument);

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return https
      .createServer(
          {
            key: fs.readFileSync(
                path.join(__dirname, '../localhost-key.pem'),
            ),
            cert: fs.readFileSync(path.join(__dirname, '../localhost.pem')),
          }, app);

}

createServer().then((server) => {
  const port = 8000;
  server.listen(port);
  console.log(`Listening on port ${port}`);
})
.catch((err) => {
  console.log(err.stack);
});
