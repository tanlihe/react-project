/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-10 22:43:38
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-20 00:48:43
 */
import React, { Component, createRef } from 'react';
import DefineTable from '@/components/antd/table/table';
import DefineButton from '@/components/antd/button/button';
import { getPageButtonList, deletePageButton } from '@/apis/button';
import TableModal from './tableModal';
import DefineMessage from '@/components/antd/message/message';
import DefinePopconfirm from '@/components/antd/popconfirm/popconfirm';
import { Button } from 'antd';
import { formatDate } from '@/utils/moment';

class ButtonTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableModalRef: createRef(),
      loading: false,
      tableData: [],
      columns: [
        {
          title: '按钮名称',
          align: 'center',
          dataIndex: 'buttonName',
          key: 'buttonName',
          editable: true,
        },
        {
          title: '按钮 ID',
          align: 'center',
          dataIndex: 'buttonId',
          key: 'buttonId',
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createdTime',
          key: 'createdTime',
          width: 192,
        },
        {
          title: '更新时间',
          align: 'center',
          dataIndex: 'updatedTime',
          key: 'updatedTime',
          width: 192,
        },
        {
          title: '操作',
          align: 'center',
          key: 'operation',
          render: (text, record) => (
            <>
              <Button
                type="link"
                size="small"
                onClick={() => this.handleEdit(record)}
              >
                编 辑
              </Button>

              <DefinePopconfirm
                title="确定删除该用户？"
                onConfirm={() => this.handleDelete(record)}
              >
                <DefineButton type="link" size="small">
                  删除
                </DefineButton>
              </DefinePopconfirm>
            </>
          ),
        },
      ],
    };
  }

  // 查看页面的按钮信息
  getPageButtonList(pageId = '') {
    this.setState(
      {
        loading: true,
        tableData: [],
      },
      async () => {
        const { code = 200, data = {} } = await getPageButtonList({ pageId });
        if (code === 200) {
          this.setState({
            loading: false,
            tableData: data.map(i => {
              i.handleStatus = 'check';
              i.createdTime = formatDate(i.createdTime, 'YYYY-MM-DD hh:mm:ss');
              i.updatedTime = formatDate(i.updatedTime, 'YYYY-MM-DD hh:mm:ss');
              return i;
            }),
          });
        }
      }
    );
  }

  // 删除按钮
  async deletePageButton({ pageId = '', buttonId = '' }) {
    const { code = 200 } = await deletePageButton({ pageId, buttonId });
    if (code === 200) {
      DefineMessage.success('删除成功');
      this.refreshTable();
    }
  }

  // 添加按钮
  handleCreate() {
    const [pageId = '', pageName = ''] = this.props.menuId.split(',');
    this.state.tableModalRef.current.open('create', {
      pageId,
      pageName,
      buttonId: '',
      buttonName: '',
    });
  }

  // 编辑按钮
  handleEdit(record) {
    const { buttonId = '', buttonName = '', _id = '' } = record;
    const [pageId = '', pageName = ''] = this.props.menuId.split(',');
    this.state.tableModalRef.current.open('edit', {
      id: _id,
      pageId,
      pageName,
      buttonId,
      buttonName,
    });
  }

  handleDelete(record) {
    const { pageId = '', buttonId = '' } = record;
    this.deletePageButton({ pageId, buttonId });
  }

  refreshTable() {
    const [pageId = ''] = this.props.menuId.split(',');
    this.getPageButtonList(pageId);
  }

  componentDidUpdate(prevProps) {
    const { menuId: prevMenuId = '' } = prevProps;
    const { menuId: currentMenuId = '' } = this.props;

    if (currentMenuId !== prevMenuId) {
      const [pageId = ''] = currentMenuId.split(',');
      this.getPageButtonList(pageId);
    }
  }

  render() {
    return (
      <div
        className="w-100-pc h-100-pc"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <header
          className="header"
          style={{
            height: '40px',
            lineHeight: '40px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '18px', fontWeight: 'bolder' }}>
            按钮权限
          </span>
          {this.props.menuId && (
            <DefineButton type="primary" onClick={() => this.handleCreate()}>
              添加
            </DefineButton>
          )}
        </header>

        <div className="table-wrap" style={{ flex: 1, height: 0 }}>
          <DefineTable
            loading={this.state.loading}
            columns={this.state.columns}
            dataSource={this.state.tableData}
            bordered
            showIndex
            pagination={false}
          />
        </div>

        <TableModal
          ref={this.state.tableModalRef}
          refreshTable={() => this.refreshTable()}
        />
      </div>
    );
  }
}
export default ButtonTable;
