/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-29 00:38:37
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-29 00:43:00
 */
import React from 'react';
import { Popconfirm } from 'antd';

function DefinePopconfirm(props) {
  const {
    title = '',
    okText = '',
    cancelText = '',
    children,
    ...antdProps
  } = props;
  const defaultOptions = {
    title: 'Popconfirm 标题?',
    okText: '确 定',
    cancelText: '取 消',
  };
  return (
    <Popconfirm
      title={title || defaultOptions.title}
      okText={okText || defaultOptions.okText}
      cancelText={cancelText || defaultOptions.cancelText}
      {...antdProps}
    >
      {children}
    </Popconfirm>
  );
}

export default DefinePopconfirm;
