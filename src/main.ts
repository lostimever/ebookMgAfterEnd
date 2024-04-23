/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-17 16:24:01
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-22 16:03:03
 */
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  //加载 .env文件中的环境变量
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  // // 使用ConfigService来获取环境变量
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();
