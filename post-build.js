/**
 * @author Created by felix on 18-6-10.
 * @email   307253927@qq.com
 */
'use strict';
const fs   = require('fs');
const path = require('path')
const pm2  = require('./ecosystem.config.js')

//create package.json
let pkg     = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8'))
pkg.scripts = {
  pm2: pkg.scripts.pm2
}
delete pkg.devDependencies
fs.writeFileSync(path.resolve('dist', 'package.json'), JSON.stringify(pkg))

// create pm2 config
const app = pm2.apps[0]
app.name  = pkg.name
fs.readdirSync(path.resolve('dist')).forEach(file => {
  if (file.includes('main.bundle')) {
    app.script = file
  }
})

fs.writeFileSync(path.resolve('dist', 'ecosystem.config.js'), `module.exports=${JSON.stringify(pm2)}`)
