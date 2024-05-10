/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-05-10 21:29:12
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-05-10 21:31:06
 */
import { Module } from '@nestjs/common';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contents } from './contents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contents])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
