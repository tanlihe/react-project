/*
 * @Descripttion: 后端跨域
 * @version:
 * @Author: Tang
 * @Date: 2021-06-04 23:20:15
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-08 23:27:24
 */

/**
 *
 * @param {请求体} req
 * @param {响应体} res
 * @param {结束请求} next
 */
function crossDomain(req, res, next) {
  // 设置允许跨域的域名，* 代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  // 让 options 尝试请求快速结束
  if (req.method.toLowerCase() == "options") {
    res.send(200);
  }
  next();
}

module.exports = crossDomain;
