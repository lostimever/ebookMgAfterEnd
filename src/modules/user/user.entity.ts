/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-18 16:21:23
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-19 16:07:34
 */
import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: string;

  @Column()
  nickname: string;

  @Column()
  active: number;
}
