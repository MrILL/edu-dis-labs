import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PresidentsModule } from './presidents.module';
import { President } from './president.entity';

describe('Presidents', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PresidentsModule],
    }).compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('full circle of CRUD', () => {
    const newPresident = {
      name: 'Leonardo Di Caprio',
      photo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2q9tvih6sHPAEEbPoCRrWpf2IWVG5IOo5jIxqCA7dgrggsQO5',
    };

    const updatedPresident = Object.assign(newPresident, {
      name: 'Not ' + newPresident.name,
    });

    let newPresidentID;

    // create
    it('POST /api/presidents', () =>
      request(app.getHttpServer())
        .post('/api/presidents')
        .send(newPresident)
        .expect(201));

    // getAll
    it('GET /api/presidents', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/presidents')
        .expect(200);

      newPresidentID = (response.body as President[]).find(
        ({ name }) => name === newPresident.name,
      ).id;
    });

    // getOne
    it('GET /api/presidents/lastPresident', async () =>
      request(app.getHttpServer())
        .get(`/api/presidents/${newPresidentID}`)
        .expect(200));

    // update
    it('PATCH /api/presidents/lastPresident', async () => {
      await request(app.getHttpServer())
        .patch(`/api/presidents/${newPresidentID}`)
        .send(updatedPresident)
        .expect(204);

      const res = await request(app.getHttpServer()).get(
        `/api/presidents/${newPresidentID}`,
      );

      expect(res.body.name).toStrictEqual(updatedPresident.name);
    });

    it('DELETE /api/presidents/lastPresident', async () => {
      await request(app.getHttpServer())
        .delete(`/api/presidents/${newPresidentID}`)
        .expect(204);

      await request(app.getHttpServer())
        .get(`/api/presidents/${newPresidentID}`)
        .expect(404);
    });
  });
});
