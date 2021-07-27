/*
 * @Descripttion: baseLayout 下 charts 图表相关路由配置
 * @version:
 * @Author: Tang
 * @Date: 2021-06-21 23:49:27
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-23 00:23:17
 */
import React from 'react';
import Loadable from 'react-loadable';

// 暂时不用 loading，因为在加载路由时，出现一个比较难看的过渡，页面有一瞬间的闪烁，因此用一个简单的代替
const DefineLoading = () => {
  return <></>;
};

const ChartBar = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ChartBar', webpackPrefetch: true */ '@/views/charts/bar/bar'
    ),
  loading: DefineLoading,
});

const ChartLine = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ChartLine', webpackPrefetch: true */ '@/views/charts/line/line'
    ),
  loading: DefineLoading,
});

const ChartPie = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ChartPie', webpackPrefetch: true */ '@/views/charts/pie/pie'
    ),
  loading: DefineLoading,
});

const charts = [
  {
    path: '/base/charts',
    from: '/base/charts',
    to: '/base/charts/bar',
    exact: true,
    redirect: true,
  },
  {
    path: '/base/charts/bar',
    component: ChartBar,
    exact: true,
  },

  {
    path: '/base/charts/line',
    component: ChartLine,
    exact: true,
  },

  {
    path: '/base/charts/pie',
    component: ChartPie,
    exact: true,
  },
];

export default charts;
