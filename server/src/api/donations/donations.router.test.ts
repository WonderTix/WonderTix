import request from 'supertest';
import express from 'express';
import * as donationsService from './donations.service';
import {donationsRouter} from './donations.router';

const app = express();
app.use('/', donationsRouter);

jest.mock('./donations.service');

afterEach(() => {
  jest.clearAllMocks();
});

describe('test contacts routes', function() {
  describe('/', () => {
    it('/ get pass', async () => {
      // @ts-ignore
      donationsService.findAll.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).get('/').send();
      expect(res.statusCode).toBe(200);
    });

    it('/ get fail', async () => {
      // @ts-ignore
      donationsService.findAll.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/search', () => {
    it('/search get pass', async () => {
      // @ts-ignore
      donationsService.findByName.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).get('/search').send();
      expect(res.statusCode).toBe(200);
    });

    it('/search get fail', async () => {
      // @ts-ignore
      donationsService.findByName.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/search').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/:id', () => {
    it('/:id get pass', async () => {
      // @ts-ignore
      donationsService.find.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).get('/:id').send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id get fail', async () => {
      // @ts-ignore
      donationsService.find.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).get('/:id').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/', () => {
    it('/ post pass', async () => {
      // @ts-ignore
      donationsService.create.mockImplementationOnce(() => {
        return {rows: []};
      });
      const res = await request(app).post('/').send();
      expect(res.statusCode).toBe(201);
    });

    it('/ post fail', async () => {
      // @ts-ignore
      donationsService.create.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).post('/').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/:id', () => {
    it('/:id delete pass', async () => {
      // @ts-ignore
      donationsService.remove.mockImplementationOnce(() => {
        return null;
      });
      const res = await request(app).delete('/:id').send();
      expect(res.statusCode).toBe(204);
    });

    it('/:id delete fail', async () => {
      // @ts-ignore
      donationsService.remove.mockImplementationOnce(() => {
        throw new Error();
      });

      const res = await request(app).delete('/:id').send();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/:id', () => {
    it('/:id put pass', async () => {
      // @ts-ignore
      donationsService.update.mockImplementationOnce(() => {
        return {rowCount: [1]};
      });
      const res = await request(app).put('/:id').send();
      expect(res.statusCode).toBe(200);
    });

    it('/:id put error', async () => {
      // @ts-ignore
      donationsService.update.mockImplementationOnce(() => {
        return {rowCount: []};
      });
      const res = await request(app).put('/:id').send();
      expect(res.statusCode).toBe(404);
    });

    it('/:id put fail', async () => {
      // @ts-ignore
      donationsService.update.mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await request(app).put('/:id').send();
      expect(res.statusCode).toBe(500);
    });
  });
});
