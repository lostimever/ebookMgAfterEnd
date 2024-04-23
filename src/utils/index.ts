/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-22 15:06:15
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-22 17:15:27
 */
export function success(data, msg) {
  return {
    code: 0,
    message: msg,
    result: data,
  };
}

export function error(msg) {
  return {
    code: -1,
    message: msg,
  };
}

export function wrapperResponse(res, msg) {
  return res
    .then((data) => success(data, msg))
    .catch((err) => error(err.message));
}
