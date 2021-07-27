/*
 * @Descripttion: 用于保存系统配置参数相关数据到 Store 中
 * @version:
 * @Author: Tang
 * @Date: 2021-04-30 00:22:46
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-23 00:21:50
 */
import { SYSTEM_ACTIONS } from '@/actions/system';
import { cloneDeep } from '@/utils/lodash';
import { getLocalStorage, setLocalStorage } from '@/utils/cookie';

const initState = {
  menuCollapse: false, // 默认不收缩
  locale: 'zh_CN', // 默认中文
  tabRoutes: getLocalStorage('tabRoutes')
    ? JSON.parse(getLocalStorage('tabRoutes'))
    : [], // tabRoutes 信息
};

export default (state = initState, action) => {
  /**
   * 不可直接修改 state 里面的值，否则不会发生修改
   * 只能先复制，在整个替换，才能修改生效
   */
  const copyState = cloneDeep(state);
  switch (action.type) {
    // 切换菜单栏
    case SYSTEM_ACTIONS.SWITCH_MENU_COLLAPSE:
      copyState.menuCollapse = !copyState.menuCollapse;
      return copyState;
    // 切换国际化
    case SYSTEM_ACTIONS.SWITCH_LOCALE:
      copyState.locale = action.payload.locale;
      return copyState;
    // 改变 tabRoutes 数据
    case SYSTEM_ACTIONS.CHANGE_TAB_ROUTES:
      copyState.tabRoutes = action.payload.tabRoutes;
      setLocalStorage('tabRoutes', JSON.stringify(copyState.tabRoutes));
      return copyState;
    default:
      return state;
  }
};
