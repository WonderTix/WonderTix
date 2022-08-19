import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {updateNewsletter, getNewsletterCount, insertNewsletter} from './newletter.service';

export const newsletterRouter = Router();

// News Letter Route
newsletterRouter.get('/count', checkJwt, checkScopes, async (req: Request, res: Response) => {
  try {
    const emails = await getNewsletterCount(req.query);
    let code = emails.status.success ? 200 : 404;
    res.status(code).send(emails);
  } catch (error: any) {
    res.status(500).send(error.message)
  }
});

// Nesletter Route
newsletterRouter.put('/', async (req: Request, res: Response) => {
  try {
    const newsLetterResp = await updateNewsletter(req.body);
    const code = newsLetterResp.status.success ? 200 : 404;
    res.status(code).send(newsLetterResp);
  } catch (error: any) {
    res.status(500).send(error.message)
  }
});

newsletterRouter.post('/', async (req: Request, res: Response) => {
  try {
    const insert = await insertNewsletter(req.body)
    const code = insert.status.success ? 200 : 404;
    res.status(code).send(insert);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
