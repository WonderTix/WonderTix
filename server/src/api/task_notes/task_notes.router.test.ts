import request from 'supertest';
import express from 'express';
import * as taskNotesService from './task_notes.service';
import {taskNotesRouter} from './task_notes.router';

const app = express();
app.use('/', taskNotesRouter);

jest.mock('./task_notes.service');

afterEach(() => {
  jest.clearAllMocks();
});

describe('test task_notes routes', function() {
  describe('/', () => {
    it('/ get pass', async () => {
      // @ts-ignore
      taskNotesService.findAll.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).get('/').send();
      expect(res.statusCode).toBe(200);
    });

    it('/ get fail', async () => {
      // @ts-ignore
      taskNotesService.findAll.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/:id', () => {
    it('/:id get pass', async () => {
      // @ts-ignore
      taskNotesService.find.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).get('/:id').send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id get fail', async () => {
      // @ts-ignore
      taskNotesService.find.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/:id').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/', () => {
    it('/ post pass', async () => {
      // @ts-ignore
      taskNotesService.create.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).post('/').send();
      expect(res.statusCode).toBe(201);
    });

    it('/ post fail', async () => {
      // @ts-ignore
      taskNotesService.create.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).post('/').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/:id', () => {
    it('/:id delete pass', async () => {
      // @ts-ignore
      taskNotesService.remove.mockImplementationOnce(() => {
        return null;
      });
      const res = await request(app).delete('/:id').send();
      expect(res.statusCode).toBe(204);
    });

    it('/:id delete fail', async () => {
      // @ts-ignore
      taskNotesService.remove.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).delete('/:id').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/:id', () => {
    it('/:id put pass', async () => {
      // @ts-ignore
      taskNotesService.update.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).put('/:id').send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id put fail', async () => {
      // @ts-ignore
      taskNotesService.update.mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await request(app).put('/:id').send();
      expect(res.statusCode).toBe(500);
    });
  });
});
