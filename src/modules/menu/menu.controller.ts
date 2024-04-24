import { wrapperResponse } from 'src/utils';
import { MenuService } from './menu.service';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';

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

  @Put('update')
  editMenu(@Body() body) {
    return wrapperResponse(
      this.menuService.editMenu(body.id, body),
      '修改菜单成功',
    );
  }

  @Put('delete')
  deleteMenu(@Body() body) {
    return wrapperResponse(
      this.menuService.removeMenu(body.id),
      '删除菜单成功',
    );
  }
}
