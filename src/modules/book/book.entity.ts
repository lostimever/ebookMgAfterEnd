/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-25 16:30:22
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 16:46:54
 */
import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['fileName'])
  fileName: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  bookId: string;

  @Column()
  category: number;

  @Column()
  categoryText: string;

  @Column()
  language: string;

  @Column()
  rootFile: string;

  @Column()
  createTime: Date;

  // 1-可用 0-不可用
  // @Column({ default: 1 })
  // active: number;
}
