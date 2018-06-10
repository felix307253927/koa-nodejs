/**
 * @author Created by felix on 18-6-9.
 * @email   307253927@qq.com
 */
'use strict';

import {getLogger} from "./log4js";
import {config} from './config';
import mysql from "mysql2/promise";

export async function getConnection() {
  const mysqlLog = getLogger('mysql')
  mysqlLog.info('connecting db...')
  try {
    return await mysql.createConnection(config.mysql)
  } catch (e) {
    mysqlLog.error(e.message)
    process.exit(-1)
  }
}
