/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-10 21:30:16
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-11 16:55:16
 */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('contents')
export class Contents {
  @PrimaryColumn()
  fileName: string;

  @Column()
  id: string;

  @Column()
  href: string;

  @Column()
  order: number;

  @Column()
  level: number;

  @Column()
  text: string;

  @Column()
  label: string;

  @Column()
  pid: number;

  @PrimaryColumn()
  @Column()
  navId: string;
}
