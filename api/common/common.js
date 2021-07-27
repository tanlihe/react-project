/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-10 17:04:42
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-10 17:06:57
 */
const { requestGet } = require("../http/request");

async function getRoleEnum(authorization = "") {
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

  return RoleEnum;
}

module.exports = {
  getRoleEnum,
};
