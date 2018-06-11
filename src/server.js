/**
 * @author Created by felix on 18-6-11.
 * @email   307253927@qq.com
 */
'use strict';

import Koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';
import path from 'path';
import {log4js, createPool} from './utils';
import {router, noAuth} from './api';

export default async function createServe() {
  const app = new Koa()
    app.context.db = await createPool();
    app
      .use(log4js.koaLogger(log4js.getLogger("http"), {level: 'auto'}))
      .use(serve(path.resolve(__dirname, './assets')))
      .use(koaBody())
      .use(noAuth.routes())
      .use(router.routes())
      .use(router.allowedMethods())
  return app
}