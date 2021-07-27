/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-27 17:14:55
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-26 23:49:33
 */
const Router = require("./router");
const UserModel = require("../model/user/user");
const md5 = require("md5-node");
const { matchArray } = require("../utils/tool");
const { getRoleEnum } = require("../common/common");

// 查看用户列表
Router.get("/user/list", async (req, res, next) => {
  const {
    defineMiddleWare: { ErrorCode },
    query,
  } = req;

  const {
    page = 1,
    size = 10,
    account = "",
    name = "",
    roleId = "",
    desc = "",
    startTime = null,
    endTime = null,
  } = query;

  const multiple = [];

  if (account) {
    multiple.push({ account: { $regex: new RegExp(`${account}`, "ig") } });
  }

  if (name) {
    multiple.push({ name: { $regex: new RegExp(`${name}`, "ig") } });
  }

  if (roleId) {
    multiple.push({ roleId });
  }

  if (desc) {
    multiple.push({ desc });
  }

  if (startTime && endTime) {
    multiple.push({
      createdTime: { $gte: new Date(startTime), $lt: new Date(endTime) },
    });
  }

  // 查询条件
  const condition = {};

  if (multiple.length) {
    condition.$and = multiple;
  }

  // 总量
  const total = await UserModel.find(condition).countDocuments();

  // 数据
  const doc = await UserModel.find(condition)
    // 分页处理
    .skip((Number.parseInt(page) - 1) * Number.parseInt(size))
    .limit(Number.parseInt(size));

  res.send(
    Object.assign(
      {},
      {
        data: {
          total,
          list: doc,
        },
      },
      ErrorCode.IS_OK
    )
  );
});

