import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [PrismaModule, BookModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
