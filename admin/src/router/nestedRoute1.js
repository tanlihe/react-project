/*
 * @Descripttion:  baseLayout 下 nestedRoutes 嵌套路由相关路由配置
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 23:36:29
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-23 00:24:37
 */
import React from 'react';
import Loadable from 'react-loadable';

// 暂时不用 loading，因为在加载路由时，出现一个比较难看的过渡，页面有一瞬间的闪烁，因此用一个简单的代替
const DefineLoading = () => {
  return <></>;
};

const Route1 = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'Route1', webpackPrefetch: true */ '@/views/nestedRoute/route1'
    ),
  loading: DefineLoading,
});

const Route2 = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'Route2', webpackPrefetch: true */ '@/views/nestedRoute/route2'
    ),
  loading: DefineLoading,
});

const nestedRoute1 = [
  {
    path: '/base/nestedRoutes',
    from: '/base/nestedRoutes',
    to: '/base/nestedRoutes/route1',
    exact: true,
    redirect: true,
  },
  {
    path: '/base/nestedRoutes/route1',
    component: Route1,
    exact: true,
  },
  {
    path: '/base/nestedRoutes/route2',
    component: Route2,
    exact: true,
  },
  // 嵌套路由外层定义 /base/nestedRoutes/route2/route1 对应的外层组件
  {
    path: '/base/nestedRoutes/route2/route1',
    component: Route2,
    exact: true,
  },
  {
    path: '/base/nestedRoutes/route2/route2',
    component: Route2,
    exact: true,
  },
];

export default nestedRoute1;
