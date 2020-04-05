<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-30 00:38:45
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-30 17:25:39
 * @描述: 
 -->
<template>
  <div class="setup">
    <van-nav-bar title="设置" left-arrow left-text="返回" @click-left="onClickLeft" />

    <van-cell title="公告栏" :label="`${show[1]==true?'':'不'}显示公告栏`">
      <!-- 用 title 插槽来自定义标题 -->
      <template #right-icon>
        <van-switch v-model="notice" size="24px" @click="toggle(1)" />
      </template>
    </van-cell>
    <van-cell title="广告栏" :label="`${show[2]==true?'':'不'}显示广告栏`">
      <!-- 用 title 插槽来自定义标题 -->
      <template #default>
        <van-switch v-model="adv" size="24px" @click="toggle(2)" />
      </template>
    </van-cell>
    <van-cell title="通知" :label="`${show[3]==true?'':'不'}显示通知`">
      <!-- 用 title 插槽来自定义标题 -->
      <template #default>
        <van-switch v-model="memo" size="24px" @click="toggle(3)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice: true,
      adv: true,
      memo:true,
      show: {
          1:true,
          2:true,
          3:true,
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toggle(index) {
      this.show[index] = !this.show[index];
    }
  }
};
</script>

<style>
.van-nav-bar__title {
  color: #000;
}
</style>