/**
 * @author Created by felix on 18-6-10.
 * @email   307253927@qq.com
 */
'use strict';
require('babel-register')
require('chai/register-should')

let config = require('../../src/utils').config;

test('should load config file without error', () => {
  config.port.should.be.a('number')
});