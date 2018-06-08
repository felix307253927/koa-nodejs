/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';
import yaml from 'js-yaml'
import fs from 'fs'
import path from "path";
import mysql from 'mysql'

export function loadYml(pathName) {
  console.log('loading')
  try {
    return yaml.safeLoad(fs.readFileSync(pathName, 'utf-8')) || {}
  } catch (e) {
    throw Error(e)
  }
}

export const config = loadYml(path.resolve(__dirname, './config.yml'))

export const connection = mysql.createConnection(config.mysql)
