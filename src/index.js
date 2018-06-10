/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';
import Koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';
import path from 'path';
import {config, log4js, getLogger, getConnection} from './utils';
import {router, noAuth} from './api';

(async () => {
  const app = new Koa()
  const log = getLogger('app')
  log.info('starting app...')
  app.context.db = await getConnection();
  app
    .use(log4js.koaLogger(log4js.getLogger("http"), {level: 'auto'}))
    .use(serve(path.resolve(__dirname, './assets')))
    .use(koaBody())
    .use(noAuth.routes())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(config.port)
  
  log.info(`app start success.`)
  log.info(`app is run at: ${config.port}`)
})()
