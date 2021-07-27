/*
 * @Descripttion: BaseLayout 界面的 Sider 组件，用于展示 BaseLayout 的菜单相关页面
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 21:20:25
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 17:46:06
 */
import React, { Component } from 'react';
import { Layout } from 'antd';

import DefineMenu from '@/components/antd/menu/menu';

import { connect } from 'react-redux';
import { MENU_ACTIONS } from '@/actions/menu';

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

const mapDispatchToProps = dispatch => ({
  // 调取 saga 里面关于 菜单数据的接口钩子，并将菜单数据保存到 Store 中
  getMenuPermissionListBySaga(payload = {}) {
    dispatch({
      type: MENU_ACTIONS.GET_MENU_LIST_BY_SAGA,
      payload,
    });
  },
});

const { Sider } = Layout;

// 高阶组件装饰器模式
@connect(mapStateToProps, mapDispatchToProps)
class DefineSider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: [],
    };
  }

  componentDidMount() {
    this.props.getMenuPermissionListBySaga();
  }

  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
      >
        {this.props.menuList.length && (
          // 渲染菜单界面
          <DefineMenu menuData={this.props.menuList} />
        )}
      </Sider>
    );
  }
}
export default DefineSider;
