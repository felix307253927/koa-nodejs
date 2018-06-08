/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';
import yaml from 'js-yaml'
import fs from 'fs'
import path from "path";
import mysql from 'mysql2/promise'
import koaLog4 from 'koa-log4'

const configPath = process.env.ENV === 'development' ? '../config.yml' : './config.yml'

export function loadYml(pathName) {
  try {
    return yaml.safeLoad(fs.readFileSync(pathName, 'utf-8')) || {}
  } catch (e) {
    throw Error(e)
  }
}

export const config = loadYml(path.resolve(__dirname, configPath))

koaLog4.configure(config.log4js)

export const log4js = koaLog4

export async function mysqlMiddleware(ctx, next) {
  ctx.mysql = await mysql.createConnection(config.mysql)
  await next()
}

export const secretKey = config.secretKeyPath ? fs.readFileSync(config.secretKeyPath) : config.secretKey