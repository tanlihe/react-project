/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 18:41:19
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-08 01:34:23
 */
import axios from 'axios';
import { message } from 'antd';
import { getCookie } from '@/utils/cookie';

/**
 * axios 的全局默认配置
 */
axios.defaults.baseURL = '/api';

/**
 * axios 请求拦截
 */
axios.interceptors.request.use(
  config => {
    const token = getCookie('token') || '';
    // 设置请求头
    config.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', // FormDate
      'Content-Type': 'application/json', // json

      // 请求头添加 Authorization 参数
      Authorization: token,
    };

    return config;
  },
  err => {
    console.log(err);
  }
);

/**
 * axios 响应拦截
 */
axios.interceptors.response.use(
  response => {
    const { code = 200, msg = '请求失败' } = response.data;
    if (code !== 200) {
      // 这里可以做非常规返回的操作
      message.error(msg);
    }
    return response.data;
  },
  err => {
    console.log(err);
    // 这里可以做接口错误日志收集
    return err;
  }
);

// 封装 http GET 请求
export const requestGet = (url = '', params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 封装 http POST 请求
export const requestPost = (url = '', data = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