// 注册用户
Router.post("/user/register", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    body,
    headers,
  } = req;

  const { authorization = "" } = headers;

  const RoleEnum = await getRoleEnum(authorization);

  // 需要检查的参数
  const needCheck = ["account", "password"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, body, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  const {
    account = "",
    password = "",
    name = "",
    avatar = "",
    desc = "",
    roleId = "",
  } = body;

  // 检查是否存在当前注册用户
  const findExsitAsync = await UserModel.find({ account });

  if (findExsitAsync.length) {
    res.send(Object.assign({}, { data: null }, ErrorCode.IS_EXSIT));
    return false;
  }

  // 需要保存的数据
  const createData = new UserModel({
    account,
    password,
    md5Account: md5(account),
    md5Password: md5(password),
    name,
    avatar,
    token: md5(`${account}${password}`),
    createdTime: new Date(),
    updatedTime: new Date(),
    code: "",
    desc,
    roleId,
    roleDesc: matchArray(roleId, RoleEnum, {
      key: "value",
      value: "label",
    }),
  });

  const saveAsync = await createData.save();

  const { _id = "" } = saveAsync;

  if (_id) {
    res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
  } else {
    res.send(Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 删除用户
Router.get("/user/delete", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    query,
  } = req;

  const { id } = query;

  // 检查参数是否存在空的情况
  const checkParamAsync = await hasEmptyParams(["id"], query, res);

  if (checkParamAsync) return false;

  const deleteAsync = await UserModel.findByIdAndDelete(id);

  if (deleteAsync) {
    res.send(
      Object.assign({}, ErrorCode.IS_OK, { data: null, msg: "删除成功" })
    );
  } else {
    res.send(Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 更新用户信息
Router.post("/user/update", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    body,
    headers,
  } = req;

  const { authorization = "" } = headers;

  const RoleEnum = await getRoleEnum(authorization);

  // 限制允许修改的字段，id不算
  const {
    id,
    password = "",
    name = "",
    avatar = "",
    desc = "",
    roleId = "",
  } = body;

  // 检查参数是否存在空的情况
  const checkParamAsync = await hasEmptyParams(["id"], body, res);

  if (checkParamAsync) return false;

  try {
    // 查询当前用户
    const currentUserAsync = await UserModel.findById(id);
    // 用户是否存在
    if (!currentUserAsync) {
      res.send(
        Object.assign({}, ErrorCode.IS_DATABASE_ERROR, {
          data: null,
          msg: "暂无该用户",
        })
      );
    } else {
      const { account = "" } = currentUserAsync;

      // updateData 添加存在值的情况
      const updateData = {
        updatedTime: new Date(),
      };
      if (password) {
        updateData.password = password;
        updateData.md5Password = md5(password);
        updateData.token = md5(`${account}${password}`);
      }
      if (name) {
        updateData.name = name;
      }
      if (avatar) {
        updateData.avatar = avatar;
      }

      if (desc) {
        updateData.desc = desc;
      }

      if (roleId) {
        updateData.roleId = roleId;
        // 待更改为查询 role 表获取数据修改
        updateData.roleDesc = matchArray(roleId, RoleEnum, {
          key: "value",
          value: "label",
        });
      }

      // 更新数据
      const updateDataAsync = await UserModel.findByIdAndUpdate(id, updateData);

      if (updateDataAsync) {
        res.send(
          Object.assign({}, ErrorCode.IS_OK, {
            data: null,
            msg: "更新用户成功",
          })
        );
      }
    }
  } catch (err) {
    res.send(
      Object.assign(
        {},
        { data: JSON.stringify(err) },
        ErrorCode.IS_DATABASE_ERROR
      )
    );
  }
});

// 查询用户（通过用户 id 来查询）
Router.get("/user/checkById", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    query,
  } = req;

  const { id = "" } = query;

  const needCheck = ["id"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, query, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  try {
    const userInfo = await UserModel.findById(id, {
      __v: 0,
      token: 0,
      roleDesc: 0,
      md5Account: 0,
      md5Password: 0,
      createdTime: 0,
      updatedTime: 0,
    });

    res.send(Object.assign({}, ErrorCode.IS_OK, { data: userInfo }));
  } catch (err) {
    res.send(Object.assign({}, ErrorCode.IS_DATABASE_ERROR, { data: err }));
  }
});

// 查询用户（通过用户 token 来查询）
Router.get("/user/checkByToken", async (req, res, next) => {
  const {
    defineMiddleWare: { ErrorCode },
  } = req;

  const {
    headers: { authorization = "" },
  } = req;

  try {
    const userInfo = await UserModel.aggregate([
      {
        $lookup: {
          from: "role",
          localField: "roleId",
          foreignField: "roleId",
          as: "roleInfo",
        },
      },
      {
        $match: {
          token: { $eq: authorization },
        },
      },
      {
        // 不显示的字段
        $project: {
          __v: 0,
          token: 0,
          roleDesc: 0,
          account: 0,
          password: 0,
          md5Account: 0,
          md5Password: 0,
          createdTime: 0,
          updatedTime: 0,
        },
      },
    ]);

    const { roleInfo = [], ...lastUserInfo } = userInfo[0];
    const { buttons = [], permission = [] } = roleInfo[0];

    res.send(
      Object.assign({}, ErrorCode.IS_OK, {
        data: Object.assign({}, lastUserInfo, { buttons, permission }),
      })
    );
  } catch (err) {
    console.log(err);
    res.send(Object.assign({}, ErrorCode.IS_DATABASE_ERROR, { data: err }));
  }
});

// 登录
Router.get("/user/login", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    query,
  } = req;

  const { md5Account = "", md5Password = "" } = query;

  const needCheck = ["md5Account", "md5Password"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, query, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  try {
    const userInfo = await UserModel.find({ md5Account, md5Password });

    if (!userInfo.length) {
      res.send(Object.assign({}, ErrorCode.IS_NOT_FOUND_USER, { data: null }));
      return;
    }

    const sendData = userInfo.length ? userInfo[0] : null;

    if (sendData) {
      const { token = "" } = sendData;
      res.cookie("token", token);
    }

    res.send(
      Object.assign({}, ErrorCode.IS_OK, {
        data: null,
      })
    );
  } catch (err) {
    res.send(Object.assign({}, ErrorCode.IS_DATABASE_ERROR, { data: err }));
  }
});

module.exports = Router;
