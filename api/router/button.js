/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-18 16:17:22
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-27 01:15:56
 */
const mongoose = require("../model/db");
const Router = require("./router");
const ButtonModel = require("../model/button/button");
const $AXIOS = require("axios");

// 查看所有按钮信息
Router.get("/button/list", async (req, res, next) => {
  const {
    defineMiddleWare: { ErrorCode },
    query,
  } = req;

  try {
    const { pageId = "" } = query;

    const conditions = {};

    if (pageId) {
      conditions.pageId = pageId;
    }

    const doc = await ButtonModel.find(conditions, { __v: 0 });

    res.send(Object.assign({}, { data: doc }, ErrorCode.IS_OK));
  } catch (err) {
    res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 添加
Router.post("/button/create", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    body,
  } = req;

  const needCheck = ["pageId", "buttonId", "buttonName"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, body, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  try {
    const { buttonId = "", buttonName = "", pageId = "" } = body;

    const checkAsync = await ButtonModel.find({ buttonId });

    if (checkAsync.length) {
      return res.send(Object.assign({}, { data: null }, ErrorCode.IS_EXSIT));
    }

    const createData = new ButtonModel({
      pageId,
      buttonId,
      buttonName,
      createdTime: Date.now(),
      updatedTime: Date.now(),
    });

    const saveAsync = await createData.save();

    const { _id = "" } = saveAsync;

    if (_id) {
      res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
    } else {
      res.send(Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR));
    }
  } catch (err) {
    res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 查看按钮信息
Router.get("/button/check", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    query,
  } = req;

  const needCheck = ["pageId", "buttonId"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, query, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  try {
    const { pageId = "", buttonId = "" } = query;
    const checkAsync = await ButtonModel.findOne({
      pageId,
      buttonId,
    });

    const { _id = "" } = checkAsync;

    if (_id) {
      res.send(Object.assign({}, { data: checkAsync }, ErrorCode.IS_OK));
    } else {
      res.send(Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR));
    }
  } catch (err) {
    res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 删除
Router.get("/button/delete", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    query,
  } = req;

  const needCheck = ["pageId", "buttonId"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, query, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  try {
    const { pageId = "", buttonId = "" } = query;
    const deleteAsync = await ButtonModel.findOneAndDelete({
      pageId,
      buttonId,
    });

    const { _id = "" } = deleteAsync;

    if (_id) {
      res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
    } else {
      res.send(Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR));
    }
  } catch (err) {
    res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 更新
Router.post("/button/update", async (req, res, next) => {
  const {
    defineMiddleWare: { hasEmptyParams, ErrorCode },
    body,
  } = req;

  const needCheck = ["pageId", "id", "buttonName"];

  // 异步检查结果
  const checkParamAsync = await hasEmptyParams(needCheck, body, res);

  // 检查不通过时，中断操作
  if (checkParamAsync) return false;

  try {
    const { buttonId = "", buttonName = "", pageId = "", id = "" } = body;

    const updateData = {};

    if (buttonId) {
      updateData.buttonId = buttonId;
    }

    if (buttonName) {
      updateData.buttonName = buttonName;
    }

    console.log(pageId, id, updateData);

    const updateAsync = await ButtonModel.findOneAndUpdate(
      { pageId, _id: mongoose.Types.ObjectId(id) },
      {
        ...updateData,
      }
    );

    const { _id = "" } = updateAsync;

    if (_id) {
      res.send(Object.assign({}, { data: null }, ErrorCode.IS_OK));
    } else {
      res.send(Object.assign({}, { data: null }, ErrorCode.IS_DATABASE_ERROR));
    }
  } catch (err) {
    res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
  }
});

// 查看页面按钮
Router.get("/button/pageButton", async (req, res, next) => {
  const {
    defineMiddleWare: { ErrorCode },
    query,
    authorization,
  } = req;

  const { code = 200, data = null } = await $AXIOS.get(
    "http://127.0.0.1:9989/api/menu/list",
    {
      params: {},
      headers: {
        authorization,
      },
    }
  );

  const pages = [];
  const getPageLoop = (list = []) => {
    list.map((i) => {
      if (i.children && i.children.length) {
        getPageLoop(i.children);
      } else {
        pages.push({
          title: i.title,
          key: i.nodeId,
          children: i.buttons.map((k) => ({
            title: k.buttonName,
            key: k.buttonId,
            children: [],
          })),
        });
      }
    });
  };

  getPageLoop(data);

  res.send(Object.assign({}, { data: pages }, ErrorCode.IS_OK));

  try {
  } catch (err) {
    res.send(Object.assign({}, { data: err }, ErrorCode.IS_DATABASE_ERROR));
  }
});

module.exports = Router;
