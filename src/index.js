/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';
import koa from 'koa';
import body from 'koa-body';
import router from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import {config, connection} from './utils';



connection.connect()
connection.query('select name from test', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0], fields);
});

connection.end();