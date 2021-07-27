/*
 * @Descripttion: 系统设置相关 action
 * @version:
 * @Author: Tang
 * @Date: 2021-04-30 00:39:31
 * @LastEditors: Tang
 * @LastEditTime: 2021-05-06 00:57:16
 */
export const SYSTEM_ACTIONS = {
  // 是否收缩菜单栏
  SWITCH_MENU_COLLAPSE: 'SWITCH_MENU_COLLAPSE',
  // 国际化
  SWITCH_LOCALE: 'SWITCH_LOCALE',
  // 改变 tabRoutes 数据
  CHANGE_TAB_ROUTES: 'CHANGE_TAB_ROUTES',
};

// 切换菜单栏 action
export const SWITCH_MENU_COLLAPSE = () => {
  return {
    type: SYSTEM_ACTIONS.SWITCH_MENU_COLLAPSE,
  };
};

// 切换国际化语言
export const SWITCH_LOCALE = locale => {
  return {
    type: SYSTEM_ACTIONS.SWITCH_LOCALE,
    payload: {
      locale,
    },
  };
};

// 改变 tabRoutes 数据
export const CHANGE_TAB_ROUTES = (tabRoutes = []) => {
  return {
    type: SYSTEM_ACTIONS.CHANGE_TAB_ROUTES,
    payload: {
      tabRoutes,
    },
  };
};
