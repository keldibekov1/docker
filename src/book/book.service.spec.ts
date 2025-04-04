import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = () => ({
  book: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

describe('BookService', () => {
  let service: BookService;
  let prisma: ReturnType<typeof mockPrismaService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: PrismaService, useFactory: mockPrismaService },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should create a book', async () => {
    const data = { title: 'Test Book', author: 'Tester', publishedAt: new Date() };

    prisma.book.create.mockResolvedValue(data);

    const result = await service.create(data);

    expect(result).toEqual(data);
    expect(prisma.book.create).toHaveBeenCalledWith({ data });
  });

  it('should return all books', async () => {
    const books = [{ id: 1, title: 'Book 1', author: 'Author 1', publishedAt: new Date() }];

    prisma.book.findMany.mockResolvedValue(books);

    const result = await service.findAll();

    expect(result).toEqual(books);
    expect(prisma.book.findMany).toHaveBeenCalledTimes(1);
  });

  it('should return a book by ID', async () => {
    const book = { id: 1, title: 'Test Book', author: 'Tester', publishedAt: new Date() };

    prisma.book.findUnique.mockResolvedValue(book);

    const result = await service.findOne(1);

    expect(result).toEqual(book);
    expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a book', async () => {
    const updatedData = { title: 'Updated Title', author: 'Updated Author' };
    const updatedBook = { id: 1, ...updatedData, publishedAt: new Date() };

    prisma.book.update.mockResolvedValue(updatedBook);

    const result = await service.update(1, updatedData);

    expect(result).toEqual(updatedBook);
    expect(prisma.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedData,
    });
  });

  it('should delete a book', async () => {
    const deletedBook = { id: 1, title: 'Test Book', author: 'Tester', publishedAt: new Date() };

    prisma.book.delete.mockResolvedValue(deletedBook);

    const result = await service.remove(1);

    expect(result).toEqual(deletedBook);
    expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
