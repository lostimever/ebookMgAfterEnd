/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-25 16:30:36
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 17:27:56
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRespository: Repository<Book>,
  ) {}

  async getBookList(params) {
    const { page = 1, pageSize = 10, title = '', author = '' } = params;

    const where: string[] = ['1=1'];
    if (title) {
      where.push(`title LIKE '%${title}%'`);
    }

    if (author) {
      where.push(`author LIKE '%${author}%'`);
    }

    const [rows, total] = await this.bookRespository
      .createQueryBuilder('book')
      .where(where.join(' AND '))
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      rows,
      page,
      pageSize,
      total,
    };
  }
}
