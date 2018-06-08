/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';
import Router from 'koa-router';
import koaBody from 'koa-body';
import {login} from './api'

const router = new Router();

// ctx.request.body   获取 post 请求参数
// ctx.query          获取 url 参数

router
  .get('/unauth/login', login)
  .post('/post', koaBody(), (ctx) => {
    ctx.body = ctx.request.body
  })
  .get('/test', (ctx) => {
    ctx.body = 'test jwt'
  })

export default router
