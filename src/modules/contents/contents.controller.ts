/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-10 21:29:43
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-10 21:50:29
 */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ContentsService } from './contents.service';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get('/list')
  getContentsList(@Query() params) {
    console.log('🚀 ~ ContentsController ~ getContentsList ~ params:', params);
  }

  @Post('/add')
  async insertContents(@Body() body) {
    try {
      return {
        data: await this.contentsService.addContents(body),
        message: '添加目录成功',
      };
    } catch (error) {
      console.log('🚀 ~ ContentsController ~ insertContents ~ error:', error);
      throw new HttpException(
        {
          message: '添加目录失败',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
