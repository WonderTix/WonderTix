import request from 'supertest';
import express from 'express';
import * as accountsService from './accounts.service';
import {accountsRouter} from './accounts.router';

const app = express();
app.use('/', accountsRouter);

jest.mock('./accounts.service');

afterEach(() => {
  jest.clearAllMocks();
});

describe('test accounts routes', function() {
  describe('/', () => {
    it('/ get pass', async () => {
      // @ts-ignore
      accountsService.findAll.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).get('/').send();
      expect(res.statusCode).toBe(200);
    });

    it('/ get fail', async () => {
      // @ts-ignore
      accountsService.findAll.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/search', () => {
    it('/search get pass', async () => {
      // @ts-ignore
      accountsService.findByUsername.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).get('/search').send();
      expect(res.statusCode).toBe(200);
    });

    it('/search get fail', async () => {
      // @ts-ignore
      accountsService.findByUsername.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/search').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/:id', () => {
    it('/:id get pass', async () => {
      // @ts-ignore
      accountsService.find.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).get('/:id').send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id get fail', async () => {
      // @ts-ignore
      accountsService.find.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/:id').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/', () => {
    it('/ post pass', async () => {
      // @ts-ignore
      accountsService.create.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).post('/').send();
      expect(res.statusCode).toBe(201);
    });

    it('/ post fail', async () => {
      // @ts-ignore
      accountsService.create.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).post('/').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/:id', () => {
    it('/:id delete pass', async () => {
      // @ts-ignore
      accountsService.remove.mockImplementationOnce(() => {
        return null;
      });
      const res = await request(app).delete('/:id').send();
      expect(res.statusCode).toBe(204);
    });

    it('/:id delete fail', async () => {
      // @ts-ignore
      accountsService.remove.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).delete('/:id').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/:id', () => {
    it('/:id put pass', async () => {
      // @ts-ignore
      accountsService.update.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).put('/:id').send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id put fail', async () => {
      // @ts-ignore
      accountsService.update.mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await request(app).put('/:id').send();
      expect(res.statusCode).toBe(500);
    });
  });
});

