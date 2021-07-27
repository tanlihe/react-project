/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 13:19:17
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-01 19:55:46
 */
import React, { Component } from 'react';
import DefineSider from './sider/sider';
import DefineHeader from './header/header';
import DefineContent from './content/content';
import { Layout } from 'antd';
import { getCookie } from '@/utils/cookie';

import { connect } from 'react-redux';
import { USER_ACTIONS } from '@/actions/user';

const mapDispatchToProps = dispatch => ({
  // 调取 saga 里面关于 菜单数据的接口钩子，并将菜单数据保存到 Store 中
  checkUserByTokenBySaga(payload = {}) {
    dispatch({
      type: USER_ACTIONS.GET_USER_INFO_BY_SAGA,
      payload,
    });
  },
});

require('./base.less');

@connect(null, mapDispatchToProps)
class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const token = getCookie('token');
    const { history = {} } = this.props;

    // baseLayout 界面 token 不存在时，重定向到 logout 页面中
    if (!token) {
      history.replace('/logout');
    }

    // 获取用户信息
    this.props.checkUserByTokenBySaga();
  }

  render() {
    return (
      <Layout id="base-layout-container">
        <DefineSider />
        <Layout>
          <DefineHeader />
          <DefineContent />
        </Layout>
      </Layout>
    );
  }
}

export default BaseLayout;
