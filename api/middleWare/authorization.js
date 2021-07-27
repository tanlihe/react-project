/*
 * @Descripttion: 处理 authorization 中间件，将 authorization 挂在到 req 请求体中供外部
 * @version:
 * @Author: Tang
 * @Date: 2021-06-05 12:23:59
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-01 19:24:11
 */
function checkAuthorization(req, res, next) {
  const { defineMiddleWare } = req;
  const { ErrorCode } = defineMiddleWare;
  const { authorization = "" } = req.headers;
  const loginPath = "/api/user/login";
  if (req.path === loginPath) {
    next();
    return false;
  }

  if (!authorization) {
    // 前端登录失效
    res.send(Object.assign({}, { data: null }, ErrorCode.IS_TOKEN_NOT_WORK));
  } else {
    req.authorization = authorization;
  }
  next();
}

module.exports = checkAuthorization;
