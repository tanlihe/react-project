/*
 * @Descripttion: 引用 lodash 的部分方法
 * @version:
 * @Author: Tang
 * @Date: 2021-05-01 19:06:11
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-04 16:45:41
 */
import _ from 'lodash';

// 深拷贝
export const cloneDeep = o => _.cloneDeep(o);

// 检查 value 是否是原始字符串String或者对象
export const isString = str => _.isString(str);

// 检查 value 是否是原始Number数值型 或者 对象
export const isNumber = num => _.isNumber(num);

// 检查 value 是否是 Function 对象
export const isFunction = fun => _.isFunction(fun);

// 检查 value 是否是原始 boolean 类型或者对象
export const isBoolean = bool => _.isBoolean(bool);

// 检查目标是否为一个数组
export const isArray = arr => _.isArray(arr);

// 检查目标是否为一个普通对象，数组那些不算
export const isPlainObject = v => _.isPlainObject(v);

// 防抖
export const debounce = _.debounce;

// 节流
export const throttle = _.throttle;
