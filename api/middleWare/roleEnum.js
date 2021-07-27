/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-10 16:54:25
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-10 16:58:54
 */
const { requestGet } = require("../http/request");
const { cloneDeep } = require("../utils/lodash");

async function setRoleEnum(req, res, next) {
  const { defineMiddleWare = {}, authorization = "" } = req;

  const roleEnumAsync = await requestGet(
    "http://127.0.0.1:9989/api/role/enum",
    {},
    {
      headers: {
        authorization,
      },
    }
  );

  const { data: RoleEnum = [] } = roleEnumAsync;

  const cloneDefineMiddleWare = cloneDeep(
    Object.assign({}, defineMiddleWare, RoleEnum)
  );

  req.defineMiddleWare = cloneDefineMiddleWare;
  next();
}

module.exports = setRoleEnum;
