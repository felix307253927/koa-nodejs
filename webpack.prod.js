/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');

// const ENV = process.env.NODE_ENV = 'production';
const ENV = process.env.NODE_ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  mode   : ENV,
  devtool: false,
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
      }
    }),
  ]
});