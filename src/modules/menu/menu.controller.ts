/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-23 10:01:41
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 15:31:55
 */
import { MenuService } from './menu.service';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('all')
  async getAllMenus() {
    return {
      message: '获取菜单成功',
      data: await this.menuService.findAll(),
    };
  }

  @Get('routers')
  async getRoutes() {
    return {
      data: await this.menuService.getRoutes(),
      message: '获取路由成功',
    };
  }

  @Post('add')
  async addMenu(@Body() body) {
    return {
      message: '添加菜单成功',
      data: await this.menuService.addMenu(body),
    };
  }

  @Put('update')
  async editMenu(@Body() body) {
    return {
      data: await this.menuService.editMenu(body.id, body),
      message: '修改菜单成功',
    };
  }

  @Put('delete')
  async deleteMenu(@Body() body) {
    return {
      message: '删除菜单成功',
      data: await this.menuService.removeMenu(body.id),
    };
  }
}
