/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-24 16:54:57
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 14:52:12
 */
// pino-http 配置
// https://github.com/pinojs/pino-http
import pino from 'pino';
import * as PinoHttp from 'pino-http';
import { join } from 'path';
import dayjs from 'dayjs';

export function pinoHttpOption(envDevMode = 'development'): PinoHttp.Options {
  return {
    transport:
      envDevMode !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
            },
          }
        : {
            target: 'pino-roll',
            options: {
              file: join(
                'logs',
                `log-${dayjs(Date.now()).format('YYYY-MM-DD')}.txt`,
              ),
              // 周期
              frequency: 'daily',
              mkdir: true,
            },
          },
    customAttributeKeys: {
      req: '请求信息',
      res: '响应信息',
      err: '错误信息',
      responseTime: '响应时间(ms)',
    },
    level: envDevMode !== 'production' ? 'debug' : 'info',
    customLogLevel: (req, res, err) => {
      const { statusCode } = res;
      if (statusCode >= 400 && statusCode < 500) {
        return 'warn';
      } else if (statusCode >= 500 || err) {
        return 'error';
      } else if (statusCode >= 300 && statusCode < 400) {
        return 'silent';
      }
      return 'info';
    },
    serializers: {
      req(req: {
        httpVersion: any;
        raw: { httpVersion: any; params: any; query: any; body: any };
        params: any;
        query: any;
        body: any;
      }) {
        req.httpVersion = req.raw.httpVersion;
        req.params = req.raw.params;
        req.query = req.raw.query;
        req.body = req.raw.body;
        return req;
      },
      err: pino.stdSerializers.err,
    },
  };
}
