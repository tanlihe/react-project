/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-04-30 00:14:48
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-04 14:40:39
 */
import { combineReducers } from 'redux';
// import system from './system';
import menu from './menu/menu';
import user from './user/user';

// 合并各个模块的 reducers，并导出给 store 使用
export default combineReducers({
  // system,
  menu,
  user,
});
