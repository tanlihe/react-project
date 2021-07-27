/*
 * @Descripttion: baseLayout 界面相关路由配置
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 13:53:09
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-23 00:26:02
 */

import charts from './charts';
import dashboard from './dashboard';
import nestedRoute1 from './nestedRoute1';
import system from './system';
import test from './test';

const baseConfig = [
  ...dashboard,
  ...charts,
  ...nestedRoute1,
  ...system,
  ...test,

  // 以上均为配到时，重定向到 notFound 页面
  {
    path: '/base/*',
    from: '*',
    to: '/notFound',
    exact: true,
    redirect: true,
  },
];

export default baseConfig;
