/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-18 16:15:01
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-18 16:36:41
 */
const mongoose = require("../db");

// 导航菜单数据结构
const ButtonSchema = mongoose.Schema({
  pageId: {
    type: String,
    required: true,
    trim: true,
  },
  // 按钮 id
  buttonId: {
    type: String,
    required: true,
    trim: true,
  },

  // 按钮名称
  buttonName: {
    type: String,
    required: true,
    trim: true,
  },

  // 创建时间
  createdTime: {
    type: Date,
  },

  // 创建时间
  updatedTime: {
    type: Date,
  },
});

// 导出 model 供外部使用
module.exports = mongoose.model("Button", ButtonSchema, "button");
