/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-18 14:40:44
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-11 17:09:08
 */
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { ContentsService } from '../contents/contents.service';
import { Contents } from '../contents/contents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Contents])],
  controllers: [BookController],
  providers: [BookService, ContentsService],
})
export class BookModule {}
