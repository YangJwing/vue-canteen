<!--
 * @作者: Edwin Yeung
 * @Date: 2020-04-05 21:54:24
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-04-06 11:37:47
 * @描述: 
 -->
<template>
  <div class="about-me">
    <van-nav-bar title="关于" left-arrow left-text="返回" @click-left="onClickLeft" />
    <div class="title">
      关于企石电信食堂订餐小程序
      <van-tag type="success">Ver1.0</van-tag>
    </div>
    <div class="content">
      订餐小程序是一款移动端的小程序，是受企石电信黄局所托，利用业余时间开发的一款订餐管理系统，
      是为解决企石电信食堂每天微信群接龙所造成的不便而应运而生。
    </div>
    <div class="content">订餐小程序可以进行个人订餐、查看订餐记录，食堂管理人员统计每天的订餐（早餐、午餐、晚餐）人数、通知公告等功能于一身。</div>
    <div class="content">因本人技术水平有限，开发过程难免有错漏，使用过程中发现问题或有好的建议，请通过“问题与建议”进行反馈</div>
    <div class="content">订餐小程序更是/更有... (期待您的发现)</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      //返回上一页
      this.$router.go(-1);
    }
  }
};
</script>

<style scope>
.van-nav-bar__title {
  color: #000;
}
div.about-me {
  color: #666;
}
.title {
  margin: 30px auto 10px auto;
  /* margin:0 auto ; */
  width: 320px;
  text-align: center;
  font-size: 18px;
}
.content {
  margin: 20px;
  font-size: 15px;
}
</style>