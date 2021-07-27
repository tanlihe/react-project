/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-27 21:36:08
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-10 17:32:11
 */
// 接口错误码
const ErrorCode = {
  IS_OK: { code: 200, msg: "请求正常" },
  HAS_EMPTY_PARAMS: { code: 100001, msg: "字段不能为空" },
  IS_EXSIT: { code: 100002, msg: "已存在该数据" },
  IS_DATABASE_ERROR: { code: 200001, msg: "数据库出错了" },
  IS_NOT_FOUND_USER: { code: 300001, msg: "当前用户未存在" },
  IS_TOKEN_NOT_WORK: { code: 999999, msg: "用户 Token 已失效" },
};

// 角色枚举
const RoleEnum = [
  { roleId: "common", roleDesc: "普通用户" },
  { roleId: "admin", roleDesc: "管理员" },
  { roleId: "system", roleDesc: "系统管理员" },
];

module.exports = {
  ErrorCode,
  RoleEnum,
};
