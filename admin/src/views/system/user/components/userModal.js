/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-02 00:19:10
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 15:16:11
 */
import React, { createRef } from 'react';
import DefineModal from '@/components/antd/modal/modal';
import DefineButton from '@/components/antd/button/button';
import DefineMessage from '@/components/antd/message/message';
import { checkUserById, updateUser, registerUser } from '@/apis/user';
import { Form, Input, Select } from 'antd';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      loading: false,
      formRef: createRef(),
      formLayout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        },
      },
    };
  }

  // 查询用户信息
  async checkUserById(id) {
    const { data = {}, code = 200 } = await checkUserById({ id });
    if (code === 200) {
      const {
        _id = '',
        account = '',
        password = '',
        name = '',
        roleId = '',
        desc = '',
      } = data;
      this.setState({
        userInfo: {
          id: _id,
          account,
          password,
          name,
          roleId,
          desc,
        },
      });
    }
  }

  // 新增用户信息
  createUser(params) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { msg = '', code = 200 } = await registerUser(
          Object.assign({}, params)
        );
        if (code === 200) {
          DefineMessage.success(msg);
          this.props.onOk && this.props.onOk(true);
        }
      }
    );
  }

  // 更新用户信息
  updateUser(params) {
    const {
      userInfo: { id = '' },
    } = this.state;
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { msg = '', code = 200 } = await updateUser(
          Object.assign({}, params, { id })
        );
        if (code === 200) {
          DefineMessage.success(msg);
          this.props.onOk && this.props.onOk(true);
        }
      }
    );
  }

  handleOnOk() {
    const { modalHandleType = 'check' } = this.props;
    const params = this.state.formRef.current.getFieldsValue();

    switch (modalHandleType) {
      case 'check':
        this.props.onOk();
        break;
      case 'create':
        this.createUser(params);
        break;
      case 'edit':
        this.updateUser(params);
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    if (this.props.userId) {
      this.checkUserById(this.props.userId);
    } else {
      this.setState({
        userInfo: {
          id: '',
          account: '',
          password: '',
          name: '',
          roleId: '',
          desc: '',
        },
      });
    }
  }

  render() {
    const { userInfo = null, formRef, loading = false } = this.state;
    const {
      roleEnum = [],
      modalHandleType = 'check',
      ...antdProps
    } = this.props;

    console.log(this.props.modalHandleType);

    const formatTitle = modalHandleType => {
      switch (modalHandleType) {
        case 'check':
          return '查看';
        case 'create':
          return '新增';
        case 'edit':
          return '编辑';
        default:
          return '';
      }
    };

    return (
      <DefineModal
        title={`用户信息 - ${formatTitle(modalHandleType)}`}
        {...antdProps}
        onCancel={() => this.props.onCancel()}
        footer={[
          <DefineButton
            type="default"
            key="back"
            debounce={300}
            onClick={() => this.props.onCancel()}
          >
            取 消
          </DefineButton>,
          <DefineButton
            key="submit"
            type="primary"
            debounce={300}
            onClick={() => this.handleOnOk()}
            loading={loading}
          >
            确 认
          </DefineButton>,
        ]}
      >
        {userInfo && (
          <Form
            name="basic"
            ref={formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{
              account: userInfo.account,
              password: userInfo.password,
              name: userInfo.name,
              roleId: userInfo.roleId,
              desc: userInfo.desc,
              id: userInfo.id,
            }}
          >
            <Form.Item
              label="账号"
              name="account"
              rules={[{ required: true, message: '账号不能为空' }]}
            >
              <Input placeholder="账号不能为空" disabled={userInfo.id} />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input.Password
                autoComplete="new-password"
                disabled={modalHandleType === 'check'}
                placeholder="密码不能为空"
              />
            </Form.Item>

            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '姓名不能为空' }]}
            >
              <Input
                disabled={modalHandleType === 'check'}
                placeholder="姓名不能为空"
              />
            </Form.Item>

            <Form.Item
              label="角色"
              name="roleId"
              rules={[{ required: true, message: '姓名不能为空' }]}
            >
              <Select
                disabled={modalHandleType === 'check'}
                placeholder="角色不能为空"
                options={roleEnum}
              />
            </Form.Item>

            <Form.Item
              label="头像"
              // name="avatar"
              // rules={[{ required: true, message: '头像不能为空' }]}
            >
              头像功能待定
            </Form.Item>

            <Form.Item
              label="简述"
              name="desc"
              rules={[{ required: true, message: '简述不能为空' }]}
            >
              <Input.TextArea
                disabled={modalHandleType === 'check'}
                placeholder="简述不能为空"
              />
            </Form.Item>
          </Form>
        )}
      </DefineModal>
    );
  }
}

export default UserModal;
