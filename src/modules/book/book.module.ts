/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-18 14:40:44
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 16:36:01
 */
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
