/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-11 10:32:22
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-11 11:05:54
 */
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Book } from '../book/book.entity';

@Entity('classify')
export class Classify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['categoryName'])
  categoryName: string;

  @Column()
  remark: string;

  @OneToMany(() => Book, (book) => book.classify)
  books: Book[];
}
