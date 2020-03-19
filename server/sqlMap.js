/*
 * @作者: Edwin Yeung
 * @Date: 2020-02-18 14:32:54
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-19 19:47:29
 * @描述: 
 */
//参考出处  https://blog.csdn.net/weixin_42003850/article/details/100511566   on 2020/02/18

//sqlMap.js
var sqlMap = {

  //登录/注册
  login_log: {
    loginlog: 'insert into login_log(name,mobile,state) values( ?, ?, ?)',   //记录登录日志
  },

  // 用户表
  user: {
    logincheck: 'select * from user where mobile = ? and password = ?',  //密码校验
    register:   'insert into user(name,sex,mobile,password) values( ?,?,?,? )',
    checkmobile:'select * from user where mobile = ?',        //检查手机号已存在数据中
    edit: 'update user set name = ? , sex = ? where name=?',  //更新用户数据
    search: 'select * from user where name like ?',           //查找用户信息
    delete: 'delete  from user where name = ?',               
  },

}

module.exports = sqlMap;
