/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-11 09:28:19
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-11 09:28:36
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class BookUploadException extends HttpException {
  constructor(message = '上传书籍时发生错误') {
    super(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
