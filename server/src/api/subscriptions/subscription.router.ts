import express from 'express';
import {pool} from '../db';

export const subscriptionRouter = express.Router();

subscriptionRouter.get('/newsletter',
    async (req, res) => {
      // going to need to use auth0 authentication middleware
      // deleted isAuthenticated function
      try {
        const emails = await pool.query(
            'Select email from customers where newsletter = True',
        );
        res.json(emails.rows);
      } catch (err: any) {
        console.error(err.message);
      }
    },
);

subscriptionRouter.get('/volunteers',
    async (req, res) => {
      try {
        const emails = await pool.query(
            'Select email from customers where "volunteer list" = True',
        );
        res.json(emails.rows);
      } catch (err: any) {
        console.error(err.message);
      }
    },
);
