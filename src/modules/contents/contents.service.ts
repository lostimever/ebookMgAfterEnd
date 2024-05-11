/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-10 21:29:52
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-11 13:21:53
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from './contents.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Contents)
    private readonly contentRepository: Repository<Contents>,
  ) {}

  addContents(params) {
    const {
      fileName,
      navIds,
      hrefs,
      playOrders,
      level,
      texts,
      labels,
      pid,
      ids,
    } = params;

    // 构建参数化的值和参数
    const parameters = [];
    const values = ids
      .map((_, index) => {
        parameters.push(
          fileName,
          ids[index],
          hrefs[index],
          playOrders[index],
          level,
          `http://localhost:8089/book/${texts[index]}`,
          labels[index],
          pid,
          navIds[index],
        );
        return '(?, ?, ?, ?, ?, ?, ?, ?, ?)';
      })
      .join(', ');

    const query = `INSERT INTO contents (fileName, id, href, \`order\`, level, text, label, pid, navId) VALUES ${values}`;

    return this.contentRepository.query(query, parameters);
  }
}
