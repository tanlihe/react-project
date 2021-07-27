/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-06 00:20:36
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-26 01:17:21
 */
const Router = require("./router");
const RoleModel = require("../model/role/role");

// 获取角色枚举
Router.get("/role/enum", async (req, res, next) => {
  const {
    defineMiddleWare: { ErrorCode },
  } = req;

  try {
    let findAsync = await RoleModel.find(
      {},
      { roleId: 1, roleDesc: 1, _id: 0 }
    );

    // 重置字段名
    findAsync = findAsync.map((i) => ({ value: i.roleId, label: i.roleDesc }));

    res.send(Object.assign({}, { data: findAsync }, ErrorCode.IS_OK));
  } catch (err) {
    res.send(Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 角色列表
Router.get("/role/list", async (req, res, next) => {
  const {
    defineMiddleWare: { ErrorCode },
    query,
  } = req;

  const {
    page = 1,
    size = 10,
    roleId = null,
    startTime = null,
    endTime = null,
  } = query;

  const multiple = [];

  if (roleId) {
    multiple.push({ roleId });
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
  const total = await RoleModel.find(condition).countDocuments();

  // 数据
  const doc = await RoleModel.find(condition, { __v: 0 })
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

// 添加角色
Router.post("/role/create", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    body,
  } = req;

  // 需要检查的参数
  const needCheck = ["roleId", "roleDesc", "permission"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, body, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  try {
    const { roleId = "", roleDesc = "", permission = [], buttons = [] } = body;

    const checkAsync = await RoleModel.find({ roleId });

    if (checkAsync.length) {
      return res.send(
        Object.assign({}, { data: null }, ErrorCode.IS_EXSIT, {
          msg: "新增角色ID已存在",
        })
      );
    }

    const createData = new RoleModel({
      roleId,
      roleDesc,
      permission,
      createdTime: new Date(),
      updatedTime: new Date(),
      buttons,
    });

    const saveAsync = await createData.save();

    const { _id = "" } = saveAsync;

    if (_id) {
      res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
    } else {
      res.send(Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR));
    }
  } catch (err) {}
});

// 查看角色信息
Router.get("/role/check", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    query,
  } = req;

  // 需要检查的参数
  const needCheck = ["id"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, query, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  const { id = "" } = query;

  const roleInfo = await RoleModel.findById(id, { __v: 0 });

  res.send(
    Object.assign(
      {},
      {
        data: roleInfo,
      },
      ErrorCode.IS_OK
    )
  );
});

// 更新用户信息
Router.post("/role/update", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    body,
  } = req;

  // 需要检查的参数
  const needCheck = ["id"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, body, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  const {
    id = "",
    roleId = "",
    roleDesc = "",
    permission = [],
    buttons = [],
  } = body;

  // updateData 添加存在值的情况
  const updateData = {
    updatedTime: new Date(),
  };

  if (roleId) {
    updateData.roleId = roleId;
  }

  if (roleDesc) {
    updateData.roleDesc = roleDesc;
  }

  if (permission && permission.length) {
    updateData.permission = permission;
  }

  if (buttons && buttons.length) {
    updateData.buttons = buttons;
  }

  try {
    // 更新数据
    const updateDataAsync = await RoleModel.findByIdAndUpdate(id, updateData);

    if (updateDataAsync) {
      res.send(
        Object.assign({}, ErrorCode.IS_OK, {
          data: null,
          msg: "更新角色成功",
        })
      );
    }
  } catch (err) {
    console.log(err);
    res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 删除角色
Router.get("/role/delete", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    query,
  } = req;

  // 需要检查的参数
  const needCheck = ["id"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, query, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  const { id = "" } = query;

  const deleteAsync = await RoleModel.findByIdAndDelete(id);

  if (deleteAsync) {
    res.send(
      Object.assign({}, ErrorCode.IS_OK, { data: null, msg: "删除成功" })
    );
  } else {
    res.send(Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR));
  }
});

module.exports = Router;
