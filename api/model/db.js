/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 17:52:19
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-20 17:52:20
 */
const { mongodbUrl } = require("../config/system");
const mongoose = require("mongoose");

// 连接数据库
mongoose.connect(
  mongodbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("数据库连接失败");
    } else {
      console.log("数据库连接成功");
    }
  }
);

module.exports = mongoose;
