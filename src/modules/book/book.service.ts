/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-25 16:30:36
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-11 16:33:05
 */
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { EpubBook } from './epub-book';
import { BookUploadException } from './exceptions/book-upload.exception';

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
      .leftJoinAndSelect('book.classify', 'classify')
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
    try {
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
    } catch (error) {
      console.log('🚀 ~ BookService ~ uploadBook ~ error:', error);
      throw new BookUploadException('解析上传的书籍失败，请检查文件格式或内容');
    }
  }

  async addBook(params) {
    const {
      title,
      author,
      fileName,
      category,
      cover,
      language,
      publisher,
      rootFile,
      isbn,
    } = params;

    const newBook = this.bookRespository.create({
      fileName,
      cover,
      title,
      author,
      publisher,
      bookId: fileName,
      category,
      language,
      rootFile,
      isbn,
    });

    try {
      return await this.bookRespository.save(newBook);
    } catch (error) {
      console.log('🚀 ~ BookService ~ addBook ~ error:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BookUploadException('已存在该书籍，请勿重复添加');
      }
    }
  }

  async updateBook(params) {
    const { id, title, author, category, language, publisher, isbn } = params;
    const updateParams: Partial<Book> = {};
    if (title) {
      updateParams.title = title;
    }
    if (author) {
      updateParams.author = author;
    }
    if (category) {
      updateParams.category = category;
    }
    if (language) {
      updateParams.language = language;
    }
    if (publisher) {
      updateParams.publisher = publisher;
    }
    if (isbn) {
      updateParams.isbn = isbn;
    }

    await this.bookRespository.update(id, updateParams);
    return this.bookRespository.findOne(id);
  }
}
