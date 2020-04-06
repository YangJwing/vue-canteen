<!--
 * @作者: Edwin Yeung
 * @Date: 2020-04-05 21:54:24
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-04-06 11:36:19
 * @描述: 
 -->
<template>
  <div class="help">
    <van-nav-bar title="帮助" left-arrow left-text="返回" @click-left="onClickLeft" />
    <!-- <div class="title">
      使用帮助
    </div> -->
    <div class="content">
      <van-tag type="success">订餐登记</van-tag>
      <p>选中对应的餐段，选中后购物车就会显示所订的餐和订餐数量，订好餐后进行提交即可。订餐须知请参看订餐页面的说明。</p>
      <div v-if="role">
        <van-tag type="success">订餐情况统计表</van-tag>（仅管理员可见）
        <p>查看当天（默认当天，可选定日期）的订餐人数统计，分别点击不同的餐段就会显示该餐段的人数，如点击早餐就显示早餐的订餐人数，点击午餐就显示午餐的订餐人数如此类推！</p>
      </div>
      <van-tag type="success">订餐记录</van-tag>
      <p>查看我一直以来的订餐记录，有颜色的已订餐，灰色的为没有订餐。</p>
      <van-tag type="success">设置</van-tag>
      <p>可设置是否显示公告栏、广告栏和通知栏。</p>
      <van-tag type="success">帮助</van-tag>
      <p>本页面</p>
      <van-tag type="success">问题与建议</van-tag> 
      <p>使用过程中发现问题或有好的建议可通过本功能将问题类型，详细的描述发送给后台，让开发者不断纠正程序错误和完善程序功能。</p>
      <van-tag type="success">注销我的登录</van-tag>
      <p>注销我的登录之后，手机就不保留你的登录状态，下次使用订餐程序时必须输入用户名（手机号）和密码进行登录。建议不用注销登录，每次打开程序即可使用！</p>
    </div>
    
    <div class="content">订餐小程序... (期待您的发现)</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        role:null,
    };
  },
  methods: {
    onClickLeft() {
      //返回上一页
      this.$router.go(-1);
    }
  },
  created(){
      this.role = this.$store.state.role ? this.$store.state.role : "";
  }
};
</script>

<style scope>
.van-nav-bar__title {
  color: #000;
}
div.help{
  color: #666;
}
.title {
  margin: 30px auto 10px auto;
  /* margin:0 auto ; */
  width: 300px;
  text-align: center;
  font-size: 18px;
}
.content {
  margin: 20px;
  font-size: 14px;
}
p{
  margin:3px 0 15px 8px;
}
</style>