/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-11 22:40:23
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-15 00:09:09
 */
import React, { Component } from 'react';
import {
  EllipsisOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeFilled,
} from '@ant-design/icons';
import DefineDropDown from '@/components/antd/dropdown/dropdown';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: [
        { key: 'create', icon: <PlusOutlined />, title: '添 加' },
        { key: 'check', icon: <EyeFilled />, title: '查 看' },
        { key: 'delete', icon: <EditOutlined />, title: '删 除' },
        { key: 'edit', icon: <DeleteOutlined />, title: '编 辑' },
      ],
    };
  }

  clickDropdownItem(key = '') {
    this.props.clickDropdownItem && this.props.clickDropdownItem(key);
  }

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    const { level = 0 } = this.props;
    const { menuData = [] } = this.state;

    let formatMenuData = menuData;

    // 三级菜单不能在添加子菜单
    if (level === 3) {
      formatMenuData = formatMenuData.map(i => {
        if (['create'].includes(i.key)) {
          i.hide = true;
        }
        return i;
      });
    }
    return (
      <DefineDropDown
        menuData={formatMenuData}
        clickDropdownItem={key => this.clickDropdownItem(key)}
      >
        <EllipsisOutlined
          onClick={e => this.handleClick(e)}
          style={{ fontSize: 24 + 'px', width: 24 + 'px', height: 24 + 'px' }}
        />
      </DefineDropDown>
    );
  }
}

export default DropdownMenu;
