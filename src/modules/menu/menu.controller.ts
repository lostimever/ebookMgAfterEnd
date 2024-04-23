import { wrapperResponse } from 'src/utils';
import { MenuService } from './menu.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('all')
  getAllMenus() {
    return wrapperResponse(this.menuService.findAll(), '获取菜单成功');
  }

  @Get('routers')
  getRoutes() {
    return wrapperResponse(this.menuService.getRoutes(), '获取路由成功');
  }

  @Post('add')
  addMenu(@Body() body) {
    return wrapperResponse(this.menuService.addMenu(body), '添加菜单成功');
  }
}
