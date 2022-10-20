import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {
  getDiscountCodes,
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
 * route: GET /count
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
      const code = oldCode.status.success ? 200 : 404;
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
      const code = oldCode.status.success ? 200 : 404;
      res.status(code).send(oldCode);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
});
