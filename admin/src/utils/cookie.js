/*
 * @Descripttion: cookie 相关的工具方法
 * @version:
 * @Author: Tang
 * @Date: 2021-04-24 23:56:08
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-30 01:37:06
 */
import jsCookie from 'js-cookie';

// 设置 cookie
export const setCookie = (key = '', value = '', options = {}) =>
  jsCookie.set(key, value, options);

// 获取 cookie
export const getCookie = key => jsCookie.get(key);

// 移除指定的 cookie
export const removeCookie = key => jsCookie.remove(key);

// 获取 localStorage 中的某一个值
export const getLocalStorage = key => window.localStorage.getItem(key);

// 设置 localStorage 中的某一个值
export const setLocalStorage = (key = '', value = '') =>
  window.localStorage.setItem(key, value);

// 删除 sessionStorage 中的某一个值
export const removeLocalStorage = key => window.localStorage.removeItem(key);

// 获取 localStorage 中的某一个值
export const getSessionStorage = key => window.sessionStorage.getItem(key);

// 设置 localStorage 中的某一个值
export const setSessionStorage = (key = '', value = '') =>
  window.sessionStorage.setItem(key, value);

// 删除 localStorage 中的某一个值
export const removeSessionStorage = key =>
  window.sessionStorage.removeItem(key);
