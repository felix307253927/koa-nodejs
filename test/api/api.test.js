/**
 * @author Created by felix on 18-6-11.
 * @email   307253927@qq.com
 */
'use strict';

require('babel-register')
require('chai/register-should')
const createServe = require('../../src/server').default
const supertest   = require("supertest")

let app, request;
beforeAll(async () => {
  app     = await createServe()
  request = supertest(app.callback())
})

afterAll(() => {
  app && app.context.db.end()
})

test('login', async () => {
  const {body, status, type} = await request//request(app.callback())
    .post('/login?id=4')
    .send({
      username: 'test',
      password: '123456'
    })
  status.should.equal(200)
  type.should.equal('application/json')
  body.code.should.equal(0)
  
  body.params.username.should.equal('test')
  const res = await request.post('/post')
    .set('token', body.token)
    .send({arg1: 'test'})
  res.status.should.be(200)
  res.body.code.should.be(0)
})
