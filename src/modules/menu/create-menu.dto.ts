/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-24 09:18:42
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-24 11:06:11
 */
export class CreateMenuDto {
  routePath: string;
  menuName: string;
  redirect: string;
  icon: string;
  component: string;
  parentMenu: number;
  show: string;
  keepalive: string;
  isExt: string;
  permission: string;
  orderNo: number;
  type: string;
  status: string;
}
