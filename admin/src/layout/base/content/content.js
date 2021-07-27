/*
 * @Descripttion: BaseLayout 界面的 Content 组件，主要用于展示 BaseLayout 的相关路由界面
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 21:21:08
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-27 15:27:02
 */
import React, { Component } from 'react';
import { Layout } from 'antd';

// 基础路由相关的信息
import baseConfig from '@/router/baseConfig';

// 生成 route 相关信息
import CreateRoutes from '@/components/define/createRoutes';

require('./content.less');

const { Content } = Layout;

class DefineContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Content
        style={{
          height: '100%',
          padding: '24px 16px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '24px 24px 0px',
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
          }}
        >
          {CreateRoutes(baseConfig)}
        </div>
      </Content>
    );
  }
}
export default DefineContent;
