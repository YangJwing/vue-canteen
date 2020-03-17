<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-15 12:01:36
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-17 00:19:46
 * @描述: 
 -->

<template>
  <div id="container">
    <div>
      <h3>注册新用户</h3>
      <mt-field class="red-star" label="手机" @blur.native.capture="checkMobile" :state="userState.mobile" placeholder="请输入手机号" type="tel" v-model="user.mobile"></mt-field>
      <mt-field class="red-star" label="密码" @blur.native.capture="checkPassword" :state="userState.password" placeholder="请输入密码" type="password" v-model="user.password"></mt-field>
      <mt-field class="red-star" prop="name" @blur.native.capture="checkName" :state="userState.name" label="姓名" slot="icon" placeholder="请输入姓名" v-model="user.name"></mt-field>
      <mt-field class="no-star" readonly label="性别" @click.native="sexVisible = true" placeholder="请选择性别" type='tel' v-model="user.sex"></mt-field>
      <mt-button class="btn" @click="register" type="primary" size="large">提交</mt-button>

      <div class="sexPicker">
        <mt-popup v-model="sexVisible" position="bottom">
          <mt-picker :slots="slots" @change="onSexChange"></mt-picker>
        </mt-popup>
      </div>
      <!-- <mt-radio title="请选择性别" v-model="user.sex" :options="['男', '女']"></mt-radio> -->
      <!-- <form class="sex">
        <span calss="sex-title">性别</span> 
        <input type="radio" name="sex" value="男" >男

        <input type="radio" name="sex" value="女">女
      </form>-->
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
      userState: {
        name: "",
        sex: " ",
        mobile: "",
        password: ""
      },

      sexVisible: false, //选择器的显示与影藏
      slots: [
        {
          flex: 1,
          content: "性别",
          values: ["", "男", "女"],
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  methods: {
    //校验表单
    checkMobile() {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let mobile = this.user.mobile;
      this.userState.mobile = reg.test(mobile) ? "success" : "error";
      this.userState.mobile ==="error" && this.$toast({ message: "请输入正确的手机号码!", position: "top" });
    },
    checkName() {
      let reg = /^[\u4E00-\u9FA5]+$/; //判断是全为汉字 并且<=4个字
      let name = this.user.name;
      this.userState.name =
      reg.test(name) && name.length <= 4 ? "success" : "error";
      this.userState.name ==="error" && this.$toast({ message: "姓名不能超过4个汉字!", position: "top" });
    },
    checkPassword() {
      let password = this.user.password;
      this.userState.password = password.length >= 6 ? "success" : "error";
      this.userState.password ==="error" && this.$toast({ message: "密码最少6个字符!", position: "top" });
    },
    onSexChange(picker, values) {
      this.user.sex = values[0];
      this.sexVisible = false;
    },
    register() {
      let userdata = {
        name: this.user.name,
        sex: this.user.sex,
        mobile: this.user.mobile,
        password: this.user.password
      };
      //判断对象是否有某些值
      for (var p in this.userState) {
        if (this.userState[p] === "error" || this.userState[p] === "") {
          this.$messagebox("提示", "请填写完善相关信息后再提交!");
          return;
        }
      }
      console.log("断点 :");

      this.$http
        //这里的 register 是路由，传送到 userApi.js 接口，以下的 searchUser 和 editUser 类似
        .post("/api/user/register", userdata, {})

        //注册用户成功
        .then(response => {
          console.log("response :", response); //不是查询，返回的数据没有用户信息
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
          this.$http.post("/api/user/loginlog", userdata).then(response => {});

          this.user = {};
          this.$toast("用户增加成功!");
          //跳转到主页
          this.$router.push("/home");
        });
    }
    //   created(){
    //   setTimeout(()=>{$('a').css({'float':'left','border':'none','padding':'0','backgroundColor':'none','border':'none','marginRight':'0.5rem'}) //使选项可以并列展示等
    //   $('.mint-radio-core').removeClass('mint-radio-core').addClass('mint-radio-core');//修改单选选项的圆点样式
    //   $('.mint-cell:last-child').css('backgroundImage','none')//将默认背景图片设置清楚
    //   $('.mint-radio').css('marginRight','0');
    //   $('.mint-radiolist-label').css('padding','0')
    //   $('.mint-cell-value').css('width','0')
    //   },10);
    // }
  }
};
</script>

<style scoped>
h3 {
  margin-top: 30px;
}
.star-color {
  color: red;
  margin: 15px 0 0;
}
.input-item {
  display: flex;
}

/* mint-ui修改局部样式的方法 参考https://yq.aliyun.com/articles/693040 */
.input-item >>> input {
  border: 1px solid grey;
}

.input-item /deep/ textarea {
  border: 1px solid grey;
}
.red-star >>> .mint-cell-title::before {
  content: "*";
  color: red;
}
.no-star >>> .mint-cell-title::before {
  content: "*";
  color: rgb(255, 255, 255);
}
.sex {
  margin-top: 30px;
}
.btn {
  /* background-color: #05AFAF; */
}
</style>