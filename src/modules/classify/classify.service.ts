/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-11 10:25:39
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-11 10:35:19
 */
import { Injectable } from '@nestjs/common';
import { Classify } from './classify.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(Classify)
    private readonly repository: Repository<Classify>,
  ) {}
  getClassifyList() {
    return this.repository.find();
  }
}
