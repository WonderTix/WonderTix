import request from 'supertest';
import express from 'express';
import * as accountsService from './accounts.service';
import { accountsRouter } from './accounts.router';

const app = express();
app.use('/', accountsRouter);

jest.mock('./accounts.service');

afterEach(() => {
  jest.clearAllMocks();
});

describe('test routes', function () {
  describe('/', () => {
    it('responds to /', async () => {
      // @ts-ignore
      accountsService.findAll.mockImplementationOnce(() => []);
      const res = await request(app).get('/').send();
      expect(res.statusCode).toBe(200);
    });

    it('fails responds to /', async () => {
      // @ts-ignore
      accountsService.findAll.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/search', () => {
    it('responds to /search', async () => {
      // @ts-ignore
      accountsService.findByUsername.mockImplementationOnce(() => {
        return { rows: [] };
      });
      const res = await request(app).get('/search').send();
      expect(res.statusCode).toBe(200);
    });

    it('fails responds to /search', async () => {
      // @ts-ignore
      accountsService.findByUsername.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/search').send();
      expect(res.statusCode).toBe(500);
    });
  });
});

