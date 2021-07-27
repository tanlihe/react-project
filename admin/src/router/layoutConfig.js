/*
 * @Descripttion: 系统界面的路由配置，基础界面 | 登录界面 | 错误界面等
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 13:35:10
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-01 19:12:50
 */
// import React from 'react';
// import Loadable from 'react-loadable';

// 暂时不用 loading，因为在加载路由时，出现一个比较难看的过渡，页面有一瞬间的闪烁，因此用一个简单的代替
// const DefineLoading = () => {
//   return <></>;
// };

// const BaseLayout = Loadable({
//   loader: () =>
//     import(
//       /* webpackChunkName: 'BaseLayout', webpackPrefetch: true */ '@/layout/base/base'
//     ),
//   loading: DefineLoading,
// });

// const LoginLayout = Loadable({
//   loader: () =>
//     import(
//       /* webpackChunkName: 'LoginLayout', webpackPrefetch: true */ '@/layout/login/login'
//     ),
//   loading: DefineLoading,
// });

// const LogoutLayout = Loadable({
//   loader: () =>
//     import(
//       /* webpackChunkName: 'LogoutLayout', webpackPrefetch: true */ '@/layout/logout/logout'
//     ),
//   loading: DefineLoading,
// });

// const NotFoundLayout = Loadable({
//   loader: () =>
//     import(
//       /* webpackChunkName: 'NotFoundLayout', webpackPrefetch: true */ '@/layout/notFound/notFound'
//     ),
//   loading: DefineLoading,
// });
import BaseLayout from '@/layout/base/base';
import LoginLayout from '@/layout/login/login';
import LogoutLayout from '@/layout/logout/logout';
import NotFoundLayout from '@/layout/notFound/notFound';

const layoutConfig = [
  {
    path: '/',
    from: '/',
    to: '/base',
    exact: true,
    redirect: true,
  },
  {
    path: '/base',
    exact: false,
    component: BaseLayout,
  },
  {
    path: '/login',
    exact: true,
    component: LoginLayout,
  },
  {
    path: '/logout',
    exact: true,
    component: LogoutLayout,
  },
  {
    path: '/notFound',
    exact: true,
    component: NotFoundLayout,
  },
  {
    path: '*',
    from: '*',
    to: '/notFound',
    exact: true,
    redirect: true,
  },
];

export default layoutConfig;
