/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-17 16:24:01
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 14:04:22
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { MenuModule } from './modules/menu/menu.module';
import dataBaseConfig from './config/dataBaseConfig';
import { pinoHttpOption } from './exception/pinoHttpOption';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: { ...pinoHttpOption(config.get('NODE_ENV')) },
        };
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.', `.env.${process.env.NODE_ENV}`],
      load: [dataBaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        // logging: true,
        // synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    BookModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const nodeEnv = this.configService.get<string>('DB_NAME');
    console.log('DB_NAME:', nodeEnv);
  }
}
