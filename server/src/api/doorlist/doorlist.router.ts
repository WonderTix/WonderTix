import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {getDoorlist} from './doorlist.service';

export const doorlistRouter = Router();

/**
 * @swagger
 * /1/doorlist:
 *   get:
 *     summary: Get doorlist
 *     parameters:
 *       - name: eventinstanceid
 *         in: query
 *         description: used to identify different occurences of events
 *         schema:
 *           type: integer
 *     tags:
 *       - Doorlist
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
 *                       contactid: {type: integer}
 *                       firstname: {type: string}
 *                       lastname: {type: string}
 *                       vip: {type: boolean}
 *                       donorbadge: {type: string}
 *                       seatingaccom: {type: string}
 *                       eventid: {type: integer}
 *                       eventname: {type: string}
 *                       eventinstanceid: {type: integer}
 *                       eventdate: {type: string}
 *                       eventtime: {type: string}
 *                       tickets: {type: integer}
 *                       redeemed: {type: integer}
 *       401:
 *         description: Unauthorized
 */
doorlistRouter.get('/', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  try {
    const doorlist = await getDoorlist(req.query);
    const code = doorlist.status.success ? 200 : 404;
    res.status(code).send(doorlist);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

