/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-10 21:29:52
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-10 21:32:22
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from './contents.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Contents)
    private readonly repository: Repository<Contents>,
  ) {}

  addContents(params) {
    const { fileName, navId, href, order, level, text, label, pid, id } =
      params;
    const insertSql = `INSERT INTO contents(
        fileName,
        id,
        href,
        \`order\`,
        level,
        text,
        label,
        pid,
        navId
      ) VALUES(
        '${fileName}',
        '${id}',
        '${href}',
        '${order}',
        '${level}',
        '${text}',
        '${label}',
        '${pid}',
        '${navId}'
      )`;
    return this.repository.query(insertSql);
  }
}
