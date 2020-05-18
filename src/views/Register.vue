<template>
  <div class="register">
    <h3 class="title">注册新用户</h3>
    <van-form validate-first @failed="onFailed" @submit="onSubmit">
      <!-- 手机通过 validator 进异步行函数校验 -->
      <van-field
        v-model="user.mobile"
        type="tel"
        name="mobile"
        required
        label="手机"
        placeholder="请输入手机号码"
        :rules="[{ validator:checkMobileInDB, message: '请按格式输入手机号码' }]"
      />
      <!-- 密码通过 pattern 进行正则校验 -->
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        required
        label="密码"
        placeholder="请输入密码"
        :rules="[{pattern:regPassword, message: '密码长度最少6位' }]"
      />
      <!-- 姓名通过 pattern 进行正则校验 -->
      <van-field
        v-model="user.name"
        name="name"
        required
        label="姓名"
        maxlength="4"
        placeholder="请输入姓名"
        :rules="[{ pattern:regName, message: '中文姓名，长度2-4个汉字' }]"
      />
      <!-- 性别 -->
      <van-field name="sex" required label="性别">
        <template #input>
          <van-radio-group v-model="user.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女" checked-color="rgb(255, 85, 218)">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        mobile: "",
        password: "",
        name: "",
        sex: ""
      },
      regMobile: /^[1][3,4,5,7,8,9][0-9]{9}$/, //正则 手机
      regName: /^[\u4E00-\u9FA5]+$/, //正则 中文名
      regPassword:/.{6,}/,
    };
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    checkMobileInDB(val) {
      let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (reg.test(val)) {
        // this.$toast.loading("验证中...");
        console.log("val :", val);
        this.$http
          .post("/api/user/checkmobile", { mobile: val }, {})
          .then(response => {
            //判断手机是否已注册
            if (!response.body.isExistMobile) {
              //未注册
              this.$toast.clear();
              return true;
            } else {
              //已注册
              this.$notify({type:"danger",message:"手机号已注册，请重新输入！"});
              return false;
            }
          });
      } else {
        return false
      }
    },
     onSubmit(values) {
        console.log('values :', values);
        console.log('this.user :', this.user);
        this.$http
        //这里的 register 是路由，传送到 userApi.js 接口，以下的 searchUser 和 editUser 类似
        .post("/api/user/register", values, {})

        //注册用户成功
        .then(response => {
          console.log("response :", response); //不是查询，返回的数据没有用户信息
          //state的islogin设为true
          this.$store.commit("SET_LOGIN", true);

          //设置TOKEN 和 localstorage
          this.$store.commit("SET_TOKEN", values);
          console.log("this.state.token:", this.$store.state.token);

          //获得用户信息
          this.$store.commit("GET_USER", values.name);
          this.$store.commit("GET_MOBILE", values.mobile);
          this.$store.commit("GET_SEX", values.sex);
          // console.log('user :', this.$store.state.user);

          values.state = "首次注册登录";

          //记录登录日志
          this.$http.post("/api/user/loginlog", values).then(response => {});

          this.user = {};
          this.$toast("用户增加成功!");
          this.$notify({type:"success",message:"用户注册成功！"});
          //跳转前赋值

          // //跳转到主页
          // this.$router.push("/home");

          //跳转到登录
          this.$router.push("/login");
          this.$toast('注册后请重新登录！')
        });
     },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    }
  }
};
</script>

<style>
.title{
margin:50px auto 20px auto;
width:320px;
text-align:center;
}

</style>