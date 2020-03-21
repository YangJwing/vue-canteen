<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-15 12:01:36
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-20 19:59:57
 * @描述: 
 -->
<template>
  <div id="about">
    <van-notice-bar>中国电信东莞企石分公司食堂报餐系统 Ver1.0 正式上线，使用过程中欢迎提出宝贵建议，建议请发到 yangjwing@163.com ，谢谢！</van-notice-bar>
    <!-- <van-card :thumb="require('@/assets/img/avatar.jpg')" :title="getName" /> -->
    <div class="avatar">
      <van-image
        class="avatar-item imag"
        round
        cover
        width="5rem"
        height="5rem"
        :src="require('@/assets/img/avatar.jpg')"
      />
      <div class="avatar-item">
        <div class="avatar-item userinfo user">{{getName}}</div>
        <div class="avatar-item userinfo mobile">
          <van-icon name="phone-o" />
          13712796608
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {},
  computed: {
    getName() {
      return (this.name = this.$store.state.user ? this.$store.state.user : "");
    }
  }
};
</script>

<style scope>
.avatar {
  display: flex;
}
.avatar-item {
  margin: 10px 10px 10px 10px;
}
.avatar-item.userinfo {
  margin: 10px 20px 10px 0px;
}
.user {
  font-size: 20px;
}
.mobile {
  background-color: rgba(142, 194, 224, 0.418);
  padding: 2px 8px 2px 8px;
  font-size: 12px;
  border-radius: 12px;
}
</style>