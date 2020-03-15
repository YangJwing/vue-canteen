<template>
  <div id="add-user container">
    <form>
      <h3>注册新用户</h3>
      <div class="input-item">
        <label for>姓名</label>
        <span class="red-star">*</span>
        <input type="text" v-model="user.name" required placeholder="请输入姓名" />
      </div>
      <div class="input-item">
        <label for>性别</label>
        <span class="red-star">*</span>
        <!-- <input type="text" v-model="sex"  required placeholder="请输入性别" /> -->
        <select v-model="user.sex">
          <option>男</option>
          <option>女</option>
        </select>
      </div>
      <div class="input-item">
        <label for>手机</label>
        <span class="red-star">*</span>
        <input type="text" v-model="user.mobile" required placeholder="请输入手机" />
      </div>
      <div class="input-item">
        <label for>密码</label>
        <span class="red-star">*</span>
        <input type="password" v-model="user.password" required placeholder="请输入密码" />
      </div>

      <div class="btn">
        <button @click.prevent="addUser">确定</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  // http://jsonplaceholder.typicode.com/
  // http://jsonplaceholder.typicode.com/posts
  name: "add-user",
  data() {
    return {
      user: {
        name: "",
        sex: "",
        mobile: "",
        password: ""
      }
    };
  },
  methods: {
    addUser() {
    let userdata = {
        name: this.user.name,
        sex: this.user.sex,
        mobile: this.user.mobile,
        password: this.user.password
      };
      this.$http
        //这里的 addUser 是路由，传送到 userApi.js 接口，以下的 searchUser 和 editUser 类似
        .post("/api/user/addUser", userdata, {})
       
        //注册用户成功
        .then(response => {
          console.log('response :', response);  //不是查询，返回的数据没有用户信息
          //state的islogin设为true
          this.$store.commit("SET_LOGIN", true);

          //设置TOKEN 和 localstorage
          this.$store.commit("SET_TOKEN", userdata);
          console.log("this.state.token:", this.$store.state.token);

          //获得用户名
          this.$store.commit("GET_USER", userdata.name);
          // console.log('user :', this.$store.state.user);


          userdata.state = "首次注册登录";

          //记录登录日志
          this.$http.post("/api/user/loginlog",userdata)
          .then(response=>{
          })

          this.user = {};
          //跳转到主页
          this.$router.push("/home");
        });
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 80px;
}
#user * {
  box-sizing: border-box;
}
#user {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}
input[type="text"],
input[type="password"],
select {
  height: 35px;
  width: 100%;
  margin: 10px 25px 10px 10px;
}
.btn {
  /* display: flex;
  flex: 1; */
  /* justify-content: center; */
}
button {
  margin: 15px 3px;
  background: rgb(54, 143, 155);
  color: #fff;
  width: 100%;
  border: 0;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

h3 {
  margin-top: 10px;
}
li {
  list-style-type: circle;
  /* display: inline-block; */
}

label {
  /* display: inline-block; */
  margin: 20px 0 10px;
  text-align: right;
  /* padding:5px 0 5px; */
  line-height: 20px;
  /* background-color: rgb(168, 143, 143); */
  width: 100px;
}

.input-item {
  display: flex;
  flex: 1;
  align-items: baseline;
}
.red-star {
  color: red;
}
</style>
