/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';
import {config, getLogger} from './utils';
import createServe from './server';

const log = getLogger()
log.info('starting server...')

createServe().then(app => {
  app.listen(config.port)
  log.info('server is run at:', config.port)
})
