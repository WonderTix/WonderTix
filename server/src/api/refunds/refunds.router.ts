import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {initRefund} from './refunds.service';

/**
 * create Router object
 *
 * @type {?}
 */
export const refundRouter = Router();


/**
 * route: PUT /
 *
 * @type {?}
 */
refundRouter.put('/', checkJwt, checkScopes, async(
  req:Request,
  res:Response,
) => {
    try{
      //Pass donation/order, donationid/orderid, amount/ordertotal (default 0.0 -> full refund)
      const codes = await initRefund(req.body.refMode, req.body.id, req.body.amount);
      const code = codes.status.success ? 200 : 404;
      res.status(code).send(codes);
    }catch(error: any){
      res.status(500).send(error.message);
    }
  }
);
