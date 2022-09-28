import express from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {pool} from '../db';

/*
*
* This whole file can probably be deleted and merged into customers
*
*/

/**
 * create Router
 *
 * @type {?}
 */

export const subscriptionRouter = express.Router();

/**
 * route: GET /newsletter
 *
 * @type {?}
 */

subscriptionRouter.get('/newsletter', checkJwt, checkScopes,
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

/** route: GET /volunteers
 *
 * @type {?}
 */

subscriptionRouter.get('/volunteers', checkJwt, checkScopes,
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
