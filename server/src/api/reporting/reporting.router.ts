import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {getActiveEventSales} from './reporting.service';

export const reportingRouter = Router();

reportingRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tickets = await getActiveEventSales();
    const code = tickets.status.success ? 200 : 404;
    res.status(code).send(tickets);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
