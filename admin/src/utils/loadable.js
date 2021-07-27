/*
 * @Descripttion: 自定义实现模拟简易的 react-loadable 组件懒加载
 * @version:
 * @Author: Tang
 * @Date: 2021-04-28 23:45:41
 * @LastEditors: Tang
 * @LastEditTime: 2021-04-29 00:02:36
 */

import React, { Component } from 'react';

const Loadable = ({ loader, loading: Loading }) => {
  return class LoadedComponent extends Component {
    state = {
      LoadedComponent: null,
    };

    componentDidMount() {
      loader().then(resp => {
        this.setState({
          LoadedComponent: resp.default,
        });
      });
    }

    render() {
      const { LoadedComponent } = this.state;
      return LoadedComponent ? <LoadedComponent /> : <Loading />;
    }
  };
};

export default Loadable;
