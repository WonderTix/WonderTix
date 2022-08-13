import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {getDoorlist} from './doorlist.service';

export const doorlistRouter = Router();

// Door list route
doorlistRouter.get('/', checkJwt, checkScopes, async (req: Request, res: Response) => {
  try {
    const doorlist = await getDoorlist(req.query);
    let code = doorlist.status.success ? 200 : 404;
    res.status(code).send(doorlist)
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
