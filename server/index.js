/*
 * @作者: Edwin Yeung
 * @Date: 2020-03-15 12:01:36
 * @修改人: Edwin Yeung
 * @LastEditTime: 2021-05-16 00:06:39
 * @描述: 
 */

// node 后端服务器
const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// 跨域问题(好像不起作用)
app.use(require('cors')())

// const chalk = require('chalk')      //荣：为了显示颜色

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false})); //原来设置
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);


// 监听端口
// app.listen(3000,'0.0.0.0');
app.listen(3000);

console.log('\n成功监听端口:3001......\n');
// console.log(chalk.cyan('\n成功监听端口:') + chalk.yellow('3000')+chalk.cyan('...\n'));
