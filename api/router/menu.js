/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 17:58:34
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-26 23:50:00
 */
const mongoose = require("../model/db");
const Router = require("./router");
const MenuLevelFirstModel = require("../model/menu/menuLevelFirst");
const MenuLevelSecondModel = require("../model/menu/menuLevelSecond");
const MenuLevelThirdModel = require("../model/menu/menuLevelThird");
const UserModel = require("../model/user/user");
const RoleModel = require("../model/role/role");

/* -------------------------------------------------------------------- */
// 一级菜单
(() => {
  Router.get("/menu/firstLevel/check", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      query,
    } = req;

    const needCheck = ["id"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, query, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    const { id = "" } = query;

    try {
      const checkAsync = await MenuLevelFirstModel.findById(id);
      const { _id = "" } = checkAsync;

      if (_id) {
        res.send(Object.assign({}, { data: checkAsync }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });

  // 添加一级菜单
  Router.post("/menu/firstLevel/create", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      body,
    } = req;

    const needCheck = ["nodeId", "path", "title"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, body, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    try {
      const {
        title = "",
        path = "",
        nodeId = "",
        icon = "",
        isNode = false,
      } = body;

      const checkAsync = await MenuLevelFirstModel.find({ nodeId });

      if (checkAsync.length) {
        return res.send(Object.assign({}, { data: null }, ErrorCode.IS_EXSIT));
      }

      const createData = new MenuLevelFirstModel({
        title,
        path,
        nodeId,
        icon,
        level: 1,
        children: [],
        parentId: "",
        isNode,
      });

      const saveAsync = await createData.save();

      const { _id = "" } = saveAsync;

      if (_id) {
        res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });

  // 删除一级菜单
  Router.get("/menu/firstLevel/delete", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      query,
    } = req;

    const needCheck = ["id"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, query, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    const { id = "" } = query;

    try {
      const menuData = await MenuLevelFirstModel.aggregate([
        {
          $lookup: {
            from: "menuLevelSecond",
            localField: "nodeId",
            foreignField: "parentId",
            as: "children",
          },
        },
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
      ]);
      const { children = [] } = menuData[0];
      if (children && children.length) {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_EXSIT, {
            msg: "该菜单节点存在子菜单，不能删除",
          })
        );
        return;
      }
      const deleteAsync = await MenuLevelFirstModel.findByIdAndDelete(id);
      const { _id = "" } = deleteAsync;
      if (_id) {
        res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      console.log(err);
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });

  // 编辑一级菜单
  Router.post("/menu/firstLevel/update", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      body,
    } = req;

    const needCheck = ["id"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, body, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    try {
      const { id = "", nodeId = "", path = "", title = "", icon = "" } = body;

      const updateData = {};

      if (nodeId) {
        updateData.nodeId = nodeId;
      }

      if (path) {
        updateData.path = path;
      }

      if (title) {
        updateData.title = title;
      }

      // 可以为空
      updateData.icon = icon;

      const updateAsync = await MenuLevelFirstModel.findByIdAndUpdate(
        id,
        updateData
      );

      const { _id = "" } = updateAsync;

      if (_id) {
        res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });
})();

/* -------------------------------------------------------------------- */
// 二级菜单
(() => {
  Router.get("/menu/secondLevel/list", async (req, res, next) => {
    const doc = await MenuLevelSecondModel.find();
    res.send(doc);
  });

  // 查看二级菜单
  Router.get("/menu/secondLevel/check", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      query,
    } = req;

    const needCheck = ["id"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, query, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    const { id = "" } = query;

    try {
      const checkAsync = await MenuLevelSecondModel.findById(id);
      const { _id = "" } = checkAsync;

      if (_id) {
        res.send(Object.assign({}, { data: checkAsync }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });

  // 添加二级菜单
  Router.post("/menu/secondLevel/create", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      body,
    } = req;

    const needCheck = ["nodeId", "path", "title", "parentId"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, body, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    try {
      const {
        title = "",
        path = "",
        nodeId = "",
        icon = "",
        parentId = "",
        isNode = false,
      } = body;

      const checkAsync = await MenuLevelSecondModel.find({ nodeId });

      if (checkAsync.length) {
        return res.send(Object.assign({}, { data: null }, ErrorCode.IS_EXSIT));
      }

      const createData = new MenuLevelSecondModel({
        title,
        path,
        nodeId,
        icon,
        level: 2,
        children: [],
        parentId,
        isNode,
      });

      const saveAsync = await createData.save();

      const { _id = "" } = saveAsync;

      if (_id) {
        res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });

  // 删除二级菜单
  Router.get("/menu/secondLevel/delete", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      query,
    } = req;

    const needCheck = ["id"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, query, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    const { id = "" } = query;

    try {
      const menuData = await MenuLevelSecondModel.aggregate([
        {
          $lookup: {
            from: "menuLevelThird",
            localField: "nodeId",
            foreignField: "parentId",
            as: "children",
          },
        },
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
      ]);

      const { children = [] } = menuData[0];

      if (children && children.length) {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_EXSIT, {
            msg: "该菜单节点存在子菜单，不能删除",
          })
        );
        return;
      }

      const deleteAsync = await MenuLevelSecondModel.findByIdAndDelete(id);
      const { _id = "" } = deleteAsync;

      if (_id) {
        res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });

  // 编辑二级菜单
  Router.post("/menu/secondLevel/update", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      body,
    } = req;

    const needCheck = ["id"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, body, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    try {
      const { id = "", nodeId = "", path = "", title = "", icon = "" } = body;

      const updateData = {};

      if (nodeId) {
        updateData.nodeId = nodeId;
      }

      if (path) {
        updateData.path = path;
      }

      if (title) {
        updateData.title = title;
      }

      // 可以为空
      updateData.icon = icon;

      const updateAsync = await MenuLevelSecondModel.findByIdAndUpdate(
        id,
        updateData
      );

      const { _id = "" } = updateAsync;

      if (_id) {
        res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });
})();

/* -------------------------------------------------------------------- */
// 三级菜单
(() => {
  // 查看三级菜单数据
  Router.get("/menu/thirdLevel/list", async (req, res, next) => {
    const doc = await MenuLevelThirdModel.find();
    res.send(doc);
  });

  // 查看三级菜单
  Router.get("/menu/thirdLevel/check", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      query,
    } = req;

    const needCheck = ["id"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, query, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    const { id = "" } = query;

    try {
      const checkAsync = await MenuLevelThirdModel.findById(id);
      const { _id = "" } = checkAsync;

      if (_id) {
        res.send(Object.assign({}, { data: checkAsync }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });

  // 添加三级菜单
  Router.post("/menu/thirdLevel/create", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      body,
    } = req;

    const needCheck = ["nodeId", "path", "title", "parentId"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, body, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    try {
      const {
        title = "",
        path = "",
        nodeId = "",
        icon = "",
        parentId = "",
        isNode = false,
      } = body;

      const checkAsync = await MenuLevelThirdModel.find({ nodeId });

      if (checkAsync.length) {
        return res.send(Object.assign({}, { data: null }, ErrorCode.IS_EXSIT));
      }

      const createData = new MenuLevelThirdModel({
        title,
        path,
        nodeId,
        icon,
        level: 3,
        children: [],
        parentId,
        isNode,
      });

      const saveAsync = await createData.save();

      const { _id = "" } = saveAsync;

      if (_id) {
        res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });

  // 删除三级菜单
  Router.get("/menu/thirdLevel/delete", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      query,
    } = req;

    const needCheck = ["id"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, query, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    const { id = "" } = query;

    try {
      const deleteAsync = await MenuLevelThirdModel.findByIdAndDelete(id);
      const { _id = "" } = deleteAsync;

      if (_id) {
        res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });

  // 编辑三级菜单
  Router.post("/menu/thirdLevel/update", async (req, res, next) => {
    const {
      defineMiddleWare: { hasEmptyParams, ErrorCode },
      body,
    } = req;

    const needCheck = ["id"];

    // 异步检查结果
    const checkParamAsync = await hasEmptyParams(needCheck, body, res);

    // 检查不通过时，中断操作
    if (checkParamAsync) return false;

    try {
      const { id = "", nodeId = "", path = "", title = "", icon = "" } = body;

      const updateData = {};

      if (nodeId) {
        updateData.nodeId = nodeId;
      }

      if (path) {
        updateData.path = path;
      }

      if (title) {
        updateData.title = title;
      }

      // 可以为空
      updateData.icon = icon;

      const updateAsync = await MenuLevelThirdModel.findByIdAndUpdate(
        id,
        updateData
      );

      const { _id = "" } = updateAsync;

      if (_id) {
        res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
      } else {
        res.send(
          Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR)
        );
      }
    } catch (err) {
      res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
    }
  });
})();

/* -------------------------------------------------------------------- */
// 查看菜单数据 + 按钮
Router.get("/menu/list", async (req, res, next) => {
  const {
    defineMiddleWare: { ErrorCode },
  } = req;

  // 第三级菜单合并按钮
  await MenuLevelThirdModel.aggregate([
    {
      $lookup: {
        from: "button",
        localField: "nodeId",
        foreignField: "pageId",
        as: "buttons",
      },
    },
    {
      $out: "menuButton3",
    },
  ]);

  // 第二级菜单合并按钮
  await MenuLevelSecondModel.aggregate([
    {
      $lookup: {
        from: "button",
        localField: "nodeId",
        foreignField: "pageId",
        as: "buttons",
      },
    },
    {
      $lookup: {
        from: "menuButton3",
        localField: "nodeId",
        foreignField: "parentId",
        as: "children",
      },
    },
    {
      $out: "menuButton2",
    },
  ]);

  // 第一级菜单合并按钮
  const menuData = await MenuLevelFirstModel.aggregate([
    {
      $lookup: {
        from: "button",
        localField: "nodeId",
        foreignField: "pageId",
        as: "buttons",
      },
    },

    {
      $lookup: {
        from: "menuButton2",
        localField: "nodeId",
        foreignField: "parentId",
        as: "children",
      },
    },
  ]);

  res.send(Object.assign({}, ErrorCode.IS_OK, { data: menuData }));
});

// 查看角色权限菜单
Router.get("/menu/permission/list", async (req, res, next) => {
  const {
    defineMiddleWare: { ErrorCode },
    authorization = "",
  } = req;

  try {
    const findUserAsync = await UserModel.find({ token: authorization });
    const { roleId = "" } = findUserAsync[0];

    const findRolePermissionAsync = await RoleModel.find({ roleId });

    const { permission = [] } = findRolePermissionAsync[0];

    // 过滤三级菜单的权限，存到临时表 permissionMenuThird
    await MenuLevelThirdModel.aggregate([
      {
        $match: {
          nodeId: { $in: permission },
        },
      },
      {
        $out: "permissionMenuThird",
      },
    ]);

    // 过滤二级菜单的权限，存到临时表 permissionMenuSecond
    await MenuLevelSecondModel.aggregate([
      {
        $lookup: {
          from: "permissionMenuThird",
          localField: "nodeId",
          foreignField: "parentId",
          as: "children",
        },
      },
      {
        $match: {
          $or: [
            {
              nodeId: { $in: permission },
            },
            {
              isNode: true,
            },
          ],
        },
      },
      {
        $out: "permissionMenuSecond",
      },
    ]);

    // 过滤三级菜单的权限，存到临时表 permissionMenuSecond
    const permissionList = await MenuLevelFirstModel.aggregate([
      {
        $lookup: {
          from: "permissionMenuSecond",
          localField: "nodeId",
          foreignField: "parentId",
          as: "children",
        },
      },
      {
        $match: {
          $or: [
            {
              nodeId: { $in: permission },
            },
            {
              isNode: true,
            },
          ],
        },
      },
    ]);

    res.send(Object.assign({}, ErrorCode.IS_OK, { data: permissionList }));
  } catch (err) {
    console.log(err);
    res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 查看角色菜单按钮

module.exports = Router;
