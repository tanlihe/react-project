/*
 * @Descripttion: 导航菜单栏相关 action
 * @version:
 * @Author: Tang
 * @Date: 2021-05-01 15:05:39
 * @LastEditors: Tang
 * @LastEditTime: 2021-05-01 17:33:09
 */
export const MENU_ACTIONS = {
  GET_MENU_LIST_BY_SAGA: 'GET_MENU_LIST_BY_SAGA', // 触发 saga 中间件自定义的调取菜单接口钩子,
  GET_MENU_LIST_SUCCESS: 'GET_MENU_LIST_SUCCESS', // 菜单栏 menuList 数据获取成功回调
  GET_MENU_LIST_FAILED: 'GET_MENU_LIST_FAILED', // 菜单栏 menuList 数据获取失败回调
};

// 通过 saga 中间件调取菜单接口
export const GET_MENU_LIST_BY_SAGA = (param = {}) => ({
  type: MENU_ACTIONS.GET_MENU_LIST_BY_SAGA,
  param,
});

// menuList 接口获取数据成功回调 action
export const GET_MENU_LIST_SUCCESS = data => ({
  type: MENU_ACTIONS.GET_MENU_LIST_SUCCESS,
  data,
});

// menuList 接口获取数据失败回调 action
export const GET_MENU_LIST_FAILED = data => ({
  type: MENU_ACTIONS.GET_MENU_LIST_FAILED,
  data,
});
