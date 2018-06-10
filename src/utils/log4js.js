/**
 * @author Created by felix on 18-6-9.
 * @email   307253927@qq.com
 */
'use strict';

import {config} from './config'
import koaLog4 from "koa-log4";

koaLog4.configure(config.log4js)

const map = new Map()

export const log4js = koaLog4

export function getLogger(name = 'app') {
  if (map.has(name)) {
    return map.get(name)
  } else {
    const logger = log4js.getLogger(name)
    map.set(name, logger)
    return logger
  }
}