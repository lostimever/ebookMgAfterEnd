/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-23 10:01:24
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-23 17:18:24
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRespository: Repository<Menu>,
  ) {}
  findAll() {
    return this.menuRespository.findBy({ active: 1 });
  }

  async getRoutes() {
    const routes = await this.menuRespository
      .createQueryBuilder('menu')
      .where('active = 1')
      .orderBy('orderNo', 'ASC')
      .getMany();

    // 递归构建菜单树
    const buildMenuTree = (items, parentId = 0) => {
      const result = [];
      items.forEach((item) => {
        const router = {
          id: item.id,
          path: item.routePath,
          name: item.menuName,
          meta: {
            title: item.menuName,
            icon: item.icon,
            hidden: item.show !== '1',
          },
          redirect: item.redirect,
          component: item.component,
          active: item.active === 1,
          show: item.show === '1',
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

    const result = buildMenuTree(routes);
    return result;
  }

  addMenu(body) {
    console.log('🚀 ~ MenuService ~ addMenu ~ body:', body);
    return '添加菜单成功';
  }
}
