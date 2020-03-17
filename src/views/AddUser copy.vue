<template>
  <div id="add-user container">
    <h2>添加用户</h2>
    <form>
      <div class="input-item">
        <label for>姓名</label>
        <span class="red-star">*</span>
        <input type="text" v-model="user.name" class="form-control9" required placeholder="请输入姓名" />
      </div>
      <div class="input-item">
        <label for>性别</label>
        <span class="red-star">*</span>
        <!-- <input type="text" v-model="sex" class="form-control9" required placeholder="请输入性别" /> -->
        <select v-model="user.sex">
          <option>男</option>
          <option>女</option>
        </select>
      </div>
      <div class="input-item">
        <label for>手机</label>
        <span class="red-star">*</span>
        <input type="text" v-model="user.mobile" class="form-control9" required placeholder="请输入手机" />
      </div>
      <div class="input-item">
        <label for>密码</label>
        <span class="red-star">*</span>
        <input type="text" v-model="user.password" class="form-control9" required placeholder="请输入密码" />
      </div>

      <div class="btn">
        <button v-on:click.prevent="register">添加用户</button>
        <button v-on:click.prevent="searchUser">查看用户</button>
        <button v-on:click.prevent="editUser">编辑用户</button>
        <button v-on:click.prevent="deleteUser">删除用户</button>
      </div>
    </form>

    <div>
      <h3 v-if="submited">用户增加成功</h3>
    </div>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>姓名</th>
            <th>性别</th>
            <th>手机</th>
            <!-- <th>备注</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users">
            <td>{{item.name}}</td>
            <td>{{item.sex}}</td>
            <td>{{item.mobile}}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
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
      },
      submited: false,
      messsex: "",
      users: []
    };
  },
  methods: {
    register() {
      let userdata = {
        name: this.user.name,
        sex: this.user.sex,
        mobile: this.user.mobile,
        password: this.user.password
      };

      // console.log(name + ":" + sex);
      this.$http
        //这里的 register 是路由，传送到 userApi.js 接口，以下的 searchUser 和 editUser 类似
        .post("/api/user/register", userdata, {})
        .then(response => {
          console.log("成功提示：", response);
          // this.message = this.name + ":" + this.sex;
          // this.name = "";
          // this.sex = "";
          // this.mobile = "";
          // this.password = "";
          this.user={}
        });
    },

    //查询用户 荣 on 2020.2.22
    searchUser() {
      let name = this.user.name;
      // console.log(name + ":" + sex);
      // GET传参数查看如下网址（搞了我几天终于搞掂）2020.2.27
      //  https://blog.csdn.net/u010942058/article/details/101670400
      //  https://blog.csdn.net/qq_36947128/article/details/79743827
      this.$http
        .get("/api/user/searchUser", {
          params: { name: "%" + name + "%" }
        })
        .then(response => {
          this.users = response.body;
        });
    },

    //删除用户 荣 on 2020.2.27
    deleteUser() {
      let name = this.user.name;
      console.log(name);
      this.$http
        .delete("/api/user/deleteUser", { body: { name: name } })
        .then(response => {
          console.log("荣提示：这是Delete ", response);
        });
    },

    //更新用户 荣 on 2020.2.27
    editUser() {
      let putData = {
        //查询SQL语句有多少个参数就设多少个属性(键对)
        name: this.user.name, //待更新的用户名
        sex: this.user.sex, //待更新的用年龄
        name: this.user.name, //更新条件(以用户名为更新条件)
        mobile: this.user.mobile,
        password:this.user.password
      };
      // GET传参数查看如下网址（搞了我几天终于搞掂）2020.2.27
      //  https://blog.csdn.net/u010942058/article/details/101670400
      this.$http
        // 对应sqlMap.js的点位符参数   ?:name  ?:sex    ?:条件name
        // .put("/api/user/editUser",{name:name,sex:sex,name:name} )
        .put("/api/user/editUser", putData)
        .then(response => {
          console.log("荣提示：这是PUT ", response);
          console.log("荣query:", response.query);
          // this.users = [
          //   { name: this.name, sex: this.sex, mobile: this.mobile }
          // ];
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#user * {
  box-sizing: border-box;
}
#user {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}
input[type="text"],
select {
  height: 35px;
  width: 100%;
  margin: 10px 10px 10px 10px;
}

.btn {
  display: flex;
  flex: 1;
  justify-content: center;
}

button {
  margin: 15px 3px;
  background: rgb(54, 143, 155);
  color: #fff;
  border: 0;
  padding: 10px;
  border-radius: 4px;
  font-size: 15px;
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
