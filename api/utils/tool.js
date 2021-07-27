/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 17:39:41
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-28 23:33:01
 */
const path = require("path");

const resolve = (url) => path.join(`${__dirname}/../${url}`);

// 匹配数组
const matchArray = (
  key = "",
  array = [],
  alias = { key: "key", value: "value" }
) => {
  const match = array.filter((i) => key === i[alias.key]);

  if (!match.length) return "暂无匹配数据";

  return match.length ? match[0][alias.value] : "暂无匹配数据";
};

module.exports = {
  resolve,
  matchArray,
};
