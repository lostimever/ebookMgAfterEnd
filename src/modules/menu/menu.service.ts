/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-23 10:01:24
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-24 15:28:50
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto } from './create-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRespository: Repository<Menu>,
  ) {}
  findAll() {
    const sql = `select * , DATE_FORMAT(createTime, '%Y-%m-%d %H:%i:%s') as createTime from menu where active = 1`;
    return this.menuRespository.query(sql);
  }

  async getRoutes() {
    const routes = await this.menuRespository
      .createQueryBuilder('menu')
      .where('active = 1')
      .andWhere('status = 0')
      .orderBy('orderNo', 'ASC')
      .getMany();

    // 递归构建菜单树
    const buildMenuTree = (items, parentId = null) => {
      const result = [];
      items.forEach((item) => {
        const router = {
          id: item.id,
          path: item.routePath,
          name: item.menuName,
          meta: {
            title: item.menuName,
            icon: item.icon,
            hidden: item.show !== '0',
          },
          redirect: item.redirect,
          component: item.component,
          active: item.active === 1,
          show: item.show === '0',
          keepalive: item.keepalive === 1,
          isExt: item.isExt === '1',
        };
        if (item.parentMenu === parentId) {
          const children = buildMenuTree(items, item.id);
          if (children.length) {
            router['children'] = children;
          }
          result.push(router);
        }
      });
      return result;
    };

    return buildMenuTree(routes);
  }

  addMenu(createMenuDto: CreateMenuDto) {
    const menu = new Menu();
    menu.routePath = createMenuDto.routePath;
    menu.menuName = createMenuDto.menuName;
    menu.redirect = createMenuDto.redirect;
    menu.icon = createMenuDto.icon;
    menu.component = createMenuDto.component;
    menu.parentMenu = createMenuDto.parentMenu;
    menu.show = createMenuDto.show;
    menu.status = createMenuDto.status;
    menu.keepalive = createMenuDto.keepalive;
    menu.isExt = createMenuDto.isExt;
    menu.permission = createMenuDto.permission;
    menu.orderNo = createMenuDto.orderNo;
    menu.type = createMenuDto.type;

    console.log('🚀 ~ MenuService ~ addMenu ~ menu:', menu);
    return this.menuRespository.save(menu);
  }

  editMenu(id: number, createMenuDto: CreateMenuDto) {
    const menu = new Menu();
    menu.routePath = createMenuDto.routePath;
    menu.menuName = createMenuDto.menuName;
    menu.redirect = createMenuDto.redirect;
    menu.icon = createMenuDto.icon;
    menu.component = createMenuDto.component;
    menu.parentMenu = createMenuDto.parentMenu;
    menu.show = createMenuDto.show;
    menu.status = createMenuDto.status;
    menu.keepalive = createMenuDto.keepalive;
    menu.isExt = createMenuDto.isExt;
    menu.permission = createMenuDto.permission;
    menu.orderNo = createMenuDto.orderNo;
    menu.type = createMenuDto.type;
    return this.menuRespository.update(id, menu);
  }

  removeMenu(id: number) {
    return this.menuRespository.update(id, { active: 0 });
  }
}
