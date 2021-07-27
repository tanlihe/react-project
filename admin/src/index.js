/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 12:40:53
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-04 16:51:58
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from '@/store';

import FastClick from 'fastclick';

import '@/assets/less/index.less';

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      FastClick.attach(document.body);
    },
    false
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
