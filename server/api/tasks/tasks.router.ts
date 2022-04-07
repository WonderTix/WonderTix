// api/tasks/tasks.router.ts

import { Router } from 'express';
import { findAll, find } from './tasks.service';

export const tasksRouter = Router();

// GET /api/tasks
tasksRouter.get('/', async (req, res) => {
  try {
    const tasks = await findAll(req.query);
    res.status(200).send(tasks.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/tasks/:id
tasksRouter.get('/:id', async (req, res) => {
  try {
    const task = await find(req.params.id);
    res.status(200).send(task.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
