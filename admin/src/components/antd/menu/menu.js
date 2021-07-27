/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 14:41:31
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-10 23:33:17
 */
import React, { Component } from 'react';
import { Menu } from 'antd';

// react 路由高阶组件装饰器
import { withRouter } from 'react-router-dom';

// 渲染菜单组件
import renderMenuItem from './renderMenuItem';

// 查找当前路径的父级信息
import { findParentRoutes } from '@/utils/routes';

@withRouter // 高阶组件装饰器，在当前组件中挂载路由信息
class DefineMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultOpenKeys: [], // 组件初始化时默认展开的菜单项
      openKeys: [], // 组件展开的菜单项
      rootSubmenuKeys: [], // 一级导航菜单可展开的节点 key，用于菜单只能展开一个功能
    };
  }

  // 展开 | 收缩菜单
  onOpenChange(keys) {
    const { rootSubmenuKeys = [], openKeys = [] } = this.state;
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: keys,
      });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  // 点击子菜单，切换路由
  onClickMenuItem({ key }) {
    const {
      history,
      location: { pathname = '' },
    } = this.props;
    if (key === pathname) return;
    history.push({
      pathname: key,
    });
  }

  // 获取一级导航菜单可展开的节点 key，用于菜单只能展开一个功能
  getRootSubmenuKeys(menuData = []) {
    const rootSubmenuKeys = menuData
      .filter(i => Array.isArray(i.children))
      .map(i => i.path);

    this.setState({
      rootSubmenuKeys,
    });
  }

  componentDidMount() {
    const {
      menuData = [],
      location: { pathname = '' },
    } = this.props;

    // 获取一级导航菜单可展开的节点 key，用于菜单只能展开一个功能
    this.getRootSubmenuKeys(menuData);

    // 获取当前路由信息的父级信息
    const routeParentInfo = findParentRoutes(menuData, pathname);
    const openKeys = routeParentInfo.map(i => i.path);

    // 定义（初始化时）展开的菜单
    this.setState({
      defaultOpenKeys: openKeys,
      openKeys: openKeys,
    });
  }

  render() {
    const { openKeys = [], defaultOpenKeys = [] } = this.state;
    const {
      location: { pathname = '' },
      menuData = [],
    } = this.props;

    return (
      // 渲染菜单
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={defaultOpenKeys}
        openKeys={openKeys}
        onOpenChange={keys => this.onOpenChange(keys)}
        onClick={options => this.onClickMenuItem(options)}
      >
        {menuData.length && renderMenuItem(menuData)}
      </Menu>
    );
  }
}
export default DefineMenu;
