import request from 'supertest';
import express from 'express';
import * as doorlistService from './doorlist.service';
import {doorlistRouter} from './doorlist.router';

const app = express();
app.use('/', doorlistRouter);

jest.mock('./doorlist.service');

afterEach(() => {
  jest.clearAllMocks();
});

describe('test contacts routes', function() {
  describe('/', () => {
    it('/ get pass', async () => {
      // // @ts-ignore
      // doorlistService.findAll.mockImplementationOnce(() => {
      //   return { rows: [] };
      // });
      // const res = await request(app).get('/').send();
      // expect(res.statusCode).toBe(200);
    });

    it('/ get fail', async () => {
      // // @ts-ignore
      // doorlistService.findAll.mockImplementationOnce(() => {
      //   throw new Error();
      // });

      // const res = await request(app).get('/').send();
      // expect(res.statusCode).toBe(500);
    });
  });
});
