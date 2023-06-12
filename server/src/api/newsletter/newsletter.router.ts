import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {updateNewsletter,
  getNewsletterCount,
  insertNewsletter} from './newsletter.service';

export const newsletterRouter = Router();

/**
 * @swagger
 *   /1/newsletter/count:
 *     get:
 *       summary: get newsletter count by email
 *       tags:
 *         - Newsletter
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: email
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         email: {type: string}
 *                   status:
 *                     type: object
 *                     properties:
 *                       success: {type: boolean}
 *                       message: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Not Found
 */
newsletterRouter.get('/count', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  try {
    const emails = await getNewsletterCount(req.query);
    const code = emails.status.success ? 200 : 404;
    res.status(code).send(emails);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 *   /1/newsletter/:
 *     put:
 *       summary: update newsletter by email
 *       tags:
 *         - Newsletter
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email: {type: string}
 *                 news_opt: {type: boolean}
 *                 volunteer_opt: {type: boolean}
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data: {type: array}
 *                   status:
 *                     type: object
 *                     properties:
 *                       success: {type: boolean}
 *                       message: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Not Found
 */
newsletterRouter.put('/', async (req: Request, res: Response) => {
  try {
    const newsLetterResp = await updateNewsletter(req.body);
    const code = newsLetterResp.status.success ? 200 : 404;
    res.status(code).send(newsLetterResp);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});


/**
 * @swagger
 *   /1/newsletter/:
 *     post:
 *       summary: Create newsletter
 *       tags:
 *         - Newsletter
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstname: {type: string}
 *                 lastname: {type: string}
 *                 email: {type: string}
 *                 phone: {type: string}
 *                 address: {type: string}
 *                 news_opt: {type: boolean}
 *                 volunteer_opt: {type: boolean}
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data: {type: array}
 *                   status:
 *                     type: object
 *                     properties:
 *                       success: {type: boolean}
 *                       message: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Not Found
 */
newsletterRouter.post('/', async (req: Request, res: Response) => {
  try {
    const insert = await insertNewsletter(req.body);
    const code = insert.status.success ? 200 : 404;
    res.status(code).send(insert);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
