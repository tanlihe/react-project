/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 17:53:19
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-25 17:08:50
 */
const mongoose = require("../db");

// 导航菜单数据结构
const MenuSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },

  icon: {
    type: String,
    trim: true,
  },

  children: {
    type: Array,
    default: [],
  },

  nodeId: {
    type: String,
    require: true,
    trim: true,
  },

  parentId: {
    type: String,
    trim: true,
  },

  level: {
    type: Number,
  },

  isNode: {
    type: Boolean,
    default: false,
  },
});

// 导出 model 供外部使用
module.exports = mongoose.model("Menu", MenuSchema, "menu");
