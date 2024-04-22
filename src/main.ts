/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-17 16:24:01
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-18 17:16:07
 */
import { NestFactory } from '@nestjs/core';
// import { ConfigService, ConfigModule } from '@nestjs/config';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  //加载 .env文件中的环境变量
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // // 配置ConfigModule来读取.env文件
  // ConfigModule.forRoot({
  //   isGlobal: true, // 设置为全局，这样你就可以在任何模块中通过@Injectable()注入ConfigService来使用它
  //   envFilePath: [`.env.${process.env.NODE_ENV}`], // 根据NODE_ENV变量来选择.env文件
  // });

  // const configService = app.get(ConfigService);

  // // 使用ConfigService来获取环境变量
  // const port = configService.get<number>('PORT', 3000);
  // console.log('🚀 ~ bootstrap ~ port:', port);
  await app.listen(3000);
}
bootstrap();
