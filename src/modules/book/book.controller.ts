/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-18 14:41:05
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 16:54:58
 */
import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  async getBookList(@Query() params) {
    return {
      data: await this.bookService.getBookList(params),
      message: '获取书籍列表成功',
    };
  }
}
