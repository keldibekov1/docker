import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  let bookId: number;

  it('POST /books', async () => {
    const bookData = { name: 'Test Book', price: 1000 };

    const response = await request(app.getHttpServer())
      .post('/books')
      .send(bookData)
      .expect(201);

    expect(response.body).toMatchObject(bookData);
    expect(response.body.id).toBeDefined();
    bookId = response.body.id;
  });


  it('GET /books/:id', async () => {
    const response = await request(app.getHttpServer()).get(`/books/${bookId}`)

    expect(response.body).toMatchObject({ name: 'Test Book', price: 1000 });
  });

  it('PATCH /books/:id', async () => {
    const updatedData = { name: 'Updated Book', price: 1500 };

    const response = await request(app.getHttpServer())
      .patch(`/books/${bookId}`)
      .send(updatedData)
      

    expect(response.body).toMatchObject(updatedData);
  });

  it('DELETE /books/:id ', async () => {
    await request(app.getHttpServer()).delete(`/books/${bookId}`)

    await request(app.getHttpServer()).get(`/books/${bookId}`)
  });
});
