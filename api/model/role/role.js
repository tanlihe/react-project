/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-06 00:17:34
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 19:34:54
 */
const mongoose = require("../db");

// 导航菜单数据结构
const RoleSchema = mongoose.Schema({
  // 角色 id
  roleId: {
    type: String,
    required: true,
    trim: true,
  },

  // 角色名称
  roleDesc: {
    type: String,
    required: true,
    trim: true,
  },

  // 角色权限
  permission: {
    type: Array,
    required: true,
  },

  // 创建时间
  createdTime: {
    type: Date,
  },

  // 更新时间
  updatedTime: {
    type: Date,
  },

  buttons: {
    type: Array,
    default: [],
  },
});

// 导出 model 供外部使用
module.exports = mongoose.model("Role", RoleSchema, "role");
