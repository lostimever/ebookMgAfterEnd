/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-24 15:46:58
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 16:44:53
 */
import {
  Injectable,
  HttpStatus,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpStatusSuccess implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log('🚀 ~ HttpStatusSuccess ~ map ~ data:', data);
        return {
          code: HttpStatus.OK,
          message: data.message || '操作成功',
          result: data?.data,
        };
      }),
    );
  }
}
