import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/sign-in (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        username: 'admin',
        password: 'admin',
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');

    const accessToken = response.body.accessToken;

    return request(app.getHttpServer())
      .get('/professionals')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        pageNumber: 0,
        pageSize: 10,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('items');
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('pageSize');
        expect(res.body).toHaveProperty('page');
        expect(res.body).toHaveProperty('totalPages');
      });
  });
});
