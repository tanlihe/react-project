/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-04-30 00:25:33
 * @LastEditors: Tang
 * @LastEditTime: 2021-05-01 14:54:21
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@/reducers';

// 自定义的 saga 触发器
import DeFineSagaTrigger from '@/saga/trigger';

// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware();

// 利用增强函数 compose 兼容 saga 及 浏览器的 redux-devTools 插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// 使用 saga 中间件
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

// 创建 store 仓库
const store = createStore(rootReducer, enhancer);

// 启动 saga 中间件
sagaMiddleware.run(DeFineSagaTrigger);

export default store;
