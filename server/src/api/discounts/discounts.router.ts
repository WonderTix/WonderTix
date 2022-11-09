import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {
  getDiscountCodes,
  checkDiscountCode,
  addDiscountCode,
  deleteDiscountCode,
  alterDiscountCode,
} from './discounts.service';

/**
 * create Router object
 *
 * @type {?}
 */

export const discountsRouter = Router();

/**
 * route: GET
 *
 * @type {?}
 */

discountsRouter.get('/', checkJwt, checkScopes, async(
    req: Request,
    res: Response,
) => {
    try {
      const codes = await getDiscountCodes();
      const code = codes.status.success ? 200 : 404;
      res.status(code).send(codes);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
});


/**
 * route: GET /id
 *
 * @type {?}
 */
discountsRouter.get('/search', async(
    req: Request,
    res: Response,
) => {
    try{
      const codes = await checkDiscountCode(req.query.code);
      const code = codes.status.success ? 200 : 404;
      res.status(code).send(codes);
    } catch(error:any) {
      res.status(500).send(error.message);
    }
});


/**
 * route: POST /
 *
 * @type {?}
 */

discountsRouter.post('/', checkJwt, checkScopes, async(
    req: Request,
    res: Response,
) => {
    try {
      const newCode = await addDiscountCode(req.body);
      const code = newCode.status.success ? 200 : 404;
      res.status(code).send(newCode);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
});

/**
 * route: PUT /
 *
 * @type {?}
 */

discountsRouter.put('/:id', checkJwt, checkScopes, async(
    req: Request,
    res: Response,
) => {
    try {
      const oldCode = await alterDiscountCode(req.params.id);
      let tempc = oldCode.status.success ? 200 : 404;
      if(tempc === 200 && oldCode.data.length === 0){
        tempc = 404;
      }
      const code = tempc;
    } catch (error: any) {
      res.status(500).send(error.message);
    }
});


/**
 * route: DELETE /
 *
 * @type {?}
 */

discountsRouter.delete('/:id', checkJwt, checkScopes, async(
    req: Request,
    res: Response,
) => {
    try {
      const oldCode = await deleteDiscountCode(req.params.id);
      let tempc = oldCode.status.success ? 200 : 404;
      if(tempc === 200 && oldCode.data.length === 0){
        tempc = 404;
      }
      const code = tempc;
      res.status(code).send(oldCode);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
});
