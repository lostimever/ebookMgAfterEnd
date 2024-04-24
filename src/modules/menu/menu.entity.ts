import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @Unique(['routePath'])
  routePath: string;

  @Column()
  @Unique(['menuName'])
  menuName: string;

  @Column()
  redirect: string;

  @Column()
  icon: string;

  @Column()
  // @Unique(['component'])
  component: string;

  @Column()
  parentMenu: number;

  // 1-可用 0-不可用
  @Column({ default: 1 })
  active: number;

  // 1-是 0-否
  @Column({ default: '0' })
  show: string;

  // 1-是 0-否
  @Column()
  keepalive: string;

  // 1-是 0-否
  @Column({ default: '0' })
  isExt: string;

  // 1-启用 0-禁用
  @Column({ default: '0' })
  status: string;

  @Column()
  permission: string;

  @Column()
  orderNo: number;

  // 0-目录 1-菜单 2-按钮
  @Column({ default: '0' })
  type: string;

  @Column()
  createTime: Date;

  @Column()
  updateTime: Date;
}
