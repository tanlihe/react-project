/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-06 23:22:20
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-18 20:22:24
 */
import { requestGet, requestPost } from '@/http/request';

// 获取角色列表数据
export const getRoleList = async (params = {}) => {
  return await requestGet('/role/list', params);
};

// 获取角色枚举
export const getRoleEnum = async (params = {}) => {
  return await requestGet('/role/enum', params);
};

// 查看角色信息
export const checkRoleInfo = async (params = {}) => {
  return await requestGet('/role/check', params);
};

// 添加角色信息
export const createRoleInfo = async (params = {}) => {
  return await requestPost('/role/create', params);
};

// 删除角色信息
export const deleteRoleInfo = async (params = {}) => {
  return await requestGet('/role/delete', params);
};

// 更新角色信息
export const updateRoleInfo = async (params = {}) => {
  return await requestPost('/role/update', params);
};
