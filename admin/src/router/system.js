/*
 * @Descripttion: baseLayout 下 system 系统相关路由配置
 * @version:
 * @Author: Tang
 * @Date: 2021-06-23 00:59:44
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-26 00:30:34
 */
import React from 'react';
import Loadable from 'react-loadable';

// 暂时不用 loading，因为在加载路由时，出现一个比较难看的过渡，页面有一瞬间的闪烁，因此用一个简单的代替
const DefineLoading = () => {
  return <></>;
};

const SystemMenu = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'SystemMenu', webpackPrefetch: true */ '@/views/system/menu/menu'
    ),
  loading: DefineLoading,
});

const SystemRoleMenu = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'SystemRoleMenu', webpackPrefetch: true */ '@/views/system/role/roleMenu'
    ),
  loading: DefineLoading,
});

const SystemRoleButton = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'SystemRoleButton', webpackPrefetch: true */ '@/views/system/role/roleButton'
    ),
  loading: DefineLoading,
});

const SystemUser = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'SystemUser', webpackPrefetch: true */ '@/views/system/user/user'
    ),
  loading: DefineLoading,
});

const system = [
  {
    path: '/base/system',
    from: '/base/system',
    to: '/base/system/menu',
    exact: true,
    redirect: true,
  },
  {
    path: '/base/system/menu',
    component: SystemMenu,
    exact: true,
  },
  {
    path: '/base/system/roleMenu',
    component: SystemRoleMenu,
    exact: true,
  },
  {
    path: '/base/system/roleButton',
    component: SystemRoleButton,
    exact: true,
  },
  {
    path: '/base/system/user',
    component: SystemUser,
    exact: true,
  },
];

export default system;
