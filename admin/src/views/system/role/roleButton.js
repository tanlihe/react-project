/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-23 00:58:54
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-26 01:02:11
 */
import React, { Component, createRef } from 'react';
import DefineTable from '@/components/antd/table/table';
import DefineButton from '@/components/antd/button/button';
import DefineSearchBar from '@/components/define/searchBar';
import DefineMessage from '@/components/antd/message/message';

import { getRoleList, getRoleEnum, deleteRoleInfo } from '@/apis/role';
import { formatDate } from '@/utils/moment';

import RoleButtonModal from './components/roleButtonModal';

import { connect } from 'react-redux';
import { MENU_ACTIONS } from '@/actions/menu';

const mapDispatchToProps = dispatch => ({
  // 调取 saga 里面关于 菜单数据的接口钩子，并将菜单数据保存到 Store 中
  getMenuPermissionListBySaga(payload = {}) {
    dispatch({
      type: MENU_ACTIONS.GET_MENU_LIST_BY_SAGA,
      payload,
    });
  },
});

@connect(null, mapDispatchToProps)
class RoleSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleEnum: [],
      loading: false,
      tableData: [],
      columns: [
        {
          title: '角色名称',
          align: 'center',
          dataIndex: 'roleDesc',
          key: 'roleDesc',
          render: (text, record) => (
            <DefineButton
              type="link"
              size="small"
              onClick={() => this.checkRole(record)}
            >
              {record.roleDesc}
            </DefineButton>
          ),
        },
        {
          title: '角色 ID',
          align: 'center',
          dataIndex: 'roleId',
          key: 'roleId',
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
          render: (text, record) => (
            <>
              {/* <DefinePopconfirm
                title="确定删除该用户？"
                onConfirm={() => this.deleteRole(record)}
              >
                <DefineButton type="link" size="small">
                  删 除
                </DefineButton>
              </DefinePopconfirm> */}

              <DefineButton
                type="link"
                size="small"
                onClick={() => this.editRole(record)}
              >
                编 辑
              </DefineButton>
            </>
          ),
        },
      ],

      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },

      searchBarData: [
        {
          label: '角色 ID',
          name: 'roleId',
          value: null,
          attrs: {
            is: 'select',
            placeholder: '请选择角色',
            options: [],
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

      roleRef: createRef(),
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

  // 获取角色列表
  async getRoleList(searchBarData = {}) {
    this.setState({
      loading: true,
      tableData: [],
      pagination: Object.assign({}, this.state.pagination, { total: 0 }),
    });

    const {
      pagination: { current: page = 1, pageSize: size = 10 },
    } = this.state;

    const { createdTime = null, ...lastData } = searchBarData;

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

    const { code = 200, data = {} } = await getRoleList(params);
    if (code === 200) {
      const { pagination = {} } = this.state;
      const { list = [], total = 0 } = data;
      this.setState({
        tableData: list.map(i => {
          i.createdTime = formatDate(i.createdTime, 'YYYY-MM-DD hh:mm:ss');
          return i;
        }),
        loading: false,
        pagination: Object.assign({}, pagination, { total }),
      });
    }
  }

  // 删除角色
  async deleteRoleInfo(id = '') {
    const { code = 200 } = await deleteRoleInfo({ id });
    if (code === 200) {
      DefineMessage.success('删除成功');
      this.getRoleList();
    }
  }

  // 查看角色信息
  checkRole(row) {
    const { _id = '' } = row;
    this.state.roleRef.current.open(_id, 'check');
  }

  // 删除角色信息
  deleteRole(row) {
    const { _id = '' } = row;
    this.deleteRoleInfo(_id);
  }

  // 编辑角色
  editRole(row) {
    const { _id = '' } = row;
    this.state.roleRef.current.open(_id, 'edit');
  }

  handleSearch(v) {
    this.getRoleList(v);
  }

  handleCreate() {
    this.state.roleRef.current.open('', 'create');
  }

  handleReset(v) {
    this.getRoleList(v);
  }

  reloadList() {
    this.getRoleList();
    this.getRoleEnum();
  }

  componentDidMount() {
    this.getRoleEnum();
    this.getRoleList();

    // 更新权限菜单
    this.props.getMenuPermissionListBySaga();
  }

  render() {
    const { searchBarData = [], roleRef, roleEnum = [] } = this.state;
    return (
      <div
        className="w-100-pc h-100-pc"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <DefineSearchBar
          searchBarData={searchBarData}
          search={v => this.handleSearch(v)}
          reset={v => this.handleReset(v)}
        />

        <div className="table-wrap" style={{ flex: 1, height: 0 }}>
          <DefineTable
            loading={this.state.loading}
            columns={this.state.columns}
            dataSource={this.state.tableData}
            pagination={this.state.pagination}
            bordered
            showIndex
          />
        </div>

        <RoleButtonModal
          ref={roleRef}
          roleEnum={roleEnum}
          reloadList={() => this.reloadList()}
        />
      </div>
    );
  }
}
export default RoleSetting;
