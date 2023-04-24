import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {
  getDiscountCodes,
  checkDiscountCode,
  addDiscountCode,
  deleteDiscountCode,
  alterDiscountCode,
} from './discounts.service';

export const discountsRouter = Router();

/**
 * @swagger
 * /discounts:
 *   get:
 *     summary: Retrieve all discount codes
 *     description: Retrieve all discounts codes available. 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of discount codes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                   example:
 *                     success: true
 *                     message: "Discount codes retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       discountid:
 *                         type: integer
 *                       code:
 *                         type: string
 *                       amount:
 *                         type: integer
 *                     example:
 *                       - discountid: 1
 *                         code: "DISCOUNT10"
 *                         amount: 10
 *       404:
 *         description: No discount codes found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Discounts
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
 * @swagger
 * /discounts/search:
 *   get:
 *     summary: Search for a discount code
 *     description: Search information given the discount code. 
 *     parameters:
 *       - in: query
 *         name: code
 *         description: Discount code to search for
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                     example:
 *                       code: "DISCOUNT10"
 *       '404':
 *         description: Discount code not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Discount code not found"
 *       '500':
 *         description: Internal server error
 *     tags:
 *       - Discounts
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
 * @swagger
 *
 * /discounts:
 *   post:
 *     summary: Create a new discount code
 *     description: Creates a new discount code. 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               amount:
 *                 type: integer
 *               percent:
 *                 type: integer
 *               startdate:
 *                 type: string
 *                 format: date-time
 *               enddate:
 *                 type: string
 *                 format: date-time
 *               tickettypeid_fk:
 *                 type: integer
 *               createdby_fk:
 *                 type: integer
 *               usagelimit:
 *                 type: integer
 *               min_tickets:
 *                 type: integer
 *               min_events:
 *                 type: integer
 *             example:
 *               code: "DISCOUNT10"
 *               amount: 10
 *               percent: 0
 *               startdate: "2023-09-15T11:30:00.000-08:00"
 *               enddate: "2023-09-22T11:30:00.000-08:00"
 *               tickettypeid_fk: 1
 *               createdby_fk: 123
 *               usagelimit: 100
 *               min_tickets: 2
 *               min_events: 1
 *     responses:
 *       '200':
 *         description: Discount code created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Discount code created successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 123
 *                     code:
 *                       type: string
 *                       example: "DISCOUNT10"
 *                     amount:
 *                       type: integer
 *                       example: 10
 *                     percent:
 *                       type: integer
 *                       example: 0
 *                     startdate:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-15T11:30:00.000-08:00"
 *                     enddate:
 *                       type: string
 *                       format: date-time
 *                       example: "22023-09-22T11:30:00.000-08:00"
 *                     tickettypeid_fk:
 *                       type: integer
 *                       example: 1
 *                     createdby_fk:
 *                       type: integer
 *                       example: 123
 *                     usagelimit:
 *                       type: integer
 *                       example: 100
 *                     min_tickets:
 *                       type: integer
 *                       example: 2
 *                     min_events:
 *                       type: integer
 *                       example: 1
 *       '404':
 *         description: Discount code not found
 *       '500':
 *         description: Internal server error
 *     tags:
 *       - Discounts
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
 * @swagger
 * /discounts/{id}:
 *   put:
 *     summary: Update a discount code's usage limit by ID
 *     description: Update the usage limit of a discount code with the ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the discount code to update.
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       description: Whether the operation was successful or not.
 *       '404':
 *         description: The discount code with the ID was not found.
 *       '500':
 *         description: Internal server error
 *     tags:
 *       - Discounts
 */
discountsRouter.put('/:id', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  try {
    const resp = await alterDiscountCode(req.params.id);
    let code = resp.status.success ? 200 : 404;
    if (code === 200 && resp.data.length === 0) {
      code = 404;
      resp.status.success = false;
    }
    res.status(code).send(resp);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
},
);


/**
 * @swagger
 * /discounts/{id}:
 *   delete:
 *     summary: Delete a discount code by ID
 *     description: Deletes a discount code given the ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the discount code to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The discount code was deleted successfully
 *       '404':
 *         description: The discount code ID was not found
 *       '500':
 *         description: Internal server error
 *     tags:
 *       - Discounts
 */
discountsRouter.delete('/:id', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  try {
    const resp = await deleteDiscountCode(req.params.id);
    let code = resp.status.success ? 200 : 404;
    if (code === 200 && resp.data.length === 0) {
      code = 404;
      resp.status.success = false;
    }
    res.status(code).send(resp);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
