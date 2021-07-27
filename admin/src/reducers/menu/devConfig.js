/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-04 14:41:14
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-16 00:47:10
 */
const devConfig = [
  {
    path: '/base/components',
    title: '组件',
    nodeId: 'COMPOPNENT',
    children: [
      {
        path: '/base/components/antd',
        title: 'antd 二次封装',
        nodeId: 'ANTD',
        children: [
          {
            path: '/base/components/antd/button',
            title: '按钮',
            children: [],
            nodeId: 'ANTD_BUTTON',
          },
          {
            path: '/base/components/antd/tree',
            title: '树控件',
            children: [],
            nodeId: 'ANTD_TREE',
          },
        ],
      },
      {
        path: '/base/components/define',
        title: '自定义封装',
        nodeId: 'DEFINE',
        children: [
          {
            path: '/base/components/define/searchBar',
            title: '搜索栏',
            nodeId: 'SEARCH_BAR',
            children: [],
          },
        ],
      },
    ],
  },
  {
    path: '/base/test',
    title: '测试',
    children: [],
    nodeId: 'TEST',
  },
];

export default devConfig;
