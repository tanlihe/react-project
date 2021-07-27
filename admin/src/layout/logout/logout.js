/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-30 01:56:13
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-01 18:46:45
 */
import React, { Component } from 'react';
import { Button } from 'antd';
import { removeCookie, removeSessionStorage } from '@/utils/cookie';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goLogin() {
    const { history } = this.props;
    history.replace({
      pathname: '/login',
    });
  }

  componentDidMount() {
    removeCookie('token');
    removeSessionStorage('userInfo');

    this.goLogin();
  }

  render() {
    return (
      <div>
        <h3>统一处理页面退出逻辑</h3>
        <Button onClick={() => this.goLogin()}>前往 login 页面</Button>
      </div>
    );
  }
}
export default Logout;
