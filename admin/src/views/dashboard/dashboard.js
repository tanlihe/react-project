/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 13:56:49
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-27 01:07:19
 */
import React, { Component } from 'react';
import { hasPermissionButtonCode } from '@/utils/tools';
console.log(hasPermissionButtonCode('DASHBOARD_CREATE'));

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ul>
          {hasPermissionButtonCode('DASHBOARD_CREATE') && (
            <li>
              <p>挂载角色权限 及 按钮权限</p>
            </li>
          )}
          {hasPermissionButtonCode('DASHBOARD_UPDATE') && (
            <li>
              <p>用户设置页面完善</p>
            </li>
          )}
          <li>
            <p>登录逻辑完善</p>
          </li>
        </ul>
      </div>
    );
  }
}
export default Dashboard;
