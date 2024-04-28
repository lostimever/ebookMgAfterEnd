/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-25 16:30:36
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-27 14:25:57
 */
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { EpubBook } from './epub-book';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRespository: Repository<Book>,
  ) {}

  async getBookList(params) {
    const { page = 1, pageSize = 10, title = '', author = '' } = params;

    const where: string[] = ['1=1'];
    if (title) {
      where.push(`title LIKE '%${title}%'`);
    }

    if (author) {
      where.push(`author LIKE '%${author}%'`);
    }

    const [rows, total] = await this.bookRespository
      .createQueryBuilder('book')
      .where(where.join(' AND '))
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      rows,
      page,
      pageSize,
      total,
    };
  }

  async uploadBook(file: Express.Multer.File) {
    const destDir = '/usr/local/Cellar/nginx/1.25.5/www/books';
    let originalName = decodeURIComponent(file.originalname);
    originalName = originalName.replace(/\s+/g, '');
    const destPath = path.resolve(destDir, originalName);
    file.originalname = originalName;
    fs.writeFileSync(destPath, file.buffer);
    const epubBook = new EpubBook(destPath, file);
    const data = await epubBook.parseBook();
    return {
      originalName: originalName,
      mimetype: file.mimetype,
      size: file.size,
      url: `http://localhost:8089/books/${originalName}`,
      coverUrl: `http://localhost:8089/books/cover/${data.cover}`,
      dir: destDir,
      data,
    };
  }

  async addBook(params) {
    const {
      title,
      author,
      fileName,
      category,
      categoryText,
      cover,
      language,
      publisher,
      rootFile,
    } = params;
    const insertSql = `INSERT INTO book(
        fileName,
        cover,
        title,
        author,
        publisher,
        bookId,
        category,
        categoryText,
        language,
        rootFile
      ) VALUES(
        '${fileName}',
        '${cover}',
        '${title}',
        '${author}',
        '${publisher}',
        '${fileName}',
        '${category}',
        '${categoryText}',
        '${language}',
        '${rootFile}'
      )`;
    return await this.bookRespository.query(insertSql);
  }
}
