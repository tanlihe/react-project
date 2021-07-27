/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-21 23:44:47
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-18 21:11:54
 */
import React, { Component, createRef } from 'react';
import { Input } from 'antd';
import {
  StepBackwardOutlined,
  EditOutlined,
  FormOutlined,
  CopyOutlined,
} from '@ant-design/icons';

import './test.less';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classStatus: 'hide',
      inputValue: '',
      inputRef: createRef(),
      icons: [
        {
          icon: <StepBackwardOutlined />,
          key: 'StepBackwardOutlined',
        },
        {
          icon: <EditOutlined />,
          key: 'EditOutlined',
        },
        {
          icon: <FormOutlined />,
          key: 'FormOutlined',
        },
        {
          icon: <CopyOutlined />,
          key: 'CopyOutlined',
        },
        {
          icon: <StepBackwardOutlined />,
          key: 'StepBackwardOutlined1',
        },
        {
          icon: <EditOutlined />,
          key: 'EditOutlined1',
        },
        {
          icon: <FormOutlined />,
          key: 'FormOutlined1',
        },
        {
          icon: <CopyOutlined />,
          key: 'CopyOutlined1',
        },
        {
          icon: <StepBackwardOutlined />,
          key: 'StepBackwardOutlined2',
        },
        {
          icon: <EditOutlined />,
          key: 'EditOutlined2',
        },
        {
          icon: <FormOutlined />,
          key: 'FormOutlined2',
        },
        {
          icon: <CopyOutlined />,
          key: 'CopyOutlined2',
        },
      ],
    };
  }

  handleFocus() {
    this.setState({
      classStatus: 'show',
    });
  }

  handleBlur() {
    setTimeout(() => {
      this.setState({
        classStatus: 'hide',
      });
    }, 150);
  }

  handleClickIcon(i) {
    const { key = '' } = i;
    this.setState({
      inputValue: key,
    });
  }

  render() {
    const { icons, classStatus, inputValue = '' } = this.state;
    return (
      <div className="icon-select-wrap" style={{ width: 400 + 'px' }}>
        <span style={{ position: 'relative' }}>
          <Input
            ref={this.state.inputRef}
            placeholder="Basic usage"
            style={{ position: 'relative', width: '100%' }}
            onBlur={e => this.handleBlur(e)}
            onFocus={e => this.handleFocus(e)}
            value={inputValue}
          />
          <div
            style={{
              position: 'relative',
              height: 0,
            }}
          >
            <div
              className={`icons ${classStatus}`}
              style={{
                position: 'absolute',
                top: 5 + 'px',
                boxShadow: '0 0 20px rgba(0,0,0,.1)',
                width: '100%',
                height: 300 + 'px',
                backgroundColor: '#ffffff',
                borderRadius: '4px',
              }}
            >
              {icons.map(i => {
                return (
                  <span
                    className={`${
                      inputValue === i.key ? 'active' : ''
                    } icon-item`}
                    onClick={() => this.handleClickIcon(i)}
                    key={i.key}
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'inline-block',
                      fontSize: '20px',
                      padding: '10px',
                      lineHeight: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    {i.icon}
                  </span>
                );
              })}
            </div>
          </div>
        </span>

        <p>acacascas</p>
      </div>
    );
  }
}
export default Test;
