/*
 * @Descripttion: 将全局用到的常量挂载到 req 中，全局常量应在 app 开头中使用
 * @version:
 * @Author: Tang
 * @Date: 2021-06-08 23:21:16
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-28 23:17:47
 */
const constant = require("../config/constant");
const { cloneDeep } = require("../utils/lodash");

function mountConstants(req, res, next) {
  const { defineMiddleWare = {} } = req;
  const cloneDefineMiddleWare = cloneDeep(
    Object.assign({}, defineMiddleWare, constant)
  );

  req.defineMiddleWare = cloneDefineMiddleWare;
  next();
}

module.exports = mountConstants;
