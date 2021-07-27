/*
 * @Descripttion: 路由相关的一些处理方法
 * @version:
 * @Author: Tang
 * @Date: 2021-04-26 01:29:01
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-20 17:24:03
 */
import { isNotEmptyArray } from './check';

/**
 * 根据当前路由查看其对应的所有父级路由
 * @param {路由列表} routesList
 * @param {当前页面对应的路由，即要查询的路由} currentRoutePath
 */
export function findParentRoutes(routesList = [], currentRoutePath = '') {
  let result = []; // 查询后，导出的最终结果
  const isFirst = true; // 是否为第一轮遍历
  let isFinish = false; // 是否匹配到了要找的最终节点

  function loop(list, current, isFirst = true) {
    list.map(i => {
      const {
        title = '',
        path = '',
        key = '',
        children = [],
        isNode = false,
      } = i;
      if (isFirst && !isFinish) {
        result = [];
      }
      if (isNotEmptyArray(children)) {
        if (!isFinish) {
          result.push({ title, key, path, isNode });
        }
        loop(children, current, false);
      } else if (i.path === current) {
        if (!isFinish) {
          result.push({ title, path, key, isNode });
        }
        isFinish = true;
      }
      // 解决控制台警告提示
      return false;
    });
  }

  loop(routesList, currentRoutePath, isFirst);

  return result;
}
