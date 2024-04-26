/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-18 14:41:05
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-26 17:16:12
 */
import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBook(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /epub|pdf|txt/ }) // 限制上传的文件类型/ epub|pdf|txt
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return {
      data: await this.bookService.uploadBook(file),
      message: '上传成功',
    };
  }

  @Post('add')
  async addBook(@Body() params) {
    return {
      data: await this.bookService.addBook(params),
      message: '添加书籍成功',
    };
  }
}
