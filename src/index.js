/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';
import Koa from 'koa';
import serve from 'koa-static';
import jwt from 'koa-jwt';
import path from 'path';
import {config, mysqlMiddleware, log4js, secretKey} from './utils';
import router from './routes';

const log = log4js.getLogger('app')

const app = new Koa()

app
  .use(log4js.koaLogger(log4js.getLogger("http"), {level: 'auto'}))
  .use(mysqlMiddleware)
  .use(serve(path.resolve(__dirname, './assets')))
  .use(jwt({
    secret: secretKey,
    getToken(ctx) {
      return ctx.header.token || null
    }
  }).unless({path: [/^\/unauth/]}))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port)

log.info('app is run at:', config.port)

