/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';

const CopyWebpackPlugin         = require('copy-webpack-plugin');
const CleanWebpackPlugin        = require('clean-webpack-plugin');
const ProgressPlugin            = require('progress-bar-webpack-plugin');
const DefinePlugin              = require('webpack/lib/DefinePlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const nodeExternals             = require('webpack-node-externals');
const UglifyJsPlugin            = require('uglifyjs-webpack-plugin');
const fs                        = require('fs');
const path                      = require('path')

let version;
try {
  let pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8'))
  version = pkg.version
} catch (e) {
  version = '1.0.0'
}

console.log(version)
console.log(path.resolve("dist"))

module.exports = {
  target: "node",
  entry : [
    "./src/index.js",
  ],
  output: {
    filename: "[name].bundle.[hash:4].js",
    path    : path.resolve("dist")
  },
  
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".js", '.jsx'],
  },
  
  externals: [nodeExternals()],
  
  module      : {
    rules: [
      {
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        use    : [
          {
            loader: "babel-loader",
            query : {
              cacheDirectory: true,
            }
          }
        ]
      }
    ],
  },
  optimization: {
    minimize   : true,
    minimizer  : [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false,
          }
        }
      })
    ],
    // splitChunks: {}
  },
  plugins     : [
    new CleanWebpackPlugin(['dist']),
    new ModuleConcatenationPlugin(),
    new DefinePlugin({
      'process.env': {
        version: JSON.stringify(version)
      }
    }),
    new CopyWebpackPlugin([
      {context: 'src', from: 'assets/**/*'},
      {context: 'src', from: 'libs/**/*'},
      {context: 'src', from: '*.yml'},
    ], {
      ignore        : [
        // 'index.html',
        '*.txt'
      ],
      // By default, we only copy modified files during
      // a watch or webpack-dev-server build. Setting this
      // to `true` copies all files.
      copyUnmodified: true
    }),
    new ProgressPlugin()
  ],
  
  node: {
    global        : false,
    process       : false,
    __dirname     : false,
    __filename    : false,
    clearImmediate: false,
    setImmediate  : false
  }
};