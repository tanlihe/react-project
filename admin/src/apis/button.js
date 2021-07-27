/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-18 17:12:40
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 23:40:12
 */

import { requestGet, requestPost } from '@/http/request';

// 获取页面按钮信息
export const getPageButtonList = async (params = {}) => {
  return await requestGet('/button/list', params);
};

// 添加页面按钮信息
export const createPageButton = async (params = {}) => {
  return await requestPost('/button/create', params);
};

// 删除页面按钮信息
export const deletePageButton = async (params = {}) => {
  return await requestGet('/button/delete', params);
};

// 更新页面按钮信息
export const updatePageButton = async (params = {}) => {
  return await requestPost('/button/update', params);
};

// 页面按钮
export const pageButtons = async (params = {}) => {
  return await requestGet('/button/pageButton', params);
};
