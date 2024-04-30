import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/orders (GET) should return 401', () => {
    return request(app.getHttpServer()).get('/orders').expect(401);
  });

  it('/orders (GET) should return 200', async () => {
    const token = await app
      .get<AuthService>(AuthService)
      .signIn('john', 'changeme');
    return request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
