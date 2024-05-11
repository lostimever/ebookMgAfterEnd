/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-25 16:30:22
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-11 16:30:23
 */
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Classify } from '../classify/classify.entity';

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
  isbn: string;

  @Column()
  category: number;

  @ManyToOne(() => Classify, (classify) => classify.categoryName)
  @JoinColumn({ name: 'category' })
  classify: Classify;

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
