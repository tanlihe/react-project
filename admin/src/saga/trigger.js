/*
 * @Descripttion: 该模块用于定义 saga 的自定义触发钩子
 * @version:
 * @Author: Tang
 * @Date: 2021-05-01 14:45:07
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 17:45:55
 */

import { takeEvery } from 'redux-saga/effects';
import { getMenuPermissionListBySaga } from './menu/menu';
import { checkUserByTokenBySaga } from './user/user';
import { MENU_ACTIONS } from '@/actions/menu';
import { USER_ACTIONS } from '@/actions/user';

/**
 * 自定义的 saga 触发器必须为 Generator 函数
 * 函数里面定义各类的 saga 触发函数，匹配到触发类型即可触发
 */
function* DeFineSagaTrigger() {
  /**
   * 导航菜单数据接口，在这里一般只是触发调取接口
   * 获取数据后的处理逻辑一般放在 reducers 里面执行，获取数据时，会相对应的执行对应的钩子
   */
  yield takeEvery(
    MENU_ACTIONS.GET_MENU_LIST_BY_SAGA,
    getMenuPermissionListBySaga
  );
  yield takeEvery(USER_ACTIONS.GET_USER_INFO_BY_SAGA, checkUserByTokenBySaga);
}

export default DeFineSagaTrigger;
