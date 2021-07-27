/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-01 19:36:59
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-01 19:58:49
 */
import { put } from 'redux-saga/effects';
import { GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILED } from '@/actions/user';
import { checkUserByToken } from '@/apis/user';

/**
 * 一般使用 Generator 函数
 * saga 通过对应的钩子请求 menu 数据
 * 获取数据成功则通过 action.type = GET_USER_INFO_SUCCESS 的钩子去修改 store 里面对应的数据
 * 获取数据失败则通过 action.type = GET_USER_INFO_FAILED 的钩子去修改 store 里面对应的数据
 */
export function* checkUserByTokenBySaga(payload) {
  const { payload: params = {} } = payload; // 取别名
  const res = yield checkUserByToken(params);
  const { data = {}, code = 200 } = res;

  if (code === 200) {
    // 成功时的 reducers 钩子
    yield put(GET_USER_INFO_SUCCESS(data));
  } else {
    // 失败时的 reducers 钩子
    yield put(GET_USER_INFO_FAILED({}));
  }
  return res;
}
