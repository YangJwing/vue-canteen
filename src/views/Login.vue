<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-17 21:49:53
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-21 18:23:34
 * @描述: 
 -->

<template>
  <div class="login">
    <!-- 中国电信LOGO -->
    <!-- <van-image  :src="require('@/assets/img/china-telecom.jpg')" /> -->
    <h3 style="margin:30px 20px 20px 20px;text-align:center">密码登录</h3>
    <van-form @submit="onSubmit">
      <van-field ref='loginfield'
        v-model="mobile"
        type="number"
        name="mobile"
        label-align="left"
        label="用户名"
        placeholder="请输入手机号码"
        :rules="[{required:true,message:'请填写手机号码'}]"
        left-icon="user-o"
        border
      />

      <van-field
        v-model="password"
        type="password"
        name="password"
        label-align="left"
        label="密码"
        placeholder="请输入密码"
        :rules="[{required:true,message:'请填写密码'}]"
        left-icon="closed-eye"
        border
      />
      <div style="margin:16px">
        <van-button round block type="info" natve-type="submit">提交</van-button>
      </div>

      <div class="login-register">
        <span @click="register">注册</span>
        <span @click="forget">忘记密码？</span>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      password: ""
    };
  },
  methods: {
    register() {
      console.log("register click");
      this.$router.push("/register");
    },
    //提交密码校验
    onSubmit(values) {
      let loginData = values;
      this.$http
        .post("/api/user/logincheck", values, {})
        .then(response => {
          //判断用户名和密码是否正确,用后台返回的msg作为判断
          if (!response.body.msg) {
            //state的islogin设为true
            this.$store.commit("SET_LOGIN", true);

            //设置TOKEN 和 localstorage
            this.$store.commit("SET_TOKEN", response.body[0]);
            console.log("this.state.token:", this.$store.state.token);

            //获得用户名和ID
            this.$store.commit("GET_USER", response.body[0].name);
            this.$store.commit("GET_USERID", response.body[0].id);
            // console.log('user :', this.$store.state.user);

            loginData.name = response.body[0].name;
            loginData.mobile = response.body[0].mobile;
            loginData.state = "成功";

            //记录登录日志
            this.$http
              .post("/api/user/loginlog", loginData)
              .then(response => {});

            //跳转到主页
            this.$router.push("/home");
            // console.log("提示：", response);
          } else {
            //失败
            this.$store.commit("LOGOUT");
            loginData.mobile = this.mobile;
            loginData.state = "失败";
            // console.log("response.body :", response.body);
            this.$toast(response.body.msg);
            // console.log("this.state.token:", this.$store.state.token);
          }
        })
        .catch(err => {
          console.log("错误:", err);
          alert("错误代码: " + err.status + ", 错误信息:" + err.statusText);
        });
    },
    forget() {
      this.$toast("忘记密码，请联系黄局，谢谢！");
    }
  },
  mounted(){
    // this.$refs.loginfield.focus()
  },
};
</script>

<style scope>
.login-register {
  display: flex;
  justify-content: space-between;
  /* align-items: baseline; */
}
.login-register span {
  font-size: 10px;
  color: cornflowerblue;
  font-size: 13px;
  margin: 10px 30px 10px 30px;
}
</style>