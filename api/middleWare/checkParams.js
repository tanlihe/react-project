/*
 * @Descripttion: 该中间件用于判断指定参数是否为空的情况
 * @version:
 * @Author: Tang
 * @Date: 2021-06-10 22:39:19
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-27 23:06:13
 */
const { cloneDeep } = require("../utils/lodash");
const { ErrorCode } = require("../config/constant");

/**
 *
 * @param {接收字段中需要检查的字段} keys
 * @param {接收的字段对象} params
 * @returns
 */
const hasEmptyParams = (keys = [], params = {}, res) => {
  let bool = false;
  for (let i = 0, len = keys.length; i < len; i++) {
    if (
      params[keys[i]] === null ||
      params[keys[i]] === undefined ||
      params[keys[i]] === ""
    ) {
      bool = keys[i];
      break;
    }
  }

  if (typeof bool !== "boolean") {
    res.send({
      data: null,
      code: ErrorCode.HAS_EMPTY_PARAMS.code,
      msg: `${bool} ${ErrorCode.HAS_EMPTY_PARAMS.msg}`,
    });
    // 存在非空参数
    return Promise.resolve(true);
  }
  // 不存在非空参数
  return Promise.resolve(false);
};

function checkParams(req, res, next) {
  const { defineMiddleWare = {} } = req;
  const cloneDefineMiddleWare = cloneDeep(defineMiddleWare);

  cloneDefineMiddleWare.hasEmptyParams = hasEmptyParams;

  req.defineMiddleWare = cloneDefineMiddleWare;
  next();
}

module.exports = checkParams;
