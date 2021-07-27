/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-04 14:53:21
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-16 00:42:47
 */
import React, { Component } from 'react';
import DefineButton from '@/components/antd/button/button';
import { Space } from 'antd';

class ButtonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      normalCount: 10,
      debounceCount: 10,
    };
  }

  handleClick(type = 'add') {
    const { normalCount, debounceCount } = this.state;
    switch (type) {
      case 'normal_add':
        this.setState(
          {
            normalCount: normalCount + 1,
          },
          () => console.log(this.state.normalCount)
        );
        break;
      case 'normal_decreace':
        this.setState(
          {
            normalCount: normalCount - 1,
          },
          () => console.log(this.state.normalCount)
        );
        break;
      case 'debounce_add':
        this.setState(
          {
            debounceCount: debounceCount + 1,
          },
          () => console.log(this.state.debounceCount)
        );
        break;
      case 'debounce_decreace':
        this.setState(
          {
            debounceCount: debounceCount - 1,
          },
          () => console.log(this.state.debounceCount)
        );
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="button-view">
        <Space>
          <div className="normal">
            <h3>正常情况点击</h3>
            <DefineButton onClick={() => this.handleClick('normal_add')}>
              +1
            </DefineButton>
            <DefineButton type="text">{this.state.normalCount}</DefineButton>
            <DefineButton onClick={() => this.handleClick('normal_decreace')}>
              -1
            </DefineButton>
          </div>
        </Space>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Space>
          <div className="normal">
            <h3>防抖处理点击</h3>
            <DefineButton
              debounce={300}
              onClick={() => this.handleClick('debounce_add')}
            >
              +1
            </DefineButton>
            <DefineButton type="text">{this.state.debounceCount}</DefineButton>
            <DefineButton
              debounce={300}
              onClick={() => this.handleClick('debounce_decreace')}
            >
              -1
            </DefineButton>
          </div>
        </Space>
      </div>
    );
  }
}
export default ButtonView;
