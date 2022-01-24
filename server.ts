// server.ts

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { donationsRouter } from './api/donations/donations.router';
import { contactsRouter } from './api/contacts/contacts.router';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '8000');
const hostname = process.env.HOSTNAME || 'localhost';

/* Middleware */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());

// this currently allows requests from any origin
// which presents security vulenerabilities.
// make sure to only allow whitelisted domains
// when we figure out what those will be
app.use(cors(/* OPTIONS HERE */));

/* Connect Routers */

app.use('/api/donations', donationsRouter);
app.use('/api/customers', contactsRouter);

app.get('/', (req, res) => res.send('Hello World.'));

/* Server Activation */

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});
