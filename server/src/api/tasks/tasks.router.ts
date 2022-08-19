// api/tasks/tasks.router.ts

import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, remove, update} from './tasks.service';

export const tasksRouter = Router();

// ALL PRIVATE

tasksRouter.use(checkJwt);
tasksRouter.use(checkScopes);

// GET /api/tasks
tasksRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const tasks = await findAll();
    let code = tasks.status.success ? 200 : 404;
    res.status(code).send(tasks);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/tasks/:id
tasksRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await find(req.params.id);
    let code = task.status.success ? 200 : 404;
    res.status(code).send(task);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST /api/tasks
tasksRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newTask = await create(req.body);
    let code = newTask.status.success ? 200 : 404;
    res.status(code).send(newTask);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/tasks/:id
tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removeStatus = await remove(req.params.id);
    let code = removeStatus.status.success ? 204 : 404;
    res.sendStatus(code);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/tasks/:id
tasksRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedTask = await update(req);
    let code = updatedTask.status.success ? 200 : 404;
    res.status(code).send(updatedTask);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
