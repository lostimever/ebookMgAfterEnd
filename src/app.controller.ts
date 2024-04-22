/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-17 16:24:01
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-19 16:05:10
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
}
