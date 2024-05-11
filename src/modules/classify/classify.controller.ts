/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-11 10:25:30
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-11 10:45:14
 */
import { Controller, Get } from '@nestjs/common';
import { ClassifyService } from './classify.service';

@Controller('classify')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @Get('list')
  async getClassifyList() {
    return {
      data: await this.classifyService.getClassifyList(),
      message: '获取分类成功',
    };
  }
}
