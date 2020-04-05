/*
 * @作者: Edwin Yeung
 * @Date: 2020-02-18 14:00:54
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-31 23:48:54
 * @描述: 
 */
//参考出处  https://blog.csdn.net/weixin_42003850/article/details/100511566   on 2020/02/18

//数据库连接配置db.js
module.exports={
    // mysql:{
    //     host:'192.168.0.3',     //NAS mysql连接IP地址
    //     user:'abc',
    //     password:'abc123',      //mysql用户名密码
    //     database:'db_abc',     //mysql数据库名
    //     port:'3306'             //mysql连接端口
    // }
    mysql:{
        host:'kxfinance.dsmynas.com',     //NAS mysql连接IP地址
        user:'kxuser',
        password:'kx86330088',      //mysql用户名密码
        database:'db_abc',     //mysql数据库名
        port:'13306'             //mysql连接端口
    }
}