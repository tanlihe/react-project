/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-28 00:22:01
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 15:35:25
 */
import React, { Component } from 'react';
import DefineTable from '@/components/antd/table/table';
import DefineButton from '@/components/antd/button/button';
import DefinePopconfirm from '@/components/antd/popconfirm/popconfirm';
import DefineMessage from '@/components/antd/message/message';
import DefineSearchBar from '@/components/define/searchBar';
import UserModal from './components/userModal';

import { getUserList, deleteUser } from '@/apis/user';
import { getRoleEnum } from '@/apis/role';
import { formatDate } from '@/utils/moment';

import { Tooltip } from 'antd';
import { matchArray } from '@/utils/tools';

class UserSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleEnum: [],
      columns: [
        {
          title: '账号',
          align: 'center',
          dataIndex: 'account',
          key: 'account',
          render: (text, record) => (
            <DefineButton
              type="link"
              size="small"
              debounce={300}
              onClick={() => this.hanldeDetail(record, 'check')}
            >
              {text}
            </DefineButton>
          ),
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '角色',
          align: 'center',
          dataIndex: 'roleId',
          key: 'roleId',
          render: text =>
            matchArray(text, this.state.roleEnum, {
              key: 'value',
              value: 'label',
            }),
        },
        {
          title: '简述',
          align: 'center',
          dataIndex: 'desc',
          key: 'desc',
          render: desc => (
            <Tooltip placement="top" title={desc}>
              <div
                style={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {desc}
              </div>
            </Tooltip>
          ),
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createdTime',
          key: 'createdTime',
          width: 192,
        },
        {
          title: '操作',
          width: 160,
          align: 'center',
          key: 'operation',
          render: record => (
            <>
              <DefinePopconfirm
                title="确定删除该用户？"
                onConfirm={() => this.hanldeDetail(record, 'delete')}
              >
                <DefineButton type="link" size="small">
                  删除
                </DefineButton>
              </DefinePopconfirm>

              <DefineButton
                type="link"
                size="small"
                debounce={300}
                onClick={() => this.hanldeDetail(record, 'edit')}
              >
                编辑
              </DefineButton>
            </>
          ),
        },
      ],

      visible: false,
      loading: true,
      tableData: [],

      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        onChange: (page = 1, size = 10) => this.onChange(page, size),
      },

      searchBarData: [
        {
          label: '账号',
          name: 'account',
          value: null,
          attrs: {
            is: 'input',
            placeholder: '请输入账号',
          },
        },

        {
          label: '姓名',
          name: 'name',
          value: null,
          attrs: {
            is: 'input',
            placeholder: '请输入姓名',
          },
        },

        {
          label: '角色',
          name: 'roleId',
          value: null,
          attrs: {
            is: 'select',
            placeholder: '请选择角色',
            options: [],
          },
        },

        {
          label: '简述',
          name: 'desc',
          value: null,
          attrs: {
            is: 'input',
            placeholder: '请输入简述',
          },
        },

        {
          label: '创建时间',
          name: 'createdTime',
          value: null,
          attrs: {
            is: 'range-picker',
            separator: '-',
          },
        },
      ],

      userId: '',
      modalHandleType: '',
    };
  }

  // 获取角色枚举
  async getRoleEnum() {
    const { searchBarData = [] } = this.state;
    const { code = 200, data = {} } = await getRoleEnum();
    if (code === 200) {
      const _searchBarData = searchBarData.map(i => {
        if (i.name === 'roleId') {
          i.attrs.options = data;
        }
        return i;
      });
      this.setState({
        roleEnum: data,
        searchBarData: _searchBarData,
      });
    }
  }

  // 获取列表数据
  async getUserList(data = {}) {
    this.setState({
      loading: true,
      tableData: [],
      pagination: Object.assign({}, this.state.pagination, { total: 0 }),
    });

    const {
      pagination: { current: page = 1, pageSize: size = 10 },
    } = this.state;

    const { createdTime = null, ...lastData } = data;

    let startTime = null;
    let endTime = null;
    if (Array.isArray(createdTime) && createdTime.length) {
      startTime = formatDate(createdTime[0], 'YYYY-MM-DD 00:00:00');
      endTime = formatDate(createdTime[1], 'YYYY-MM-DD 23:59:59');
    }

    const params = {
      page,
      size,
      startTime,
      endTime,
      ...lastData,
    };

    const {
      code = 200,
      data: { list = [], total = 0 },
    } = await getUserList(params);

    if (code === 200) {
      this.setState({
        tableData: list.map(i => {
          i.createdTime = formatDate(i.createdTime, 'YYYY-MM-DD hh:mm:ss');
          return i;
        }),
        loading: false,
        pagination: Object.assign({}, this.state.pagination, { total }),
      });
    }
  }

  // 查看用户
  checkUser(record) {
    const { _id: userId = '' } = record;
    const { visible } = this.state;
    this.setState({
      visible: !visible,
      userId,
      modalHandleType: 'check',
    });
  }

  // 删除用户
  async deleteUser(id = '') {
    const { code = 200, msg = '' } = await deleteUser({ id });
    if (code === 200) {
      await this.getUserList();
      DefineMessage.success(msg);
    }
  }

  // 编辑用户，显示用户信息 modal
  editUser(record = {}) {
    const { _id: userId = '' } = record;
    const { visible } = this.state;
    this.setState({
      visible: !visible,
      userId,
      modalHandleType: 'edit',
    });
  }

  onChange(page = 1, size = 10) {
    this.setState(
      {
        pagination: Object.assign({}, this.state.pagination, {
          current: page,
          pageSize: size,
        }),
      },
      this.getUserList
    );
  }

  // 表格操作
  hanldeDetail(record, handleType = 'check') {
    const { _id = '' } = record;
    switch (handleType) {
      case 'check':
        this.checkUser(record);
        break;
      case 'delete':
        this.deleteUser(_id);
        break;
      case 'edit':
        this.editUser(record);
        break;
      case 'create':
        this.handleCreate();
        break;
      default:
        console.log('other');
        break;
    }
  }

  modalOnOk(bool = false) {
    this.setState(
      {
        visible: false,
      },
      () => {
        // 查看时不应该刷新列表
        if (bool) {
          this.getUserList();
        }
      }
    );
  }

  modalOnCancel() {
    this.setState({
      visible: false,
    });
  }

  handleSearch(v) {
    this.getUserList(v);
  }

  handleReset(v) {
    this.getUserList(v);
  }

  handleCreate() {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
      userId: '',
      modalHandleType: 'create',
    });
  }

  componentDidMount() {
    this.getRoleEnum();
    this.getUserList();
  }

  render() {
    const {
      columns,
      visible,
      userId = '',
      modalHandleType = '',
      searchBarData,
      roleEnum = [],
    } = this.state;
    return (
      <>
        <div
          className="w-100-pc h-100-pc"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DefineSearchBar
            searchBarData={searchBarData}
            search={v => this.handleSearch(v)}
            reset={v => this.handleReset(v)}
            create={() => this.hanldeDetail({}, 'create')}
          />

          <div className="table-wrap" style={{ flex: 1, height: 0 }}>
            <DefineTable
              loading={this.state.loading}
              columns={columns}
              dataSource={this.state.tableData}
              pagination={this.state.pagination}
              bordered
              showIndex
            />
          </div>
        </div>

        {visible && (
          <UserModal
            visible={visible}
            userId={userId}
            modalHandleType={modalHandleType}
            roleEnum={roleEnum}
            onOk={bool => this.modalOnOk(bool)}
            onCancel={() => this.modalOnCancel()}
          />
        )}
      </>
    );
  }
}
export default UserSetting;
