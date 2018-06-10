/**
 * @author Created by felix on 18-6-9.
 * @email   307253927@qq.com
 */
'use strict';
import yaml from 'js-yaml'
import fs from 'fs'
import path from "path";

const configPath = process.env.ENV === 'development' ? '../config.yml' : './config.yml'

export function loadYml(pathName) {
  try {
    return yaml.safeLoad(fs.readFileSync(pathName, 'utf-8')) || {}
  } catch (e) {
    throw Error(e)
  }
}

export const config = loadYml(path.resolve(__dirname, configPath))

export const secretKey = config.secretKeyPath ? fs.readFileSync(config.secretKeyPath, 'utf-8') : config.secretKey