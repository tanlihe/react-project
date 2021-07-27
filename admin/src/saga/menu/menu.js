/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-05-01 14:47:55
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 17:45:43
 */
import { put } from 'redux-saga/effects';
import { GET_MENU_LIST_SUCCESS, GET_MENU_LIST_FAILED } from '@/actions/menu';
import { getMenuPermissionList } from '@/apis/menu';

/**
 * 一般使用 Generator 函数
 * saga 通过对应的钩子请求 menu 数据
 * 获取数据成功则通过 action.type = GET_MENU_LIST_SUCCESS 的钩子去修改 store 里面对应的数据
 * 获取数据失败则通过 action.type = GET_MENU_LIST_FAILED 的钩子去修改 store 里面对应的数据
 */
export function* getMenuPermissionListBySaga(payload) {
  const { payload: params } = payload; // 取别名
  const res = yield getMenuPermissionList(params);
  const { data: list = [], code = 200 } = res;

  if (code === 200) {
    // 成功时的 reducers 钩子
    yield put(GET_MENU_LIST_SUCCESS({ list }));
  } else {
    // 失败时的 reducers 钩子
    yield put(GET_MENU_LIST_FAILED({ list: [] }));
  }
  return res;
}
