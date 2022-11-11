// api/tasks/tasks.router.ts

import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {createTask,
        findTask,
        getAllTasks,
        removeTask,
        updateTask} from './tasks.service';

export const tasksRouter = Router();

// ALL PRIVATE

tasksRouter.use(checkJwt);
tasksRouter.use(checkScopes);

// GET /api/tasks
tasksRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    const code = tasks.status.success ? 200 : 404;
    res.status(code).send(tasks);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/tasks/:id
tasksRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await findTask(req.params.id);
    let tempc = task.status.success ? 200 : 404;
    if(tempc === 200 && task.data.length === 0){
      tempc = 404;
      task.status.success = false;
    }
    const code = tempc;
    res.status(code).send(task);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST /api/tasks
tasksRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newTask = await createTask(req.body);
    const code = newTask.status.success ? 200 : 404;
    res.status(code).send(newTask);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/tasks/:id
tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removeStatus = await removeTask(req.params.id);
    let tempc = removeStatus.status.success ? 200 : 404;
    if(tempc === 200 && removeStatus.data.length === 0){
      tempc = 404;
      removeStatus.status.success = false;
    }
    const code = tempc;
    res.sendStatus(code);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/tasks/:id
tasksRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedTask = await updateTask(req);
    let tempc = updatedTask.status.success ? 200 : 404;
    if(tempc === 200 && updatedTask.data.length === 0){
      tempc = 404;
      updatedTask.status.success = false;
    }
    const code = tempc;
    res.status(code).send(updatedTask);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
