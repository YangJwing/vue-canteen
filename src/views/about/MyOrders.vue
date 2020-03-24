<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-25 00:40:22
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-25 01:06:32
 * @描述: 
 -->

<template>
  <div class="my-orders">
    <van-nav-bar title="订餐记录" left-arrow left-text="返回" @click-left="onClickLeft" />
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
</style>