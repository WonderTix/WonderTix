import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {updateNewsletter,
        getNewsletterCount,
        insertNewsletter} from './newsletter.service';

/**
 * create Router object
 *
 * @type {?}
 */

export const newsletterRouter = Router();

/**
 * route: GET /count
 *
 * @type {?}
 */

// News Letter Route
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
 * route: PUT /
 *
 * @type {?}
 */

// Nesletter Route
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
 * route: POST /
 *
 * @type {?}
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
