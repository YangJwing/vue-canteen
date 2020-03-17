<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-15 13:59:31
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-16 17:42:01
 * @描述: https://www.cnblogs.com/xiaomili/p/6759401.html
 -->
<template>
  <div class="hello">
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/login" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="page-swipe">
      <mt-swipe :auto="3000">
        <mt-swipe-item :class="{slide1:true}">1</mt-swipe-item>
        <mt-swipe-item :class="{slide2:true}">2</mt-swipe-item>
        <mt-swipe-item :class="{slide3:true}">3</mt-swipe-item>
      </mt-swipe>
    </div>

    <mt-button class="icon-btn" type="primary" size="large">
      <img src="~assets/img/home.svg" height="20" width="20" slot="icon" />
      带自定义图标
    </mt-button>
    
    <ul>
      <li v-for="item in 300">{{item}}</li>
    </ul>

    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="外卖">
        <img slot="icon" src="~assets/img/home.svg" />
        外卖
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="~assets/img/category.svg" />
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="~assets/img/shopcart.svg" />
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="~assets/img/profile.svg" />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      phone: "",
      selected: 2
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-swipe .mint-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}
.page-swipe .mint-swipe-item {
  line-height: 200px;
}
.page-swipe .slide1 {
  background-color: #0089dc;
  color: #fff;
}
.page-swipe .slide2 {
  background-color: #ffd705;
  color: #000;
}
.page-swipe .slide3 {
  background-color: #ff2d4b;
  color: #fff;
}
.page-swipe-desc {
  text-align: center;
  color: #666;
  margin-bottom: 5px;
}

.icon-btn {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>