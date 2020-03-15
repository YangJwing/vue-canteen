<!--
 * @作者: Edwin Yeung
 * @Date: 2020-02-18 13:38:59
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-16 00:03:05
 * @描述: 
 -->
## 第一次用 Git 代码 托管
### vue-mysql

- V0.1



- V0.5
### 一.前后端的逻辑  
  - 前端 Login.vue 调用方法 logincheck()

```js
  //密码校验
    logincheck() {
      var mobile = this.mobile;
      var password = this.password;
      console.log("mobile :", mobile);
      this.$http
        .post(
          "/api/user/logincheck",
          { mobile: mobile, password: password },
          {}
        )
        .then(response => {
          //判断用户名和密码是否正确
          if (!response.body.msg) { //成功
            //islogin设为true
            this.islogin = true;
            //设置TOKEN 和 localstorage
            this.$store.commit("SET_TOKEN", response.body);
            console.log("this.state.token:", this.$store.state.token);
            this.$router.push("/home");
            console.log("提示：", response);

          } else {  //失败
            this.$store.commit("LOGOUT");
            console.log("this.state.token:", this.$store.state.token);
          }
        })
        .catch(err => {
          console.log("错误:", err);
        });
    }
```

- 后端 ;userApi 捕获路由

```js
//后端密码校验
router.post('/logincheck',(req,res)=>{
  var sql=$sql.login.logincheck
  var params=req.body
  console.log('sql :', sql);
  console.log('params :', params);
  conn.query(sql, [params.mobile, params.password], (err, result) => {
    if (err) {
      console.log("提示：" + err);
    }
    if (result.length) {
      res.json({status:1,msg:"登录成功"})
      // jsonWrite(res, result);  //检测密码不用返回数据记录吧,返回结果就可以
    } else {
      res.json({status:1,msg:"登录失败"})
    }
  })
})
```
- 实际的sql语句
  - //sql 相当于 sqlMaps.js下的 login(对象):logincheck（属性） 语句： 'select mobile,password from user where mobile= ? and password = ?'
```js
//sqlMap
var sqlMap={
    login:{
      logincheck: 'select mobile,password from user where mobile= ? and password = ?'
    },
}
```  
### 二.知识点
 ##### 1. < roter-link > 的点击要在 @click后加native,即 @click.native
 
 ##### 2. 客户端存储(LocalStorage 和 sessionStorage)
 - 区别在于存储的有效期和作用域的不同:数据可以存储多长时间及谁拥有数据的访问权
 - window.localStorage.setItem('token', data)
 - window.localStorage.getItem('token')
 - window.localStorage.removeItem('token')


### 三.划分目录结构

- assets (静态资源文件)
  - img
  - css
- common (公共的JS文件)
  - const.js、utils.js、 mixin.js

- components (公共的组件)
  - common (完全可以复用)
  - content (与业务相关公共组件)
- views (视图组件)
  - home
  - login
- router (路由)
- store (vuex)
- network (网络相关)

###  四.引入Mint UI 
> http://mint-ui.github.io/#!/zh-cn
1. 安装: npm i mint-ui -S
2. 引入 Mint UI:
  - 在 main.js 中写入以下内容:

完整引入:
```js
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'

Vue.use(MintUI)

new Vue({
  el: '#app',
  components: { App }
})
```
如果你只希望引入部分组件，比如 Button 和 Cell，那么需要在 main.js 中写入以下内容：
```js
import Vue from 'vue'
import { Button, Cell } from 'mint-ui'
import App from './App.vue'

Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Cell)
 */

new Vue({
  el: '#app',
  components: { App }
})
```
**关于事件绑定**

在 Vue 2.0 中，为自定义组件绑定原生事件必须使用 .native 修饰符：
```js
<my-component @click.native="handleClick"> Click Me </my-component>
```

