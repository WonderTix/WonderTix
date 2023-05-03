import express from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {pool} from '../db';

export const subscriptionRouter = express.Router();

/**
 * @swagger
 *   /email_subscriptions/newsletter:
 *   get:
 *     summary: Get emails of people who have subscribed to the newsletter
 *     tags:
 *       - Email Subscriptions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email: {type: string}
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
 */
subscriptionRouter.get('/newsletter', checkJwt, checkScopes,
    async (req, res) => {
      // going to need to use auth0 authentication middleware
      // deleted isAuthenticated function
      try {
        const emails = await pool.query(
            'Select email from contacts where newsletter = True',
        );
        res.json(emails.rows);
      } catch (err: any) {
        console.error(err.message);
      }
    },
);

/**
 * @swagger
 *   /email_subscriptions/volunteers:
 *   get:
 *     summary: Get emails of volunteers
 *     tags:
 *       - Email Subscriptions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email: {type: string}
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
 */
subscriptionRouter.get('/volunteers', checkJwt, checkScopes,
    async (req, res) => {
      try {
        const emails = await pool.query(
            'Select email from contacts where volunteerlist = True',
        );
        res.json(emails.rows);
      } catch (err: any) {
        console.error(err.message);
      }
    },
);
