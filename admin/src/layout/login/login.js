/*
 * @Descripttion: LoginLayout 界面
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 13:18:25
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-27 00:21:32
 */
import React, { Component, createRef } from 'react';
import { Form, Input } from 'antd';
import DefineButton from '@/components/antd/button/button';
import { getUserInfo } from '@/apis/user';
import md5 from 'md5';

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formRef: createRef(),
      loginInfo: {
        account: '',
        password: '',
      },
    };
  }

  async getUserInfo(params = {}) {
    const { code = 200 } = await getUserInfo(params);
    if (code === 200) {
      const { history } = this.props;
      history.replace({
        pathname: '/base/dashboard',
      });
    }
  }

  onFinish() {
    const params = this.state.formRef.current.getFieldsValue();
    const { account = '', password = '' } = params;
    const md5Account = md5(account);
    const md5Password = md5(password);
    this.getUserInfo({ md5Account, md5Password });
  }

  render() {
    const { loginInfo } = this.state;
    return (
      <div
        className="w-100-pc h-100-pc"
        style={{ backgroundColor: '#001529', position: 'relative' }}
      >
        <div
          className="form-wrapper"
          style={{
            width: '500px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Form
            {...layout}
            initialValues={loginInfo}
            ref={this.state.formRef}
            name="control-ref"
            onFinish={() => this.onFinish()}
          >
            <Form.Item
              name="account"
              label=""
              rules={[
                {
                  required: true,
                  message: '账号不能为空',
                },
              ]}
            >
              <Input placeholder="请输入账号" />
            </Form.Item>

            <Form.Item
              name="password"
              label=""
              rules={[
                {
                  required: true,
                  message: '密码不能为空',
                },
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item>
              <DefineButton
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
              >
                登 录
              </DefineButton>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default LoginLayout;
