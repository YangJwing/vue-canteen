//参考出处  https://blog.csdn.net/weixin_42003850/article/details/100511566   on 2020/02/18

//userApi.js
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 增加用户接口
router.post('/register', (req, res) => {
  var sql = $sql.user.register;
  // post、put、delete通过req.body , get通过req.query 获取参数
  var params = req.body;
  console.log("params:", params);
  // function(err,result) 相当于 (err,result)=>
  conn.query(sql, [params.name, params.sex, params.mobile, params.password], (err, result) => {
    if (err) {
      console.log("荣提示：" + err);
    }
    if (result) {
      console.log(params.name + " 用户注册成功!")
      jsonWrite(res, result);
    }
  })
})

//后端密码校验
router.post('/logincheck', (req, res) => {
  var sql = $sql.user.logincheck
  var params = req.body
  console.log('sql :', sql);
  console.log('params :', params);
  conn.query(sql, [params.mobile, params.password], (err, result) => {
    if (err) {
      console.log("提示：" + err);
    }
    if (result.length) {
      // res.json({status:1,msg:"登录成功"})
      jsonWrite(res, result);  //检测密码不用返回数据记录吧,返回结果就可以
    } else {
      res.json({ status: 1, name: '未知用户名', msg: "用户名或密码错误" })  //用户名或密码错误,返回信息
    }
  })
})

//登录日志
router.post('/loginlog', (req, res) => {
  var sql = $sql.login_log.loginlog
  var params = req.body
  console.log('sql :', sql);
  console.log('params :', params);
  conn.query(sql, [params.name, params.mobile, params.state], (err, result) => {
    if (err) {
      console.log("提示：" + err);
    }
    if (result.length) {
      jsonWrite(res, result);  //
    } else {
      res.json({ status: 1, msg: "写入失败" })  //
    }
  })
})

//后端查询手机号是否存在
router.post('/checkmobile', (req, res) => {
  var sql = $sql.user.checkmobile
  var params = req.body
  console.log('sql :', sql);
  console.log('params :', params);
  conn.query(sql, [params.mobile], (err, result) => {
    if (err) {
      console.log("提示：" + err);
    }
    if (result.length) {
      console.log('手机存在于数据库 ')
      res.json({ isExistMobile: true });  //检测手机不用返回数据记录,返回结果就可以
    } else {
      console.log('可以增加手机号')
      res.json({ isExistMobile: false });
    }
  })
})

//登记就餐数据入库
router.post('/adddine', (req, res) => {
  var sql = $sql.orders.adddine
  var params = req.body
  console.log('sql :', sql);
  console.log('params :', params);
  conn.query(sql, [params.userid, params.name, params.orderdate, params.breakfast,params.lunch, params.dinner], (err, result) => {
    if (err) {
      console.log("提示：" + err);
    }
    if (result.length) {
      jsonWrite(res, result);  //
    } else {
      res.json({ status: 1, msg: "写入失败" })  //
    }
  })
})

// 查询用户接口，荣自己加入的 2020.2.26测试通过 ***************
router.get('/searchUser', (req, res) => {
  var sql = $sql.user.search   //sql 相当于 sqlMaps.js下的 user(对象):search（属性） 语句： select * from user where name=?
  var params = req.query
  console.log("荣params:", params);
  // conn.query(sql, [params.name], function (err, result) {
  conn.query(sql, [params.name], (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.send(result)
    }
  })
})

// 编辑用户接口,荣加入的 on 20202.2.27 测试通过**************
router.put('/editUser', (req, res) => {
  var sql = $sql.user.edit;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.name, params.sex, params.name], function (err, result) {
    if (err) {
      console.log("荣提示：" + err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 删除用户接口,荣加入的 on 20202.2.27 **************
router.delete('/deleteUser', (req, res) => {
  var sql = $sql.user.delete;
  var params = req.body;
  console.log("荣req.query:", req.query);
  console.log("荣req.body:", req.body);
  conn.query(sql, [params.name], function (err, result) {
    if (err) {
      console.log("荣提示：" + err);
    }
    if (result) {
      jsonWrite(res, result);
      // if(result.body.code==200){console.log("删除成功！")}
      console.log("删除成功！")
    }
  })
})

module.exports = router
