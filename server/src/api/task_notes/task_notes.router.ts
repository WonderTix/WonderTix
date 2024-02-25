import {Router, Response, Request} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, find, findAll, remove, update} from './task_notes.service';

export const taskNotesRouter = Router();

taskNotesRouter.use(checkJwt);
taskNotesRouter.use(checkScopes);

/**
 * @swagger
 *   /1/task_notes:
 *     get:
 *       summary: Get all task notes
 *       tags:
 *         - Task Notes
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         taskknoteid: {type: integer}
 *                         taskid_fk: {type: integer}
 *                         date: {type: string}
 *                         notes: {type: string}
 *                   status:
 *                     type: object
 *                     properties:
 *                       success: {type: boolean}
 *                       message: {type: string}
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
 */
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

/**
 * @swagger
 *   /1/task_notes/{id}:
 *     get:
 *       summary: Get a task note
 *       tags:
 *         - Task Notes
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         taskknoteid: {type: integer}
 *                         taskid_fk: {type: integer}
 *                         date: {type: string}
 *                         notes: {type: string}
 *                   status:
 *                     type: object
 *                     properties:
 *                       success: {type: boolean}
 *                       message: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Not Found
 */
taskNotesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const taskNotes = await find(req.params.id);
    let code = taskNotes.status.success ? 200 : 404;
    if (code === 200 && taskNotes.data.length === 0) {
      code = 404;
      taskNotes.status.success = false;
    }
    res.status(code).send(taskNotes);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /1/task_notes:
 *     post:
 *       summary: Create a task note
 *       tags:
 *         - Task Notes
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskid: {type: integer}
 *                 date_created: {type: string}
 *                 notes: {type: string}
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       taskknoteid: {type: integer}
 *                       taskid_fk: {type: integer}
 *                       date: {type: string}
 *                       notes: {type: string}
 *                   status:
 *                     type: object
 *                     properties:
 *                       success: {type: boolean}
 *                       message: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Not Found
 */
taskNotesRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newTaskNotes = await create(req.body);
    const code = newTaskNotes.status.success ? 200 : 404;
    res.status(code).send(newTaskNotes);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /1/task_notes/{id}:
 *     delete:
 *       summary: Delete a task note
 *       tags:
 *         - Task Notes
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items: {type: object}
 *                   status:
 *                     type: object
 *                     properties:
 *                       success: {type: boolean}
 *                       message: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Not Found
 */
taskNotesRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const delResponse = await remove(req.params.id);
    let code = delResponse.status.success ? 200 : 404;
    if (code === 200 && delResponse.data.length === 0) {
      code = 404;
      delResponse.status.success = false;
    }
    res.status(code).send(delResponse);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /1/task_notes/{id}:
 *     put:
 *       summary: Update a task note
 *       tags:
 *         - Task Notes
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasknoteid: {type: integer}
 *                 taskid_fk: {type: integer}
 *                 date_created: {type: string}
 *                 notes: {type: string}
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         taskknoteid: {type: integer}
 *                         taskid_fk: {type: integer}
 *                         date: {type: string}
 *                         notes: {type: string}
 *                   status:
 *                     type: object
 *                     properties:
 *                       success: {type: boolean}
 *                       message: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Not Found
 */
taskNotesRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedTaskNotes = await update(req);
    let code = updatedTaskNotes.status.success ? 200 : 404;
    if (code === 200 && updatedTaskNotes.data.length === 0) {
      code = 404;
      updatedTaskNotes.status.success = false;
    }
    res.status(code).send(updatedTaskNotes);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
