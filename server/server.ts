// server.ts

import 'reflect-metadata';
import * as tq from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { context } from './context';
import { resolvers } from "./prisma/generated/type-graphql"

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { donationsRouter } from './api/donations/donations.router';
import { contactsRouter } from './api/contacts/contacts.router';
import { accountsRouter } from './api/accounts/accounts.router';
import { tasksRouter } from './api/tasks/tasks.router';
import { task_notesRouter } from './api/task_notes/task_notes.router';
import { savedReportsRouter } from './api/saved_reports/saved_reports.router';

dotenv.config({ path: path.join(__dirname, '../.env') });

const gql_app = async () => {
  const schema = await tq.buildSchema({
    resolvers, 
  })
  
  
  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log('graphql server ready at: http://localhost:4000')
  )
}

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
app.use('/api/contacts', contactsRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/task_notes', task_notesRouter);
app.use('/api/saved_reports', savedReportsRouter);

app.get('/', (req, res) => res.send('Hello World.'));

/* Server Activation */
gql_app()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});
