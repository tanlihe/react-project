/*
 * @Descripttion: 用于保存菜单相关数据到 Store 中
 * @version:
 * @Author: Tang
 * @Date: 2021-05-01 15:14:03
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-04 14:42:19
 */
import { MENU_ACTIONS } from '@/actions/menu';
import { cloneDeep } from '@/utils/lodash';
import { isDevelopment, isNotEmptyArray } from '@/utils/check';
const { GET_MENU_LIST_SUCCESS = '', GET_MENU_LIST_FAILED = '' } = MENU_ACTIONS;
import devConfig from './devConfig';

const initState = {
  list: [], // 菜单数据
  loading: false, // 接口是否加载完成
};

export default (state = initState, action) => {
  /**
   * 不可直接修改 state 里面的值，否则不会发生修改
   * 只能先复制，在整个替换，才能修改生效
   */
  const copyState = cloneDeep(state);
  switch (action.type) {
    // 导航菜单请求成功钩子
    case GET_MENU_LIST_SUCCESS:
      const { list = [] } = action.data;
      // 测试环境，添加测试路由
      if (isNotEmptyArray(list) && isDevelopment) {
        list.push(...devConfig);
      }
      return Object.assign({}, copyState, { list, loading: true });
    // 导航菜单请求失败钩子
    case GET_MENU_LIST_FAILED:
      return Object.assign({}, copyState, { list: [], loading: false });
    default:
      return state;
  }
};
