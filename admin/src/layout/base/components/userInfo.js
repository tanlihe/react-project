/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-01 01:09:30
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-10 23:35:20
 */
import React, { Component } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import DefineButton from '@/components/antd/button/button';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

/**
 *
 * @param {store 里面的 state} state
 * @param {可以接收第二个参数，为组件自身的 state} ownState
 * @returns
 */
const mapStateToProps = state => {
  return {
    // 接口是否加载完毕
    userInfo: state.user.userInfo,
  };
};

function handleClick(e, history) {
  const { key = '' } = e;
  if (key === 'logout') {
    history.push({
      pathname: '/logout',
    });
  }
}

function menu(props) {
  const { history } = props;
  return (
    <Menu onClick={e => handleClick(e, history)}>
      <Menu.Item key="logout">
        <DefineButton type="text">退 出</DefineButton>
      </Menu.Item>

      <Menu.Item key="userInfo">
        <DefineButton type="text">用户信息</DefineButton>
      </Menu.Item>
    </Menu>
  );
}

@withRouter
@connect(mapStateToProps, null)
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { avatar = '' } = this.props.userInfo;
    return (
      <Dropdown overlay={() => menu(this.props)} placement="bottomCenter">
        <Avatar src={avatar} size={64} icon={<UserOutlined />} />
      </Dropdown>
    );
  }
}
export default UserInfo;
