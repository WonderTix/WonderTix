import {Router} from 'express';
import {findAll, find, create, remove, update} from './task_notes.service';

export const taskNotesRouter = Router();

// GET /api/task_notes
taskNotesRouter.get('/', async (req, res) => {
  try {
    const taskNotes = await findAll(req.query);
    res.status(200).send(taskNotes.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/task_notes/:id
taskNotesRouter.get('/:id', async (req, res) => {
  try {
    const taskNotes = await find(req.params.id);
    res.status(200).send(taskNotes.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST /api/task_notes
taskNotesRouter.post('/', async (req, res) => {
  try {
    const newTaskNotes = await create(req.body);
    res.status(201).send(newTaskNotes.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/task_notes/:id
taskNotesRouter.delete('/:id', async (req, res) => {
  try {
    await remove(req.params.id);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/task_notes/:id
taskNotesRouter.put('/:id', async (req, res) => {
  try {
    const updatedTaskNotes = await update(req);
    res.sendStatus(204).send(updatedTaskNotes.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
