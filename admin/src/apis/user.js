/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-30 01:27:59
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 15:14:54
 */
import { requestGet, requestPost } from '@/http/request';

// 登录
export const getUserInfo = async (params = {}) => {
  return await requestGet('/user/login', params);
};

// 查询用户信息 - token
export const checkUserByToken = async (params = {}) => {
  return await requestGet('/user/checkByToken', params);
};

// 查询用户信息 - id
export const checkUserById = async (params = {}) => {
  return await requestGet('/user/checkById', params);
};

// 获取用户列表
export const getUserList = async (params = {}) => {
  return await requestGet('/user/list', params);
};

// 删除用户
export const deleteUser = async (params = {}) => {
  return await requestGet('/user/delete', params);
};

// 更新用户信息 /user/update
export const updateUser = async (params = {}) => {
  return await requestPost('/user/update', params);
};

// 新增用户
export const registerUser = async (params = {}) => {
  return await requestPost('/user/register', params);
};
