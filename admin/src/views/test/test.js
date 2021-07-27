/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-21 00:00:49
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 23:38:23
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import DefineTable from '@/components/antd/table/table';
import { Switch, Space } from 'antd';

import devConfig from '@/reducers/menu/devConfig';
// 本地开发环境才有的菜单节点
const nodeIds = devConfig.map(i => i.nodeId);

const mapStateToProps = state => {
  return {
    // 接口是否加载完毕
    isMenuDataLoaded: state.menu.loading,
    // 菜单数据，过滤开发环境才显示的菜单
    menuList: state.menu.list.filter(i => !nodeIds.includes(i.nodeId)),
  };
};

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
  },
];

const rowSelection = {
  checkStrictly: false,
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

@connect(mapStateToProps, null)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkStrictly: false,
    };
  }

  setCheckStrictly() {
    this.setState({
      checkStrictly: !this.state.checkStrictly,
    });
  }

  transformMenuList(menuList = []) {
    return menuList.map(i => {
      const o = {};
      o.key = i.nodeId;
      o.title = i.title;
      if (Array.isArray(i.children) && i.children.length) {
        o.children = this.transformMenuList(i.children);
      } else {
        if (Array.isArray(i.buttons) && i.buttons.length) {
          o.children = i.buttons.map(b => ({
            key: b.buttonId,
            title: b.buttonName,
            children: null,
          }));
        } else {
          o.children = null;
        }
      }

      return o;
    });
  }

  render() {
    const { checkStrictly } = this.state;
    const { menuList } = this.props;
    const menu = this.transformMenuList(menuList);
    return (
      <div
        className="w-100-pc h-100-pc"
        style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}
      >
        <Space align="center" style={{ marginBottom: 16 }}>
          CheckStrictly:{' '}
          <Switch
            checked={checkStrictly}
            onChange={() => this.setCheckStrictly()}
          />
        </Space>
        <DefineTable
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={menu}
          pagination={false}
          bordered
          expandable={{
            expandRowByClick: true,
          }}
        />
      </div>
    );
  }
}
export default Index;
