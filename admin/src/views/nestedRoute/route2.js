/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 22:12:42
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-01 19:10:17
 */
import React, { Component } from 'react';

// 嵌套路由内嵌路由匹配信息
import route2 from '@/router/route2';

// 生成 route 相关信息
import CreateRoutes from '@/components/define/createRoutes';

class Route2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h3>嵌套二级路由</h3>
        {CreateRoutes(route2)}
      </div>
    );
  }
}
export default Route2;
