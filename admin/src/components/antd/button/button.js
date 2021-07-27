/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-27 15:37:55
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-04 23:52:37
 */

import React from 'react';
import { Button } from 'antd';
import { debounce as handleDebounce } from '@/utils/lodash';
import { isObjectDiff } from '@/utils/tools';

class DefineButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 父组件每次更新状态都会 state | props 都会刷新子组件，需要通过 shouldComponentUpdate 来选择性更新，防止防抖失效
  componentDidUpdate() {
    // console.log('componentDidUpdate');
  }

  // 阻止子组件随父组件更新而更新，防抖会失效
  shouldComponentUpdate(nextProps) {
    // 接收的 props 有变化时，更新 button 组件，否则不更新，防止防抖会失效
    if (!isObjectDiff(nextProps, this.props)) return true;
    return false;
  }

  render() {
    let {
      className = '',
      children,
      type = 'primary',
      onClick = () => {},
      debounce = 0,
      ...props
    } = this.props;

    onClick = debounce
      ? handleDebounce(onClick, debounce, { leading: true, trailing: false })
      : onClick;

    return (
      <Button
        type={type}
        className={`${className} define-button`}
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
}

export default DefineButton;
