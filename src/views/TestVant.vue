<template>
  <div class="register">
    <van-form validate-first @failed="onFailed">
      <!-- 手机通过 validator 进异步行函数校验 -->
      <van-field
        v-model="user.mobile"
        type="number"
        name="mobile"
        label="手机"
        placeholder="请输入手机号码"
        :rules="[{ validator:checkMobileOnDB, message: '请输入正确的手机号码' }]"
      />
      <!-- 密码通过 pattern 进行正则校验 -->
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入姓名"
        :rules="[{message: '密码长度最少6位' }]"
      />
      <!-- 姓名通过 pattern 进行正则校验 -->
      <van-field
        v-model="user.name"
        name="name"
        label="姓名"
        maxlength="4"
        placeholder="请输入姓名"
        :rules="[{ pattern:regName, message: '请输入中文姓名，长度2-4个汉字' }]"
      />
      <!-- 性别 -->
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="user.sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
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
      regName: /^[\u4E00-\u9FA5]+$/ //正则 中文名
    };
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      let reg = /1\d{10}/;
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    checkMobileOnDB(val) {
      this.$toast.loading("验证中...");
      this.$http.post("/api/user/checkmobile", val, {}).then(response => {
        //判断用户名和密码是否正确,用后台返回的msg作为判断
        if (!response.body.isExistMobile) {
          //手机没有存在,可以增加
          console.log("提示：", response);
          this.$toast.clear();
          return true;
        } else {
          console.log("object :");
          this.$toast('手机号已存在,请重新输入!')
          return false;
        }
      });

      // return new Promise(resolve => {
      //   // Toast.loading('验证中...');
      //   this.$toast.loading('验证中...');

      //   setTimeout(() => {
      //     this.$toast.clear();
      //     let reg=/\d{6}/
      //     resolve(reg.test(val));
      //   }, 1000);
      // });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    }
  }
};
</script>

<style>
</style>