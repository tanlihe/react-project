/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-23 00:58:09
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-18 16:07:48
 */
import React, { Component } from 'react';
import MenuList from './components/menuList';
import ButtonTable from './components/buttonTable';

class MenuSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuId: '',
    };
  }

  // 子组件回调父组件的 menuId
  setMenuId(id = '') {
    this.setState({
      menuId: id,
    });
  }

  render() {
    const { menuId = '' } = this.state;
    return (
      <div
        className="router-page w-100-pc h-100-pc"
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div className="menu-list-wrap" style={{ width: '200px' }}>
          <MenuList
            menuId={menuId}
            setMenuListMenuId={menuId => this.setMenuId(menuId)}
          />
        </div>
        <span style={{ width: '20px' }}></span>
        <div className="table-wrap" style={{ width: 0, flex: 1 }}>
          <ButtonTable menuId={menuId} />
        </div>
      </div>
    );
  }
}
export default MenuSetting;
