/**
 * @author Created by felix on 18-6-10.
 * @email   307253927@qq.com
 */
'use strict';
const fs   = require('fs');
const path = require('path')
let pkg    = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8'))
delete pkg.scripts
delete pkg.devDependencies
fs.writeFileSync(path.resolve('dist', 'package.json'), JSON.stringify(pkg))