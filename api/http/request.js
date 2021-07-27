/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-30 00:59:53
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-10 17:01:40
 */
const axios = require("axios");

/**
 * axios 的全局默认配置
 */
// axios.defaults.baseURL = "/api";

/**
 * axios 请求拦截
 */
axios.interceptors.request.use(
  (config) => {
    // 设置请求头
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",

      // 请求头添加 Authorization 参数
      Authorization: "Authorization",
    };

    return config;
  },
  (err) => {
    // console.log(err);
  }
);

/**
 * axios 响应拦截
 */
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    // console.log(err);
    // 这里可以做接口错误日志收集
    return err;
  }
);

// 封装 http GET 请求
const requestGet = (url = "", params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// 封装 http POST 请求
const requestPost = (url = "", data = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  requestGet,
  requestPost,
};
