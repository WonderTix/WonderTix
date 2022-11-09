import request from 'supertest';
import express from 'express';
import * as accountsService from './accounts.service';
import {accountsRouter} from './accounts.router';
import {getToken} from '../../testSetup';

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
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).get('/')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/ get fail', async () => {
      // @ts-ignore
      accountsService.findAll.mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await request(app).get('/')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect([500, 404]).toContain(res.statusCode);
    });
  });

  describe('/search', () => {
    it('/search get pass', async () => {
      // @ts-ignore
      accountsService.findByUsername.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).get('/search')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/search get fail', async () => {
      // @ts-ignore
      accountsService.findByUsername.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/search')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect([500, 404]).toContain(res.statusCode);
    });
  });

  describe('/:id', () => {
    it('/:id get pass', async () => {
      // @ts-ignore
      accountsService.find.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).get('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id get fail', async () => {
      // @ts-ignore
      accountsService.find.mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await request(app).get('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect([500, 404]).toContain(res.statusCode);
    });
  });

  describe('/', () => {
    it('/ post pass', async () => {
      // @ts-ignore
      accountsService.create.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).post('/')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/ post fail', async () => {
      // @ts-ignore
      accountsService.create.mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await request(app).post('/')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect([500, 404]).toContain(res.statusCode);
    });
  });

  describe('/:id', () => {
    it('/:id delete pass', async () => {
      // @ts-ignore
      accountsService.remove.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).delete('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id delete fail', async () => {
      // @ts-ignore
      accountsService.remove.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).delete('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect([500, 404]).toContain(res.statusCode);
    });
  });

  describe('/:id', () => {
    it('/:id put pass', async () => {
      // @ts-ignore
      accountsService.update.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).put('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id put fail', async () => {
      // @ts-ignore
      accountsService.update.mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await request(app).put('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect([500, 404]).toContain(res.statusCode);
    });
  });
});
