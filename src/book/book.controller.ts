import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBookDto) {
    return this.bookService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookService.remove(+id);
  }
}
