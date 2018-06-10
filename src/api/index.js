/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';
import Router from 'koa-router';
import jwt from "koa-jwt";
import {login, register} from './login'
import {secretKey} from "../utils";

export const noAuth = new Router();
export const router = new Router();

// ctx.request.body   获取 post 请求参数
// ctx.query          获取 url 参数

router
  .use(jwt({
    secret: secretKey,
    getToken(ctx) {
      return ctx.header.token || null
    }
  }))
  .post('/post', (ctx) => {
    ctx.body = ctx.request.body
  })
  .get('/test', (ctx) => {
    ctx.body = 'test jwt'
  })

noAuth.get('/login', login)
noAuth.post('/login', login)
noAuth.post('/register', register)
noAuth.get('/noAuth', (ctx) => {
  ctx.body = 'test no auth api'
})
