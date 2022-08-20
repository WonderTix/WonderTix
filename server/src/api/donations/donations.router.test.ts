import request from 'supertest';
import express from 'express';
import {getToken} from '../../testSetup';
import * as donationsService from './donations.service';
import {donationsRouter} from './donations.router';

const app = express();
app.use('/', donationsRouter);

jest.mock('./donations.service');

afterEach(() => {
  jest.clearAllMocks();
});

describe('test donations routes', function() {
  describe('/', () => {
    it('/ get pass', async () => {
      // @ts-ignore
      donationsService.findAll.mockImplementationOnce(() => {
        return {data: [], status: {success: true, message: ''}};
      });
      const res = await request(app).get('/')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/ get fail', async () => {
      // @ts-ignore
      donationsService.findAll.mockImplementationOnce(() => {
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
      donationsService.findByName.mockImplementationOnce(() => {
        return {data: [], status: {success: true, message: ''}};
      });
      const res = await request(app).get('/search')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/search get fail', async () => {
      // @ts-ignore
      donationsService.findByName.mockImplementationOnce(() => {
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
      donationsService.find.mockImplementationOnce(() => {
        return {data: [], status: {success: true, message: ''}};
      });
      const res = await request(app).get('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id get fail', async () => {
      // @ts-ignore
      donationsService.find.mockImplementationOnce(() => {
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
      donationsService.create.mockImplementationOnce(() => {
        return {data: [], status: {success: true, message: ''}};
      });
      const res = await request(app).post('/')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/ post fail', async () => {
      // @ts-ignore
      donationsService.create.mockImplementationOnce(() => {
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
      donationsService.remove.mockImplementationOnce(() => {
        return {data: [], status: {success: true, message: ''}};
      });
      const res = await request(app).delete('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(204);
    });

    it('/:id delete fail', async () => {
      // @ts-ignore
      donationsService.remove.mockImplementationOnce(() => {
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
      donationsService.update.mockImplementationOnce(() => {
        return {data: [], status: {success: true, message: ''}};
      });
      const res = await request(app).put('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id put fail', async () => {
      // @ts-ignore
      donationsService.update.mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await request(app).put('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect([500, 404]).toContain(res.statusCode);
    });
  });
});
