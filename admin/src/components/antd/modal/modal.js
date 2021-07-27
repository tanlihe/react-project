/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-02 00:51:41
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-02 00:52:42
 */
import React, { Component } from 'react';
import { Modal } from 'antd';

class DefineModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { children, ...antdProps } = this.props;
    return <Modal {...antdProps}>{children}</Modal>;
  }
}
export default DefineModal;
