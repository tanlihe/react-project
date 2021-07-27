/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-03 23:36:31
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-26 01:03:59
 */
import React, { Component, createRef } from 'react';
import { Form, Row, Col, Input, Select, Checkbox, Button, Space } from 'antd';

import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

class DefineSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formRef: createRef(),
      initData: null,
    };
  }

  getInitData() {
    const { searchBarData } = this.props;
    const values = {};

    searchBarData.map(i => {
      const { name = '', value = '' } = i;
      values[name] = value;
    });

    return values;
  }

  renderDom(type = '', props = '') {
    switch (type) {
      case 'input':
        return <Input {...props} />;
      case 'select':
        return <Select {...props} />;
      case 'checkbox':
        const { options = [] } = props;
        return (
          <Checkbox.Group>
            {options.map(i => {
              return (
                <Checkbox key={i.value} value={i.value}>
                  {i.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case 'range-picker':
        return <RangePicker {...props} />;
      default:
        return null;
    }
  }

  getValues() {
    const values = this.state.formRef.current.getFieldsValue();
    return values;
  }

  search() {
    const values = this.getValues();
    this.props.search && this.props.search(values);
  }

  create() {
    this.props.create && this.props.create();
  }

  reset() {
    this.state.formRef.current.resetFields();
    const values = this.getValues();
    this.props.reset && this.props.reset(values);
  }

  componentDidMount() {
    const initData = this.getInitData();
    this.setState({
      initData,
    });
  }

  render() {
    const { searchBarData } = this.props;

    const { initData = null } = this.state;

    return (
      initData && (
        <Form
          ref={this.state.formRef}
          name="advanced_search"
          className="ant-advanced-search-form"
          initialValues={initData}
        >
          {
            <Row gutter={24}>
              {searchBarData.map(i => {
                const {
                  label = '',
                  name = '',
                  attrs: { is = '', ...antdProps },
                } = i;

                return (
                  <Col span={8} key={name}>
                    <Form.Item name={name} label={label}>
                      {this.renderDom(is, antdProps)}
                    </Form.Item>
                  </Col>
                );
              })}

              <Col span={8} key="handle-button">
                <Form.Item>
                  <Space>
                    {this.props.search && (
                      <Button type="primary" onClick={() => this.search()}>
                        搜 索
                      </Button>
                    )}
                    {this.props.create && (
                      <Button type="primary" onClick={() => this.create()}>
                        新 增
                      </Button>
                    )}
                    {this.props.reset && (
                      <Button onClick={() => this.reset()}>重 置</Button>
                    )}
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          }
        </Form>
      )
    );
  }
}

export default DefineSearchBar;
