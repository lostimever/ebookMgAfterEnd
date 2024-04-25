/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-17 16:24:01
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-24 16:49:48
 */
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { Logger } from 'nestjs-pino';
import { HttpStatusSuccess } from './exception/http-sucess.filter';

async function bootstrap() {
  //加载 .env文件中的环境变量
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
    bufferLogs: true,
  });

  // nestjs-pino 取代nest logger
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalInterceptors(new HttpStatusSuccess());

  const configService = app.get(ConfigService);
  // 使用ConfigService来获取环境变量
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();
