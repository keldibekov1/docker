import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let bookId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    

    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);

   
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /books', async () => {
    const response = await request(app.getHttpServer())
      .post('/books')
      .send({ title: 'Test Kitob', author: 'Test Muallif', publishedAt: new Date() })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Kitob');
    expect(response.body.author).toBe('Test Muallif');

    bookId = response.body.id; 
  });

  it('GET /books', async () => {
    const response = await request(app.getHttpServer()).get('/books').expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /books/:id ', async () => {
    const response = await request(app.getHttpServer()).get(`/books/${bookId}`).expect(200);

    expect(response.body).toHaveProperty('id', bookId);
    expect(response.body.title).toBe('Test Kitob');
  });

  it('PUT /books/:id', async () => {
    const updatedData = { title: 'Updated Kitob', author: 'Updated Muallif' };

    const response = await request(app.getHttpServer())
      .put(`/books/${bookId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.author).toBe(updatedData.author);
  });

  it('DELETE /books/:id', async () => {
    await request(app.getHttpServer()).delete(`/books/${bookId}`)

    await request(app.getHttpServer()).get(`/books/${bookId}`)
  });
});
