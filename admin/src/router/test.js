/*
 * @Descripttion: baseLayout 下 test 测试相关路由配置
 * @version:
 * @Author: Tang
 * @Date: 2021-06-22 00:03:01
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-16 00:45:58
 */
import React from 'react';
import Loadable from 'react-loadable';

// 暂时不用 loading，因为在加载路由时，出现一个比较难看的过渡，页面有一瞬间的闪烁，因此用一个简单的代替
const DefineLoading = () => {
  return <></>;
};

const ButtonView = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ButtonView', webpackPrefetch: true */ '@/views/components/antd/button/button'
    ),
  loading: DefineLoading,
});

const TreeView = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'TreeView', webpackPrefetch: true */ '@/views/components/antd/tree/tree'
    ),
  loading: DefineLoading,
});

const SearchBar = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'SearchBar', webpackPrefetch: true */ '@/views/components/define/searchBar/searchBar'
    ),
  loading: DefineLoading,
});

const Test = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'Test', webpackPrefetch: true */ '@/views/test/test'
    ),
  loading: DefineLoading,
});

const antd = [
  {
    path: '/base/components/antd',
    from: '/base/components/antd',
    to: '/base/components/antd/button',
    exact: true,
    redirect: true,
  },

  {
    path: '/base/components/antd/button',
    component: ButtonView,
    exact: true,
  },

  {
    path: '/base/components/antd/tree',
    component: TreeView,
    exact: true,
  },
];

const define = [
  {
    path: '/base/components/define',
    from: '/base/components/define',
    to: '/base/components/define/searchBar',
    exact: true,
    redirect: true,
  },
  {
    path: '/base/components/define/searchBar',
    component: SearchBar,
    exact: true,
  },
];

const test = [
  {
    path: '/base/components',
    from: '/base/components',
    to: '/base/components/antd',
    exact: true,
    redirect: true,
  },
  ...antd,
  ...define,
  {
    path: '/base/test',
    component: Test,
    exact: true,
  },
];

export default test;
