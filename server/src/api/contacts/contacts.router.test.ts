import request from 'supertest';
import express from 'express';
import * as contactsService from './contacts.service';
import {contactsRouter} from './contacts.router';
import {getToken} from '../../testSetup';

const app = express();
app.use('/', contactsRouter);

jest.mock('./contacts.service');

afterEach(() => {
  jest.clearAllMocks();
});

describe('test contacts routes', function() {
  describe('/', () => {
    it('/ get pass', async () => {
      // @ts-ignore
      contactsService.findAll.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).get('/')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/ get fail', async () => {
      // @ts-ignore
      contactsService.findAll.mockImplementationOnce(() => {
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
      contactsService.findByName.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).get('/search')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/search get fail', async () => {
      // @ts-ignore
      contactsService.findByName.mockImplementationOnce(() => {
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
      contactsService.find.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).get('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id get fail', async () => {
      // @ts-ignore
      contactsService.find.mockImplementationOnce(() => {
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
      contactsService.create.mockImplementationOnce(() => {
        return {data: [], status: {success: true, message: ''}};
      });
      const res = await request(app).post('/')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/ post fail', async () => {
      // @ts-ignore
      contactsService.create.mockImplementationOnce(() => {
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
      contactsService.remove.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).delete('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(204);
    });

    it('/:id delete fail', async () => {
      // @ts-ignore
      contactsService.remove.mockImplementationOnce(() => {
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
      contactsService.update.mockImplementationOnce(() => {
        return {data: [0], status: {success: true, message: ''}};
      });
      const res = await request(app).put('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id put fail', async () => {
      // @ts-ignore
      contactsService.update.mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await request(app).put('/:id')
          .set('Authorization', `Bearer ${getToken()}`).send();
      expect([500, 404]).toContain(res.statusCode);
    });
  });
});
