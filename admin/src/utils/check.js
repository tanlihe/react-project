/*
 * @Descripttion: 用于检测的小工具
 * @version:
 * @Author: Tang
 * @Date: 2021-04-26 01:29:31
 * @LastEditors: Tang
 * @LastEditTime: 2021-05-05 16:35:31
 */
import {
  isString as checkString,
  isNumber as checkNumber,
  isFunction as checkFunction,
  isBoolean as checkBoolean,
  isArray as checkArray,
  isPlainObject as checkPlainObject,
} from './lodash';

// 是否为开发环境
export const isDevelopment = process.env.NODE_ENV === 'development';

// 是否为字符串
export const isString = str => checkString(str);

// 是否为数字
export const isNumber = num => checkNumber(num);

// 是否为字符串
export const isBoolean = bool => checkBoolean(bool);

// 是否为函数
export const isFunction = func => checkFunction(func);

// 是否为普通对象
export const isPlainObject = o => checkPlainObject(o);

// 是否为数组
export function isArray(data = []) {
  return checkArray(data);
}

// 是否为空数组
export function isEmptyArray(data) {
  return isArray(data) && !data.length;
}

// 是否为非空数组
export function isNotEmptyArray(data) {
  return isArray(data) && data.length;
}
