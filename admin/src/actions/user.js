/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-01 19:38:35
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-01 19:45:20
 */
export const USER_ACTIONS = {
  GET_USER_INFO_BY_SAGA: 'GET_USER_INFO_BY_SAGA', // 触发 saga 中间件自定义的调取菜单接口钩子,
  GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS', // 菜单栏 menuList 数据获取成功回调
  GET_USER_INFO_FAILED: 'GET_USER_INFO_FAILED', // 菜单栏 menuList 数据获取失败回调
};

// 通过 saga 中间件调取菜单接口
export const GET_USER_INFO_BY_SAGA = (param = {}) => ({
  type: USER_ACTIONS.GET_USER_INFO_BY_SAGA,
  param,
});

// menuList 接口获取数据成功回调 action
export const GET_USER_INFO_SUCCESS = data => ({
  type: USER_ACTIONS.GET_USER_INFO_SUCCESS,
  data,
});

// menuList 接口获取数据失败回调 action
export const GET_USER_INFO_FAILED = data => ({
  type: USER_ACTIONS.GET_USER_INFO_FAILED,
  data,
});
