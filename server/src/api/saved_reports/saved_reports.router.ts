import {Router} from 'express';
import {Report} from './report';
import * as ReportService from './saved_reports.service';

export const savedReportsRouter = Router();

/**
 * @swagger
 *   /saved_reports:
 *     get:
 *       summary: Get all saved reports
 *       tags:
 *         - Saved Reports
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     savedreportid: {type: integer}
 *                     tablename: {type: string}
 *                     queryattr: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *          description: Not Found
 */
savedReportsRouter.get('/', async (req, res) => {
  try {
    const reports = await ReportService.findAll();
    res.status(200).send(reports.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /saved_reports/{id}:
 *     get:
 *       summary: Get a saved report by id
 *       tags:
 *         - Saved Reports
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
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     savedreportid: {type: integer}
 *                     tablename: {type: string}
 *                     queryattr: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Not Found
 */
savedReportsRouter.get('/:id', async (req, res) => {
  try {
    const report = await ReportService.find(req.params.id);
    res.status(200).send(report.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /saved_reports/:
 *     post:
 *       summary: Create a new saved report
 *       tags:
 *         - Saved Reports
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tablename: {type: string}
 *                 query_attr: {type: string}
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     savedreportid: {type: integer}
 *                     tablename: {type: string}
 *                     queryattr: {type: string}
 *         401:
 *           description: Unauthorized
 *         404:
 *          description: Not Found
 */
savedReportsRouter.post('/', async (req, res) => {
  try {
    const report: Report = req.body;
    const newReport = await ReportService.create(report);
    res.status(201).send(newReport.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 *   /saved_reports/{id}:
 *     delete:
 *       summary: Delete a saved report by id
 *       tags:
 *         - Saved Reports
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *       responses:
 *         200:
 *           description: OK
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Not Found
 */
savedReportsRouter.delete('/:id', async (req, res) => {
  try {
    await ReportService.remove(req.params.id);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
