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

discountsRouter.get('/', checkJwt, checkScopes, async (
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
discountsRouter.get('/search', async (
    req: Request,
    res: Response,
) => {
  try {
    const codes = await checkDiscountCode(req.query.code);
    const code = codes.status.success ? 200 : 404;
    res.status(code).send(codes);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
});


/**
 * route: GET /id
 *
 * @type {?}
 */
discountsRouter.get('/codeCheck', async(
    req: Request,
    res: Response,
) => {
    try{
      const codes = await checkDiscountCode(req.query.code);
      let c1 = codes.status.success ? 200 : 404;
      if(codes.status.success === true && codes.data.length === 0){
        c1 = 404;
      }
      const code = c1;
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

discountsRouter.post('/', checkJwt, checkScopes, async (
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

discountsRouter.put('/:id', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
    try {
      const resp = await alterDiscountCode(req.params.id);
      let code = resp.status.success ? 200 : 404;
      if(code === 200 && resp.data.length === 0){
        code = 404;
        resp.status.success = false;
      }
      res.status(code).send(resp);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
);


/**
 * route: PUT /
 *
 * @type {?}
 */

discountsRouter.delete('/:id', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
    try {
      const oldCode = await alterDiscountCode(req.params.id);
      let c1 = oldCode.status.success ? 200 : 404;
      if(oldCode.status.success === true && oldCode.data.length === 0){
        c1 = 404;
      }
      const code = c1;
      res.status(code).send(oldCode);
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
      let c1 = oldCode.status.success ? 200 : 404;
      if(oldCode.status.success === true && oldCode.data.length === 0){
        c1 = 404;
      }
      const code = c1;
      res.status(code).send(oldCode);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
});
