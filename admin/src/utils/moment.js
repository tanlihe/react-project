/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-07-06 00:05:57
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-06 00:09:42
 */
import moment from 'moment';

// 时间戳 | new Date 等格式转化为日期格式
export function formatDate(time, type = 'YYYY-MM-DD hh:mm:ss') {
  return moment(time).format(type);
}
