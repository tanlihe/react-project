/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-11 00:16:12
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-18 18:16:21
 */

import React from 'react';
import { Menu } from 'antd';
import DropdownMenu from './dropdown';

require('./renderMenuItem.less');

const { SubMenu } = Menu;

function subMenuTitle(i, handleMenu) {
  return (
    <div className="title-wrap">
      {i.title}
      {i.icon || (
        <DropdownMenu
          className="icon"
          clickDropdownItem={key => clickDropdownItem(key, i, handleMenu)}
        />
      )}
    </div>
  );
}

function clickDropdownItem(key = '', i, handleMenu) {
  switch (key) {
    case 'create':
      handleMenu(i, 'create');
      break;
    case 'check':
      handleMenu(i, 'check');
      break;
    case 'delete':
      handleMenu(i, 'delete');
      break;
    case 'edit':
      handleMenu(i, 'edit');
      break;
    default:
      break;
  }
}

// 渲染导航菜单
function renderMenuItem(menuData = [], handleMenu = () => {}) {
  return menuData.map(i => {
    const { level = 0 } = i;
    return Array.isArray(i.children) && i.children.length ? (
      <SubMenu
        key={`${i.nodeId},${i.title}`}
        path={i.path}
        className="ban-copy menu-item"
        title={subMenuTitle(i, handleMenu)}
      >
        {renderMenuItem(i.children, handleMenu)}
      </SubMenu>
    ) : (
      <Menu.Item
        key={`${i.nodeId},${i.title}`}
        path={i.path}
        className="ban-copy menu-item"
      >
        <div className="title-wrap">
          {i.title}
          {i.icon || (
            <DropdownMenu
              level={level}
              className="icon"
              clickDropdownItem={key => clickDropdownItem(key, i, handleMenu)}
            />
          )}
        </div>
      </Menu.Item>
    );
  });
}

export default renderMenuItem;
