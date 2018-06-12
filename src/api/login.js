/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';

import {secretKey} from "../utils";
import jwt from "jsonwebtoken";
// ctx.request.query  获取get请求参数
// ctx.request.body   获取post请求参数
// ctx.state.user     获取token 信息

export async function login(ctx) {
  // 查询数据库
  let db;
  try {
    db             = await ctx.db.getConnection()
    const [[user]] = await db.query('select * from test')
    // const user      = results[0]
    ctx.body       = {
      code  : 0,
      //设置token
      token : jwt.sign({
          id  : user.id,
          name: user.name
        },
        secretKey, {
          expiresIn: '2h'
        }),
      msg   : 'ok',
      user,
      jwt   : ctx.state.user,
      params: ctx.request.body
    }
  } catch (e) {
    ctx.body = {
      code: 1001,
      msg : e.message
    }
  } finally {
    db && db.release()
  }
}

export async function register(ctx) {
  ctx.body = 'register success'
}