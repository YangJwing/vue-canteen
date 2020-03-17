<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-16 02:34:31
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-16 02:39:15
 * @描述: 
 -->
<template>
  <div class="hello">
    <img src="~assets/img/logo.png" class="tb_logo"/>
    <mt-field :placeholder="accountPlaceholder" v-model="username"></mt-field>
    <mt-field v-show="isUserAccount" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field v-show="!isUserAccount" placeholder="校验码" v-model="verifyCode">
      <span class="check_code">获取短信校验码</span>
    </mt-field>
    <div class="registerDiv">
      <span class="fl">免费注册</span>
      <span v-show="forgetpassword" class="fr">忘记密码</span>
    </div>    
    <mt-button type="default" size="large" @click="loginMsgBox">登录</mt-button>
    <mt-button type="primary" size="large"  plain @click="changeLoginMethod">{{accountText}}</mt-button>
  </div>  
</template>

<script>
import {MessageBox} from 'mint-ui'
export default {
  name: 'HelloWorld',
  data () {
    return {
      username:'',
      password:'',      
      verifyCode:'',
      isUserAccount:true,
      forgetpassword:true,
      accountPlaceholder:'手机号/邮箱/会员名',
      accountText:'短信验证登录'
    }
  },
  methods:{
    loginMsgBox(){
      MessageBox({
        message: '请输入用户名'
      });
    },
    changeLoginMethod(){
      this.isUserAccount = !this.isUserAccount;
      this.forgetpassword = !this.forgetpassword;
      this.accountPlaceholder = this.isUserAccount ? '手机号/邮箱/会员名' : '请输入手机号码'
      this.accountText = this.isUserAccount ? '短信验证登录':'账户密码登录'
    }
  }
}
</script>

<style>

</style>