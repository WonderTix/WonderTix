// api/saved_reports/saved_reports.router.ts

import { Router } from 'express';
import * as ReportService from './saved_reports.service';
import { Report } from './report';

export const savedReportsRouter = Router();

// GET /api/saved_reports
savedReportsRouter.get('/', async (req, res) => {
  try {
    const reports = await ReportService.findAll(req.query);
    res.status(200).send(reports.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/saved_reports/:id
savedReportsRouter.get('/:id', async (req, res) => {
  try {
    const report = await ReportService.find(req.params.id);
    res.status(200).send(report.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST /api/saved_reports
savedReportsRouter.post('/', async (req, res) => {
  try {
    const report: Report = req.body;
    // console.log(report);
    const newReport = await ReportService.create(report);
    res.status(201).send(newReport.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
