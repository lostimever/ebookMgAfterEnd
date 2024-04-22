/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-18 14:30:15
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-19 16:27:49
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  getUserAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.userService.create(body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
