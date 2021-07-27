/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-11 13:35:16
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-27 01:24:05
 */
import React, { Component, createRef } from 'react';

import DefineButton from '@/components/antd/button/button';
import DefineModal from '@/components/antd/modal/modal';
import { Form, Input, Switch } from 'antd';
import {
  createFirstLevelMenu,
  deleteFirstLevelMenu,
  updateFirstLevelMenu,
  createSecondLevelMenu,
  deleteSecondLevelMenu,
  updateSecondLevelMenu,
  createThirdLevelMenu,
  deleteThirdLevelMenu,
  updateThirdLevelMenu,
} from '@/apis/menu';
import DefineMessage from '@/components/antd/message/message';

class MenuModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalType: null,
      menuId: '',
      formRef: createRef(),
      menuInfo: {
        parentId: '',
        parentTitle: '',
        level: 0,
        icon: '',
        nodeId: '',
        path: '',
        title: '',
        isNode: false,
      },
    };
  }

  // 创建菜单
  async createMenuApi(params = {}) {
    const { parentId = '' } = this.state.menuInfo;
    const { level = 1 } = params;
    let res = null;

    switch (level) {
      case 1:
        res = await createFirstLevelMenu(
          Object.assign({}, params, { parentId })
        );
        break;
      case 2:
        res = await createSecondLevelMenu(
          Object.assign({}, params, { parentId })
        );
        break;
      case 3:
        res = await createThirdLevelMenu(
          Object.assign({}, params, { parentId })
        );
        break;
      default:
        console.log('level is wrong');
        break;
    }

    const { code = 200 } = res;
    if (code === 200) {
      DefineMessage.success('创建成功, 2s 后刷新系统');
      this.close();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  // 更新一级菜单
  async updateMenuApi(params = {}) {
    const { level = 1 } = params;

    let res = null;

    switch (level) {
      case 1:
        res = await updateFirstLevelMenu(params);
        break;
      case 2:
        res = await updateSecondLevelMenu(params);
        break;
      case 3:
        res = await updateThirdLevelMenu(params);
        break;
      default:
        console.log('level is wrong');
        break;
    }

    const { code = 200 } = res;
    if (code === 200) {
      DefineMessage.success('更新成功, 2s 后刷新系统');
      this.close();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  // 删除一级菜单
  async deleteMenuApi(params = {}) {
    const { _id: id = '', level = 1 } = params;

    let res = null;

    switch (level) {
      case 1:
        res = await deleteFirstLevelMenu({ id });
        break;
      case 2:
        res = await deleteSecondLevelMenu({ id });
        break;
      case 3:
        res = await deleteThirdLevelMenu({ id });
        break;
      default:
        console.log('level is wrong');
        break;
    }
    const { code = 200 } = res;
    if (code === 200) {
      DefineMessage.success('删除成功, 2s 后刷新系统');
      this.close();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  // 打开弹窗
  open(i, type = 'create') {
    switch (type) {
      case 'create':
        this.handleCreateMenu(i);
        break;
      case 'check':
        this.handleCheckMenu(i);
        break;
      case 'delete':
        this.handleDeleteMenu(i);
        break;
      case 'edit':
        this.handleEditMenu(i);
        break;
      default:
        break;
    }
  }

  // 关闭弹窗
  close() {
    this.setState({
      visible: false,
      modalType: null,
      menuId: '',
      menuInfo: {
        parentId: '',
        parentTitle: '',
        level: 0,
        icon: '',
        nodeId: '',
        path: '',
        title: '',
        isNode: false,
      },
    });
  }

  // 创建菜单
  handleCreateMenu(i) {
    if (!i) {
      this.setState({
        visible: true,
        modalType: 'create',
        menuInfo: {
          parentId: '',
          parentTitle: '',
          level: 1,
          icon: '',
          nodeId: '',
          path: '',
          title: '',
          isNode: false,
        },
      });
    } else {
      const { level = 0, icon = '', nodeId = '', title = '', code = '' } = i;
      this.setState({
        visible: true,
        modalType: 'create',
        menuInfo: {
          parentId: nodeId,
          parentTitle: title,
          level: level + 1,
          icon: icon,
          nodeId: code,
          path: '',
          title: '',
          isNode: false,
        },
      });
    }
  }

  // 查看菜单
  handleCheckMenu(i) {
    const { title = '', nodeId = '', level = 0, path = '', icon = '' } = i;
    this.setState({
      visible: true,
      modalType: 'check',
      menuInfo: {
        parentId: '',
        parentTitle: '',
        level: level,
        icon: icon,
        nodeId: nodeId,
        path: path,
        title: title,
      },
    });
  }

  // 删除菜单
  handleDeleteMenu(i) {
    this.deleteMenuApi(i);
  }

  // 编辑菜单
  handleEditMenu(i) {
    const {
      title = '',
      nodeId = '',
      level = 0,
      path = '',
      icon = '',
      _id = '',
    } = i;
    this.setState({
      visible: true,
      modalType: 'edit',
      menuId: _id,
      menuInfo: {
        parentId: '',
        parentTitle: '',
        level: level,
        icon: icon,
        nodeId: nodeId,
        path: path,
        title: title,
        isNode: false,
      },
    });
  }

  // 关闭弹窗
  handleCancel() {
    this.close();
  }

  // 弹窗确定按钮
  async handleOk() {
    const { modalType = 'check', menuId = '' } = this.state;

    const promise = await this.state.formRef.current.validateFields();

    const {
      nodeId: nodeId = '',
      icon: icon = '',
      level = '',
      path: path = '',
      title: title = '',
      isNode = false,
    } = promise;

    switch (modalType) {
      case 'create':
        this.createMenuApi({
          nodeId,
          icon,
          level,
          path,
          title,
          isNode,
        });
        break;
      case 'edit':
        this.updateMenuApi({
          id: menuId,
          nodeId,
          icon,
          level,
          path,
          title,
          isNode,
        });
        break;
      default:
        break;
    }
  }

  // 转换菜单级别文案
  transformMenuText(level) {
    switch (level) {
      case 1:
        return '一级';
      case 2:
        return '二级';
      case 3:
        return '三级';
      default:
        return '';
    }
  }

  // 转换菜单标题
  transformMenuTitle(modalType = 'check', levelText = '') {
    switch (modalType) {
      case 'create':
        return `添加${levelText}菜单`;
      case 'check':
        return `查看${levelText}菜单`;
      case 'edit':
        return `编辑${levelText}菜单`;
      default:
        return '菜单信息';
    }
  }

  render() {
    const {
      visible = false,
      modalType = 'check',
      menuInfo = {},
      formRef,
    } = this.state;

    const { level } = menuInfo;
    const levelText = this.transformMenuText(level);
    const modalTitle = this.transformMenuTitle(modalType, levelText);

    return (
      visible && (
        <DefineModal
          title={modalTitle}
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
                ...menuInfo,
              }}
            >
              <Form.Item>
                <h3 style={{ color: 'red' }}>操作后，2s 后系统自动刷新页面</h3>
              </Form.Item>

              {menuInfo.parentId && (
                <Form.Item
                  label="父级菜单"
                  name="parentTitle"
                  rules={[{ required: true, message: '不能为空' }]}
                >
                  <Input disabled />
                </Form.Item>
              )}

              <Form.Item
                label="名称"
                name="title"
                rules={[{ required: true, message: '不能为空' }]}
              >
                <Input disabled={modalType === 'check'} />
              </Form.Item>

              <Form.Item
                label="编号"
                name="nodeId"
                rules={[{ required: true, message: '不能为空' }]}
              >
                <Input disabled={modalType === 'check'} />
              </Form.Item>

              <Form.Item label="图标" name="icon">
                <Input disabled={modalType === 'check'} />
              </Form.Item>

              <Form.Item
                label="路由"
                name="path"
                rules={[{ required: true, message: '不能为空' }]}
              >
                <Input disabled={modalType === 'check'} />
              </Form.Item>

              <Form.Item
                label="层级"
                name="level"
                rules={[{ required: true, message: '不能为空' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item label="节点" name="isNode">
                <Switch disabled={modalType === 'check'} />
              </Form.Item>
            </Form>
          }
        </DefineModal>
      )
    );
  }
}
export default MenuModal;
