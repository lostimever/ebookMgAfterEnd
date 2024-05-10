/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-10 17:26:02
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-10 17:40:29
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class BookParsingException extends HttpException {
  constructor(message = '解析书籍时发生错误') {
    super(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
