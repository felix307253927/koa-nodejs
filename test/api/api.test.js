/**
 * @author Created by felix on 18-6-11.
 * @email   307253927@qq.com
 */
'use strict';

require('babel-register')
require('chai/register-should')
const Koa              = require('koa')
const koaBody          = require('koa-body')
const request          = require("supertest")
const {createPool}     = require('../../src/utils')
const {noAuth, router} = require('../../src/api')

let app, ajax;
beforeAll(async () => {
  app            = new Koa()
  app.context.db = await createPool()
  app.use(koaBody())
    .use(noAuth.routes())
    .use(noAuth.routes())
    .use(router.allowedMethods())
  ajax = request(app.callback())
})
afterAll(()=>{
  app.context.db.end()
})

test('login', async () => {
  const {body, status, type} = await ajax//request(app.callback())
    .post('/login')
    .send({
      username: 'test',
      password: '123456'
    })
  status.should.equal(200)
  type.should.equal('application/json')
  body.code.should.equal(0)
})
