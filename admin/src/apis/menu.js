/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 18:42:06
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 17:46:51
 */
import { requestGet, requestPost } from '@/http/request';

// 获取所有菜单栏数据
export const getMenuAllList = async (params = {}) => {
  return await requestGet('/menu/list', params);
};

// 获取权限菜单栏数据
export const getMenuPermissionList = async (params = {}) => {
  return await requestGet('/menu/permission/list', params);
};

// 添加一级菜单
export const createFirstLevelMenu = async (params = {}) => {
  return await requestPost('/menu/firstLevel/create', params);
};

// 编辑一级菜单
export const updateFirstLevelMenu = async (params = {}) => {
  return await requestPost('/menu/firstLevel/update', params);
};

// 删除一级菜单
export const deleteFirstLevelMenu = async (params = {}) => {
  return await requestGet('/menu/firstLevel/delete', params);
};

// 添加二级菜单
export const createSecondLevelMenu = async (params = {}) => {
  return await requestPost('/menu/secondLevel/create', params);
};

// 编辑二级菜单
export const updateSecondLevelMenu = async (params = {}) => {
  return await requestPost('/menu/secondLevel/update', params);
};

// 删除二级菜单
export const deleteSecondLevelMenu = async (params = {}) => {
  return await requestGet('/menu/secondLevel/delete', params);
};

// 添加三级菜单
export const createThirdLevelMenu = async (params = {}) => {
  return await requestPost('/menu/thirdLevel/create', params);
};

// 编辑三级菜单
export const updateThirdLevelMenu = async (params = {}) => {
  return await requestPost('/menu/thirdLevel/update', params);
};

// 删除三级菜单
export const deleteThirdLevelMenu = async (params = {}) => {
  return await requestGet('/menu/thirdLevel/delete', params);
};
