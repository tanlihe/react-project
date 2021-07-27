/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-10 22:40:52
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 17:52:46
 */
import React, { Component, createRef } from 'react';
import renderMenuItem from './renderMenuItem';
import { Menu } from 'antd';

import DefineButton from '@/components/antd/button/button';

import MenuModal from './menuModal';

import { getMenuAllList } from '@/apis/menu';

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
      modalRef: createRef(),
    };
  }

  // 获取系统所有的菜单数据
  async getMenuAllList() {
    const { code = 200, data = [] } = await getMenuAllList();
    if (code === 200) {
      this.setState({
        menuList: data,
      });
    }
  }

  // 添加一级菜单
  createFirstLevelMenu() {
    this.state.modalRef.current.open();
  }

  handleMenu(i, key = 'edit') {
    this.state.modalRef.current.open(i, key);
  }

  handleClickMenuItem(options) {
    const { key = '' } = options;
    const { setMenuListMenuId = () => {} } = this.props;
    // 回调父组件 setMenuListMenuId 方法
    setMenuListMenuId && setMenuListMenuId(key);
  }

  componentDidMount() {
    this.getMenuAllList();
  }

  render() {
    const { menuList = [] } = this.state;
    return (
      <div
        className="menu-list-wrap h-100-pc"
        style={{
          overflowY: 'auto',
        }}
      >
        <DefineButton
          size="large"
          className="w-100-pc"
          onClick={() => this.createFirstLevelMenu()}
        >
          添加一级菜单
        </DefineButton>

        <Menu
          style={{ width: 200 + 'px', minHeight: 'calc(100% - 40px)' }}
          mode="inline"
          expandIcon={null}
          onClick={options => this.handleClickMenuItem(options)}
        >
          {renderMenuItem(menuList, (key, i) => this.handleMenu(key, i))}
        </Menu>

        <MenuModal ref={this.state.modalRef}></MenuModal>
      </div>
    );
  }
}
export default MenuList;
