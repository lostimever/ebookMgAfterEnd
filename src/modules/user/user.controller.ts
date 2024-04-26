/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-18 14:30:15
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 15:30:56
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async getUserInfoByToken(@Req() requset) {
    return {
      data: await this.userService.findByUsername(requset.user.username),
      message: '获取用户信息成功',
    };
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  getUserAll() {
    return this.userService.findAll();
  }

  @Post('add')
  create(@Body() body) {
    return this.userService.create(body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
