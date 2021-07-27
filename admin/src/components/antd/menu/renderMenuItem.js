/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 14:57:24
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 17:25:30
 */

import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

// 渲染导航菜单
function renderMenuItem(menuData = []) {
  return menuData.map(i => {
    return Array.isArray(i.children) && i.children.length ? (
      <SubMenu
        key={i.path}
        path={i.path}
        icon={i.icon || <AppstoreOutlined />}
        title={i.title}
        className="ban-copy"
      >
        {renderMenuItem(i.children)}
      </SubMenu>
    ) : (
      !i.isNode && (
        <Menu.Item
          key={i.path}
          path={i.path}
          icon={i.icon || <AppstoreOutlined />}
          className="ban-copy"
        >
          {i.title}
        </Menu.Item>
      )
    );
  });
}

export default renderMenuItem;
