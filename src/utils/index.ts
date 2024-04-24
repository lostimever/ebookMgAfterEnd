/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-22 15:06:15
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-24 16:45:41
 */

import { HttpStatus } from '@nestjs/common';
export function success(data, msg) {
  return {
    message: msg,
    result: data,
  };
}

export function error(err) {
  let msg = err?.response?.message || '系统异常';
  console.log('🚀 ~ error ~ err:', err);
  if (err.status === HttpStatus.UNAUTHORIZED) {
    msg = '未登录或登录失效';
  }
  return {
    code: err.status,
    message: msg,
  };
}

export function wrapperResponse(res, msg) {
  return res.then((data) => success(data, msg)).catch((err) => error(err));
}
