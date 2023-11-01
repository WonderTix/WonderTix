import { Router, Request, Response } from 'express';

export const statusController = Router();
let isAppReady = false;

statusController.get('/', (req: Request, res: Response) => {
  if (req.query.setReady === 'true') {
    isAppReady = true;
    console.log('Readiness check passed');
    res.status(200).send('Application is now ready');
  } else if (isAppReady) {
    console.log('Readiness check already passed');
    res.status(400).send('Application has already confirmed readiness');
  } else {
    console.log('Readiness check failed');
    res.status(503).send('Application is not yet ready');
  }
});

