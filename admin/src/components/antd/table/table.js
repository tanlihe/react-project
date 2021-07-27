/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-05-22 16:33:11
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-21 01:07:12
 */
import React, { Component } from 'react';
import { Table } from 'antd';

class DefineTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 设置默认的 pagination 参数
      defaultPagination: {
        current: 1,
        defaultCurrent: 1,
        pageSize: 10,
        defaultPageSize: 10,
        pageSizeOptions: [5, 10, 20, 50],
        showQuickJumper: true,
        showSizeChanger: true,
      },

      // 滚动高度
      scrollY: 300,
    };
  }

  // 格式化表格 pagination 参数
  formatPaginationParams(pagination = {}) {
    const { defaultPagination = {} } = this.state;
    const { total = 0, onChange = () => {} } = pagination;

    const showTotal = () => `共 ${total} 条`;

    return Object.assign({}, defaultPagination, pagination, {
      showTotal,
      onChange: (page, size) => {
        onChange && onChange(page, size);
      },
    });
  }

  caclScrollY() {
    const container = document.querySelector('.define-table-container');
    const thead = document.querySelector(
      '.define-table-container .ant-table-thead'
    );
    const pagination = document.querySelector(
      '.define-table-container .ant-pagination'
    );

    const containerHeight = container ? container.clientHeight : 0;
    const theadHeight = thead ? thead.clientHeight : 0;
    const paginationHeight = pagination ? pagination.clientHeight : 0;

    // 32 为 pagination 的上下 margin 值
    const scrollY = containerHeight - theadHeight - paginationHeight - 32;

    this.setState({
      scrollY,
    });
  }

  // 计算表格滚动区域的高度
  caclScrollYWhenUpdate(prevProps) {
    const { dataSource: prevDataSource } = prevProps;
    const { dataSource: dataSource } = this.props;
    if (
      dataSource.length &&
      JSON.stringify(prevDataSource) !== JSON.stringify(dataSource)
    ) {
      this.caclScrollY();
    }
  }

  componentDidMount() {
    // 监听 window resize 事件
    window.addEventListener('resize', () => this.caclScrollY(), false);
  }

  // 组件更新时，重新计算表格相关高度
  componentDidUpdate(prevProps) {
    this.caclScrollYWhenUpdate(prevProps);
  }

  // 组件销毁
  componentWillUnmount() {
    // 移除 window resize 事件
    window.removeEventListener('resize', () => this.calc(), false);
  }

  render() {
    let {
      pagination = {},
      showIndex = false, // 是否展示序号
      columns = [],
      dataSource = [],
      ...antdProps
    } = this.props;

    // 添加序号标题
    if (showIndex && !columns.find(i => i.title === '序号')) {
      columns.unshift({
        title: '序号',
        align: 'center',
        dataIndex: 'index',
        key: 'index',
        width: 80,
      });
    }

    // 添加序号内容
    if (showIndex && dataSource.length) {
      dataSource = dataSource.map((i, index) => {
        i.index = index + 1;
        return i;
      });
    }
    return (
      <Table
        className="define-table-container h-100-pc o-hidden"
        {...antdProps}
        columns={columns}
        dataSource={dataSource}
        pagination={
          pagination ? this.formatPaginationParams(pagination) : false
        }
        scroll={{ y: this.state.scrollY }}
        rowKey={row => row._id || row.key}
      />
    );
  }
}
export default DefineTable;
