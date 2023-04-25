import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {initRefund} from './refunds.service';

export const refundsRouter = Router();

/**
 * @swagger
 *  /api/refunds:
 *    post:
 *      summary: Create refund
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                refMode: {type: integer}
 *                id: {type: integer}
 *                amount: {type: number}
 *            example:
 *              refMode: 1
 *              id: 1
 *              amount: 0.0
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data: {type: object}
 *                  status:
 *                    type: object
 *                    properties:
 *                      success: {type: boolean}
 *                      message: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
refundsRouter.post('/', checkJwt, checkScopes, async (
    req:Request,
    res:Response,
) => {
  try {
    // Pass donation/order, donationid/orderid, amount/ordertotal (default 0.0 -> full refund)
    const codes = await initRefund(req.body.refMode, req.body.id, req.body.amount);
    const code = codes.status.success ? 200 : 404;
    res.status(code).send(codes);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
},
);
