import {Router, Response, Request} from 'express';
import {getActiveEventSales} from './reporting.service';

export const reportingRouter = Router();

/**
 * @swagger
 *   /1/reporting:
 *   get:
 *     summary: Get all active event sales
 *     tags:
 *       - Reporting
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success: {type: boolean}
 *                     message: {type: string}
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       eventid: {type: integer}
 *                       eventname: {type: string}
 *                       sum: {type: integer}
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
 */
reportingRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tickets = await getActiveEventSales();
    const code = tickets.status.success ? 200 : 404;
    res.status(code).send(tickets);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
