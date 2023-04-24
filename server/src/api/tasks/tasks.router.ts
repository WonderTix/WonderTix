import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {createTask,
  findTask,
  getAllTasks,
  removeTask,
  updateTask} from './tasks.service';

export const tasksRouter = Router();

tasksRouter.use(checkJwt);
tasksRouter.use(checkScopes);

/**
 * @swagger
 *   /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success: {type: boolean}
 *                     message: {type: string}
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       taskid: {type: integer}
 *                       parentid_fk: {type: integer}
 *                       assignedto_fk: {type: integer}
 *                       reportto_fk: {type: integer}
 *                       subject: {type: string}
 *                       description: {type: string}
 *                       status:
 *                         type: enum
 *                         enum: [not_started, in_progress, completed]
 *                       datecreated: {type: integer}
 *                       dateassigned: {type: integer}
 *                       datedue: {type: string}
 *                       ref_contact: {type: integer}
 *                       ref_donation: {type: integer}
 *                       ref_order: {type: integer}
 *                       ref_user: {type: integer}
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
 */
tasksRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    const code = tasks.status.success ? 200 : 404;
    res.status(code).send(tasks);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /api/tasks/{id}:
 *   get:
 *     summary: Get all tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success: {type: boolean}
 *                     message: {type: string}
 *                 data:
 *                   type: object
 *                   properties:
 *                     taskid: {type: integer}
 *                     parentid_fk: {type: integer}
 *                     assignto_fk: {type: integer}
 *                     reportto_fk: {type: integer}
 *                     subject: {type: string}
 *                     description: {type: string}
 *                     status:
 *                       type: enum
 *                       enum: [not_started, in_progress, completed]
 *                     datecreated: {type: string}
 *                     dateassigned: {type: string}
 *                     datedue: {type: string}
 *                     ref_contact: {type: integer}
 *                     ref_donation: {type: integer}
 *                     ref_order: {type: integer}
 *                     ref_user: {type: integer}
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
 */
tasksRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await findTask(req.params.id);
    let code = task.status.success ? 200 : 404;
    if (code === 200 && task.data.length === 0) {
      code = 404;
      task.status.success = false;
    }
    res.status(code).send(task);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /api/tasks:
 *   post:
 *     summary: Get all tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                parentid: {type: integer}
 *                subject: {type: string}
 *                description: {type: string}
 *                status:
 *                  type: enum
 *                  enum: [not_started, in_progress, completed]
 *                assignto: {type: integer}
 *                reportto: {type: integer}
 *                datecreated: {type: integer}
 *                dateassigned: {type: integer}
 *                duedate: {type: integer}
 *                ref_contact: {type: integer}
 *                ref_donation: {type: integer}
 *                ref_ticket_order: {type: integer}
 *                ref_user: {type: integer}
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
 */
tasksRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newTask = await createTask(req.body);
    const code = newTask.status.success ? 200 : 404;
    res.status(code).send(newTask);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
 */
tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removeStatus = await removeTask(req.params.id);
    res.sendStatus(removeStatus.status.success ? 200 : 404);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                parentid: {type: integer}
 *                subject: {type: string}
 *                description: {type: string}
 *                status:
 *                  type: enum
 *                  enum: [not_started, in_progress, completed]
 *                assignto: {type: integer}
 *                reportto: {type: integer}
 *                datecreated: {type: integer}
 *                dateassigned: {type: integer}
 *                datedue: {type: integer}
 *                ref_contact: {type: integer}
 *                ref_donation: {type: integer}
 *                ref_ticket_order: {type: integer}
 *                ref_user: {type: integer}
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
 */
tasksRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedTask = await updateTask(req);
    let code = updatedTask.status.success ? 200 : 404;
    if (code === 200 && updatedTask.data.length === 0) {
      code = 404;
      updatedTask.status.success = false;
    }
    res.status(code).send(updatedTask);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
