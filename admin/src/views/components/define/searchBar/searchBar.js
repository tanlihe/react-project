/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-04 14:36:39
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-04 23:54:47
 */
/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-21 23:44:47
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-04 01:45:34
 */
import React, { Component } from 'react';
import DefineSearchBar from '@/components/define/searchBar';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarData: [
        {
          label: '账号',
          name: 'account',
          value: 'tang',
          attrs: {
            is: 'input',
            placeholder: '请输入账号',
          },
        },

        {
          label: '姓名',
          name: 'name',
          value: 'aasca',
          attrs: {
            is: 'input',
            placeholder: '请输入姓名',
          },
        },

        {
          label: '角色',
          name: 'role',
          value: 'common',
          attrs: {
            is: 'select',
            placeholder: '请选择角色',
            options: [
              {
                label: '普通用户',
                value: 'common',
              },
              {
                label: '管理员',
                value: 'admin',
              },
              {
                label: '系统管理员',
                value: 'system',
              },
            ],
          },
        },

        {
          label: '喜好',
          name: 'hobit',
          value: ['A', 'B', 'D'],
          attrs: {
            is: 'checkbox',
            options: [
              { label: 'A', value: 'A' },
              { label: 'B', value: 'B' },
              { label: 'C', value: 'C' },
              { label: 'D', value: 'D' },
            ],
          },
        },
      ],
    };
  }

  handleSearch(v) {
    console.log(v);
  }

  handleReset(v) {
    console.log(v);
  }

  render() {
    const { searchBarData } = this.state;
    return (
      <div className="search-bar-page w-100-pc h-100-pc">
        <DefineSearchBar
          searchBarData={searchBarData}
          search={v => this.handleSearch(v)}
          reset={v => this.handleReset(v)}
        />
      </div>
    );
  }
}
export default SearchBar;
