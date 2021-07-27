/*
 * @Descripttion: baseLayout 下 dashboard 首页相关路由配置
 * @version:
 * @Author: Tang
 * @Date: 2021-06-21 23:51:13
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-23 00:23:41
 */
import React from 'react';
import Loadable from 'react-loadable';

// 暂时不用 loading，因为在加载路由时，出现一个比较难看的过渡，页面有一瞬间的闪烁，因此用一个简单的代替
const DefineLoading = () => {
  return <></>;
};

const Dashboard = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'Dashboard', webpackPrefetch: true */ '@/views/dashboard/dashboard'
    ),
  loading: DefineLoading,
});

const dashboard = [
  {
    path: '/base',
    from: '/base',
    to: '/base/dashboard',
    exact: true,
    redirect: true,
  },
  {
    path: '/base/dashboard',
    component: Dashboard,
    exact: true,
  },
];

export default dashboard;
