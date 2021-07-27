/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-18 17:39:25
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-20 00:41:27
 */
import React, { Component, createRef } from 'react';

import DefineButton from '@/components/antd/button/button';
import DefineModal from '@/components/antd/modal/modal';
import { Form, Input } from 'antd';
import { createPageButton, updatePageButton } from '@/apis/button';
import DefineMessage from '@/components/antd/message/message';

class MenuModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalType: null,
      formRef: createRef(),
      buttonInfo: {
        id: '',
        pageName: '',
        pageId: '',
        buttonId: '',
        buttonname: '',
      },
    };
  }

  // 新增
  async createPageButton(params = {}) {
    const { code = 200 } = await createPageButton(params);
    if (code === 200) {
      DefineMessage.success('添加成功');
      this.close();
      this.props.refreshTable && this.props.refreshTable();
    }
  }

  // 更新
  async updatePageButton(params = {}) {
    const { code = 200 } = await updatePageButton(params);
    if (code === 200) {
      DefineMessage.success('更新成功');
      this.close();
      this.props.refreshTable && this.props.refreshTable();
    }
  }

  // 打开弹窗
  open(type = 'create', buttonInfo = {}) {
    this.setState({
      visible: true,
      modalType: type,
      buttonInfo: Object.assign({}, this.state.buttonInfo, buttonInfo),
    });
  }

  // 关闭弹窗
  close() {
    this.setState({
      visible: false,
      modalType: null,
      buttonInfo: {
        pageName: 'pageName',
        pageId: '',
        buttonId: '',
        buttonname: '',
      },
    });
  }

  // 关闭弹窗
  handleCancel() {
    this.close();
  }

  // 弹窗确定按钮
  async handleOk() {
    const {
      buttonInfo: { id = '' },
    } = this.state;
    const promise = await this.state.formRef.current.validateFields();

    const { modalType = '' } = this.state;
    switch (modalType) {
      case 'create':
        this.createPageButton(promise);
        break;
      case 'edit':
        this.updatePageButton({ ...promise, id });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      visible = false,
      modalType = 'check',
      buttonInfo = {},
      formRef,
    } = this.state;

    return (
      visible && (
        <DefineModal
          title="按钮信息"
          visible={visible}
          onCancel={() => this.close()}
          footer={[
            <DefineButton
              type="default"
              key="back"
              debounce={300}
              onClick={() => this.handleCancel()}
            >
              取 消
            </DefineButton>,
            <DefineButton
              key="submit"
              type="primary"
              debounce={300}
              onClick={() => this.handleOk()}
            >
              确 认
            </DefineButton>,
          ]}
        >
          {
            <Form
              name="basic"
              ref={formRef}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              initialValues={{
                ...buttonInfo,
              }}
            >
              <Form.Item label="页面名称" name="pageName">
                <Input disabled />
              </Form.Item>

              <Form.Item label="页面 ID" name="pageId">
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="按钮名称"
                name="buttonName"
                rules={[{ required: true, message: '不能为空' }]}
              >
                <Input disabled={modalType === 'check'} />
              </Form.Item>

              <Form.Item
                label="按钮 ID"
                name="buttonId"
                rules={[{ required: true, message: '不能为空' }]}
              >
                <Input disabled={modalType === 'check'} />
              </Form.Item>
            </Form>
          }
        </DefineModal>
      )
    );
  }
}
export default MenuModal;
