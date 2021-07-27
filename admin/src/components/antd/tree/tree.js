/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-10 14:12:37
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-18 20:10:37
 */
import React, { Component } from 'react';
import { Tree } from 'antd';

class DefineTree extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      defaultExpandAll = true, // 默认展开所有树节点
      ...antdProps // antd 属性
    } = this.props;
    return <Tree defaultExpandAll={defaultExpandAll} {...antdProps} />;
  }
}
export default DefineTree;
