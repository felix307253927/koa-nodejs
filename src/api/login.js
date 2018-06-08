/**
 * @author Created by felix on 18-6-8.
 * @email   307253927@qq.com
 */
'use strict';

import {secretKey} from "../utils";
import jwt from "jsonwebtoken";

export default async (ctx) => {
  //查询数据库
  const [results, fields] = await ctx.mysql.query('select name from test')
  const user              = results[0]
  return ctx.body = {
    code : 0,
    //设置token
    token: jwt.sign({
        id  : user.id,
        name: user.name
      },
      secretKey, {
        expiresIn: '2h'
      }),
    msg  : 'ok',
    user
  }
}