import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBookDto) {
    return this.prisma.book.create({ data: dto });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
