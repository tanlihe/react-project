/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-09 00:02:51
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-27 01:22:00
 */
import React, { Component } from 'react';
import DefineButton from '@/components/antd/button/button';
import DefineModal from '@/components/antd/modal/modal';
import DefineMessage from '@/components/antd/message/message';
import { Form, Input, Row, Col } from 'antd';
import { checkRoleInfo, updateRoleInfo, createRoleInfo } from '@/apis/role';
import { pageButtons } from '@/apis/button';

import DefineTree from '@/components/antd/tree/tree';

class RoleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageButtons: [],
      id: '',
      visible: false,
      modalType: '',

      // 角色信息
      roleInfo: {
        roleId: '',
        roleDesc: '',
        buttons: [],
      },

      // 表单样式
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

  // 获取系统所有的菜单数据
  async pageButtons() {
    const { code = 200, data = [] } = await pageButtons();
    if (code === 200) {
      this.setState({
        pageButtons: data.filter(i => i.children && i.children.length),
      });
    }
  }

  // 查看角色信息
  async checkRoleInfo(id = '') {
    const { data = {}, code = 200 } = await checkRoleInfo({ id });
    if (code === 200) {
      console.log(data);
      const { roleId = '', buttons = [], roleDesc = '' } = data;
      this.setState({
        roleInfo: {
          roleId,
          roleDesc,
          buttons,
        },
      });
    }
  }

  // 更新角色信息
  async updateRoleInfo(id) {
    const { roleInfo = {} } = this.state;
    const params = {
      id,
      ...roleInfo,
    };
    const { code = 200 } = await updateRoleInfo(params);
    if (code === 200) {
      DefineMessage.success('更新成功, 2s 后刷新系统');
      this.close();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      this.props.reloadList && this.props.reloadList();
    }
  }

  // 添加角色信息
  async createRoleInfo() {
    const { roleInfo = {} } = this.state;
    const params = {
      ...roleInfo,
    };
    const { code = 200 } = await createRoleInfo(params);
    if (code === 200) {
      DefineMessage.success('创建成功, 2s 后刷新系统');
      this.close();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      this.close();
      this.props.reloadList && this.props.reloadList();
    }
  }

  open(id = '', modalType = '') {
    this.setState(
      {
        visible: true,
        id,
        modalType,
      },
      () => {
        if (modalType === 'create') {
          this.setState({
            roleInfo: {
              roleId: '',
              roleDesc: '',
              buttons: [],
            },
          });
        } else {
          this.checkRoleInfo(id);
        }
      }
    );
  }

  close() {
    this.setState({
      id: '',
      visible: false,
      modalType: '',
      roleInfo: {
        roleId: '',
        roleDesc: '',
        buttons: [],
      },
    });
  }

  handleOk() {
    const { id = '', modalType = '' } = this.state;
    if (modalType === 'create') {
      this.createRoleInfo();
    } else {
      this.updateRoleInfo(id);
    }
  }

  handleCheck(checkedKeys) {
    const { roleInfo = {} } = this.state;

    this.setState({
      roleInfo: Object.assign({}, roleInfo, { buttons: checkedKeys }),
    });
  }

  // 修改角色名称
  handleChangeRoleDesc(v) {
    const { roleInfo = {} } = this.state;
    const {
      target: { value = '' },
    } = v;

    this.setState({
      roleInfo: Object.assign({}, roleInfo, { roleDesc: value }),
    });
  }

  // 修改角色 Id
  handleChangeRoleId(v) {
    const { roleInfo = {} } = this.state;
    const {
      target: { value = '' },
    } = v;

    this.setState({
      roleInfo: Object.assign({}, roleInfo, { roleId: value }),
    });
  }

  componentDidMount() {
    this.pageButtons();
  }

  render() {
    const {
      pageButtons = [],
      visible = false,
      modalType = '',
      roleInfo: { roleId = '', roleDesc = '', buttons = [] },
    } = this.state;

    let Footer = [
      <DefineButton
        type="default"
        key="back"
        debounce={300}
        onClick={() => this.close()}
      >
        取 消
      </DefineButton>,
    ];

    if (modalType !== 'check') {
      Footer.push(
        <DefineButton
          key="submit"
          type="primary"
          debounce={300}
          onClick={() => this.handleOk()}
        >
          确 认
        </DefineButton>
      );
    }

    return (
      <DefineModal
        style={{ height: 450 }}
        visible={visible}
        title="角色菜单"
        onCancel={() => this.close()}
        footer={Footer}
        width="50%"
      >
        <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Row>
            <Col span={24}>
              <Form.Item label="角色名称">
                <Input
                  value={roleDesc}
                  placeholder="角色名称不能为空"
                  onChange={v => this.handleChangeRoleDesc(v)}
                  disabled={!['create', 'edit'].includes(modalType)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="角色 Id">
                <Input
                  value={roleId}
                  placeholder="角色 Id不能为空"
                  onChange={v => this.handleChangeRoleId(v)}
                  disabled={!['create', 'edit'].includes(modalType)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="权限菜单">
                <div
                  className="test-page w-100-pc h-100-pc"
                  style={{ overflow: 'auto' }}
                >
                  <DefineTree
                    checkable
                    height={300}
                    defaultCheckedKeys={buttons}
                    checkedKeys={buttons}
                    treeData={pageButtons}
                    disabled={modalType === 'check'}
                    onCheck={checkedKeys => this.handleCheck(checkedKeys)}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DefineModal>
    );
  }
}
export default RoleModal;
