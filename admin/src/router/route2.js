/*
 * @Descripttion:  baseLayout 下 嵌套路由中的 route2 中的相关路由配置
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 23:36:29
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-01 19:10:29
 */
import React from 'react';
import Loadable from 'react-loadable';

// 暂时不用 loading，因为在加载路由时，出现一个比较难看的过渡，页面有一瞬间的闪烁，因此用一个简单的代替
const DefineLoading = () => {
  return <></>;
};

const Route21 = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'Route21', webpackPrefetch: true */ '@/views/nestedRoute/route21'
    ),
  loading: DefineLoading,
});

const Route22 = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'Route22', webpackPrefetch: true */ '@/views/nestedRoute/route22'
    ),
  loading: DefineLoading,
});

const route2 = [
  {
    path: '/base/nestedRoutes/route2',
    from: '/base/nestedRoutes/route2',
    to: '/base/nestedRoutes/route2/route1',
    exact: true,
    redirect: true,
  },
  // 嵌套路由内层定义 /base/nestedRoutes/route2/route1 | /base/nestedRoutes/route2/route2 对应的里层组件
  {
    path: '/base/nestedRoutes/route2/route1',
    component: Route21,
    exact: true,
  },
  {
    path: '/base/nestedRoutes/route2/route2',
    component: Route22,
    exact: true,
  },
];

export default route2;
