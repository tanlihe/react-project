/*
 * @Descripttion: BaseLayout 界面的 Header 组件
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 21:20:46
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-02 00:57:57
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import UserInfo from '../components/userInfo';

const { Header } = Layout;

class DefineHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Header
        className="site-layout-sub-header-background"
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '0px 20px',
          boxSizing: 'border-box',
        }}
      >
        <div className="left">
          <h1>头部信息</h1>
        </div>
        <div className="right">
          <UserInfo />
        </div>
      </Header>
    );
  }
}
export default DefineHeader;
