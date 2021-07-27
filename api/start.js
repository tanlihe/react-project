/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 17:38:42
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-16 00:35:10
 */
const Express = require("express");
const app = Express();
const { resolve } = require("./utils/tool");
const { PORT } = require("./config/system");
const bodyParser = require("body-parser");

/**
 * 自定义中间件
 */
const mountConstants = require("./middleWare/constants"); // 挂载全局使用的常量变量
const crossDomain = require("./middleWare/crossDomain"); // 自定义 node 跨域中间件
const checkAuthorization = require("./middleWare/authorization"); // 自定义检车用户登录状态 authorization 是否仍然生效的中间件
const checkParams = require("./middleWare/checkParams"); // 检查接口是否存在指定参数为空的情况

const UserRouter = require("./router/user");
const MenuRouter = require("./router/menu");
const RoleRouter = require("./router/role");
const ButtonRouter = require("./router/button");

app
  .use(Express.static(resolve("./")))
  .use(mountConstants) // 挂载全局使用的常量变量，放在最开头使用

  /**
   * 第三方依赖中间件、插件等
   */
  .use(bodyParser.json()) // 解析 application/json
  .use(bodyParser.urlencoded({ extended: true })) // 解析 application/x-www-form-urlencoded

  /**
   * 跨域中间件
   */
  .use(crossDomain) // 自定义跨域中间件
  .use(checkAuthorization) // 自定义检车用户登录状态 authorization 是否仍然生效的中间件
  .use(checkParams)

  .use("/api", UserRouter)
  .use("/api", MenuRouter)
  .use("/api", RoleRouter)
  .use("/api", ButtonRouter)
  .listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
