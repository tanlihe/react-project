/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-04 16:45:51
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-27 00:35:34
 */
import { getLocalStorage } from '@/utils/cookie';

// 判断两个对象内容是否一样（不同的对象指针）
export function isObjectDiff(obj1, obj2) {
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  // 判断是不是对象
  if (!o1 || !o2) {
    return obj1 === obj2;
  }

  // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (var o in obj1) {
    var t1 = obj1[o] instanceof Object;
    var t2 = obj2[o] instanceof Object;
    if (t1 && t2) {
      return isObjectDiff(obj1[o], obj2[o]);
    } else if (obj1[o] !== obj2[o]) {
      return false;
    }
  }
  return true;
}

/**
 * 匹配数组
 * @param {待匹配的 key} key
 * @param {数组内容} array
 * @param {别名} alias
 * @returns
 */
export const matchArray = (
  key = '',
  array = [],
  alias = { key: 'key', value: 'value' }
) => {
  const match = array.filter(i => key === i[alias.key]);

  if (!match.length) return '暂无匹配数据';

  return match.length ? match[0][alias.value] : '暂无匹配数据';
};

/**
 * 按钮权限检查
 */
export const hasPermissionButtonCode = (button_code = '') => {
  const permissionButtons = getLocalStorage('PERMISSION_BUTTONS').split(',');
  return permissionButtons.includes(button_code);
};
