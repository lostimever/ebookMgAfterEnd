/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-18 15:08:50
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-18 17:29:21
 */

export default () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
