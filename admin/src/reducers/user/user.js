/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-01 19:46:11
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-27 01:07:12
 */
import { USER_ACTIONS } from '@/actions/user';
import { cloneDeep } from '@/utils/lodash';
import { setLocalStorage } from '@/utils/cookie';
const { GET_USER_INFO_SUCCESS = '', GET_USER_INFO_FAILED = '' } = USER_ACTIONS;

const initState = {
  userInfo: {}, // 用户数据
};

export default (state = initState, action) => {
  /**
   * 不可直接修改 state 里面的值，否则不会发生修改
   * 只能先复制，在整个替换，才能修改生效
   */
  const copyState = cloneDeep(state);
  switch (action.type) {
    // 导航菜单请求成功钩子
    case GET_USER_INFO_SUCCESS:
      const userInfo = action.data;
      const { buttons = [] } = action.data;
      // 缓存用户权限按钮
      setLocalStorage('PERMISSION_BUTTONS', buttons);
      return Object.assign({}, copyState, { userInfo });
    // 导航菜单请求失败钩子
    case GET_USER_INFO_FAILED:
      return Object.assign({}, copyState, { userInfo: {} });
    default:
      return state;
  }
};
