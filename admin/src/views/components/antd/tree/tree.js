/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-16 00:42:22
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-16 00:43:12
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DefineTree from '@/components/antd/tree/tree';

/**
 *
 * @param {store 里面的 state} state
 * @param {可以接收第二个参数，为组件自身的 state} ownState
 * @returns
 */
const mapStateToProps = state => {
  return {
    // 接口是否加载完毕
    isMenuDataLoaded: state.menu.loading,
    // 菜单数据
    menuList: state.menu.list,
  };
};

/**
 * @connect(mapStateToProps, null) 一般情况这边便可以
 *
 * @connect(mapStateToProps, null, null, { forwardRef: true }) 的作用是为了解决
 * Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? 警告
 */
@connect(mapStateToProps, null, null, { forwardRef: true })
class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ['DASHBOARD', 'CHARTS', 'CHARTS_LINE'],
      checkedKeys: [],
      selectedKeys: [],
      autoExpandParent: true,
    };
  }

  transformMenuList(menuList = []) {
    return menuList.map(i => {
      const o = {};
      o.key = i.nodeId;
      o.title = i.title;
      if (Array.isArray(i.children) && i.children.length) {
        o.children = this.transformMenuList(i.children);
      }

      return o;
    });
  }

  render() {
    const menu = this.transformMenuList(this.props.menuList);
    return (
      <div className="test-page w-100-pc h-100-pc" style={{ overflow: 'auto' }}>
        {Array.isArray(menu) && menu.length && (
          <DefineTree
            checkable
            defaultCheckedKeys={['DASHBOARD', 'CHARTS_LINE']}
            treeData={menu}
          />
        )}
      </div>
    );
  }
}
export default TreeView;
