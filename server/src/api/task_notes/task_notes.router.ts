import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, remove, update} from './task_notes.service';

export const taskNotesRouter = Router();

// ALL PRIVATE

taskNotesRouter.use(checkJwt);
taskNotesRouter.use(checkScopes);

// GET /api/task_notes
taskNotesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const taskNotes = await findAll();
    console.log(taskNotes);
    const code = taskNotes.status.success ? 200 : 404;
    res.status(code).send(taskNotes);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/task_notes/:id
taskNotesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const taskNotes = await find(req.params.id);
    let tempc = codes.status.success ? 200 : 404;
    if(tempc === 200 && donation.data.length === 0){
      tempc = 404;
    }
    const code = tempc;
    res.status(code).send(taskNotes);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST /api/task_notes
taskNotesRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newTaskNotes = await create(req.body);
    const code = newTaskNotes.status.success ? 200 : 404;
    res.status(code).send(newTaskNotes);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/task_notes/:id
taskNotesRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const delResponse = await remove(req.params.id);
    let tempc = delResponse.status.success ? 200 : 404;
    if(tempc === 200 && delResponse.data.length === 0){
      tempc = 404;
    }
    const code = tempc;
    res.status(code).send(delResponse);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/task_notes/:id
taskNotesRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedTaskNotes = await update(req);
    let tempc = updatedTaskNotes.status.success ? 200 : 404;
    if(tempc === 200 && updatedTaskNotes.data.length === 0){
      tempc = 404;
    }
    const code = tempc;
    res.status(code).send(updatedTaskNotes);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
