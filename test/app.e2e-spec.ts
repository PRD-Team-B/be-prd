import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { ExceptionFilterGen } from '../src/global/filter/custom-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    const httpAdapterHost = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionFilterGen(httpAdapterHost));

    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close()
  })

  test('test GET /products/1 expect 200', async () => {
    await request(server).get('/products/1').expect(200);
  });

  test('test GET /products/1 expect 404 product not found', async () => {
    await request(server).get('/products/12').expect(404);
  })
});
