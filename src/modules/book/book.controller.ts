/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-18 14:41:05
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-10 17:28:08
 */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookParsingException } from './exceptions/book-parsing.exception';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  async getBookList(@Query() params) {
    try {
      const data = await this.bookService.getBookList(params);

      return {
        data,
        message: '获取书籍列表成功',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: '获取书籍列表失败',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBook(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /epub|pdf|txt/ }) // 限制上传的文件类型/ epub|pdf|txt
        .build({
          exceptionFactory: (errors) => {
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                message: '文件类型不正确，请上传 epub、pdf 或 txt 格式文件',
                errors,
              },
              HttpStatus.BAD_REQUEST,
            );
          },
        }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const data = await this.bookService.uploadBook(file);
      return {
        data,
        message: '上传成功',
      };
    } catch (error) {
      if (error instanceof BookParsingException) {
        throw error;
      }

      throw new HttpException(
        {
          message: '上传书籍失败',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('add')
  async addBook(@Body() params) {
    return {
      data: await this.bookService.addBook(params),
      message: '添加书籍成功',
    };
  }
}
