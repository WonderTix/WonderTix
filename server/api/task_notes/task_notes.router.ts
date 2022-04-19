import { Router } from 'express';
import { findAll, find, create, remove, update }  from './task_notes.service';

export const task_notesRouter = Router();

// GET /api/task_notes
task_notesRouter.get('/', async (req, res) => {
  try {
    const task_notes = await findAll(req.query);
    res.status(200).send(task_notes.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/task_notes/:id
task_notesRouter.get('/:id', async (req, res) => {
  try {
    const task_notes = await find(req.params.id);
    res.status(200).send(task_notes.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST /api/task_notes
task_notesRouter.post('/', async (req, res) => {
  try {
    const newTask_Notes = await create(req.body);
    res.status(201).send(newTask_Notes.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/task_notes/:id
task_notesRouter.delete('/:id', async (req, res) => {
  try {
    await remove(req.params.id);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/task_notes/:id
task_notesRouter.put('/:id', async (req, res) => {
  try {
    const updatedTask_Notes = await update(req);
    res.sendStatus(204).send(updatedTask_Notes.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});