/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-11 23:36:13
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-15 00:41:11
 */
import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';

class DefineDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMenuClick(e) {
    const { key = '', domEvent } = e;
    domEvent.stopPropagation();
    this.props.clickDropdownItem && this.props.clickDropdownItem(key);
  }

  createMenu(menuData = []) {
    return (
      <Menu onClick={e => this.handleMenuClick(e)}>
        {menuData.length &&
          menuData
            // 默认 i.hide 为 undefined，用于控制是否显示对应的 Menu.Item
            .filter(i => !i.hide)
            .map(i => {
              return (
                <Menu.Item key={i.key} icon={i.icon}>
                  {i.title}
                </Menu.Item>
              );
            })}
      </Menu>
    );
  }

  render() {
    const { menuData, children, ...antdProps } = this.props;
    return (
      <Dropdown
        overlay={this.createMenu(menuData)}
        placement="bottomCenter"
        {...antdProps}
      >
        {children}
      </Dropdown>
    );
  }
}
export default DefineDropDown;
