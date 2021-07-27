/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-27 17:06:42
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-26 01:47:11
 */
const mongoose = require("../db");

// 导航菜单数据结构
const UserSchema = mongoose.Schema({
  // 账号
  account: {
    type: String,
    required: true,
    trim: true,
  },

  // 密码
  password: {
    type: String,
    required: true,
    trim: true,
  },

  // 加密的账号
  md5Account: {
    type: String,
    required: true,
    trim: true,
  },

  // 加密的密码
  md5Password: {
    type: String,
    required: true,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  // 头像
  avatar: {
    type: String,
    trim: true,
  },

  // token
  token: {
    type: String,
    trim: true,
    default: "",
  },

  // 创建时间
  createdTime: {
    type: Date,
    default: new Date(),
  },

  // 更新时间
  updatedTime: {
    type: Date,
    default: new Date(),
  },

  // 验证码
  code: {
    type: String,
    trim: true,
    default: "",
  },

  // 简单描述
  desc: {
    type: String,
    default: "此人很懒，暂无描述",
  },

  roleId: {
    type: String,
    trim: true,
    required: true,
  },

  roleDesc: {
    type: String,
    trim: true,
  },
});

// 导出 model 供外部使用
module.exports = mongoose.model("User", UserSchema, "user");
