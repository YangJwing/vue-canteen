<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-15 13:59:31
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-22 01:29:01
 * @描述: 
 -->
<template>
  <div class="home">
    <!-- <h3>这是首页</h3> -->
    <van-nav-bar class="home-nav" title="企石食堂报餐系统" fixed :right-text="this.$store.state.user1" />
    <!-- 人员信息 -->
    <div class="container">
      <div class="item user">订餐人员：杨俊荣</div>
      <!-- 订餐管理 -->
      <div class="order-group">
        <van-tag class="tag-order" color="#f2826a" text-color="#fff" size="large">就餐登记</van-tag>
        <div class="btn-order">
          <van-button text="早餐" type="primary" :plain="!dining.breakfast" :icon="dining.breakfast?'cart':''" @click="dine(0)"> </van-button>
          <van-button text="午餐" type="primary" :plain="!dining.lunch" :icon="dining.lunch?'cart':''" @click="dine(1)"> </van-button>
          <van-button text="晚餐" type="primary" :plain="!dining.dinner" :icon="dining.dinner?'cart':''" @click="dine(2)"> </van-button>
        </div>
        <div class="order-show">

            <!-- <div v-show="dining.breakfast||dining.lunch||dining.dinner">你订了:</div> -->
            <van-icon :dot="dining.breakfast||dining.lunch||dining.dinner" name="cart-o" size="35px" color="green" />
            <van-tag type="success" v-show="dining.breakfast">早餐</van-tag>
            <van-tag type="success" v-show="dining.lunch">午餐</van-tag>
            <van-tag type="success" v-show="dining.dinner">晚餐</van-tag>
          </div>
      </div>
      <!-- 订餐须知 -->
      <div class="notice-group">
        <van-tag class="tag-notice" color="#f2826a" size="large">订餐须知</van-tag>
        <div class="notice-item">
          <van-icon name="info" color="#fbe0dc" size="12px" />早餐请提前一天18点前下单
        </div>
        <div class="notice-item">
          <van-icon name="info" color="#fbe0dc" size="12px" />午餐上午10点前截止
        </div>
        <div class="notice-item">
          <van-icon name="info" color="#fbe0dc" size="12px" />晚餐下午4点前截止
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // dining:[],
      dining:{
        breakfast:false,
        lunch:false,
        dinner:false
      },
      isture:true,
    };
  },
  methods: {
    dine(index) {
      switch(index){
        case 0:
          this.dining.breakfast=!this.dining.breakfast
          break
        case 1:
          this.dining.lunch=!this.dining.lunch
          break
        case 2:
          this.dining.dinner=!this.dining.dinner
          break
      }
    }
  }
};
</script>

<style >
.home-nav {
  background-color: rgb(247, 247, 247);
}
.container {
  color: grey;
}
[class$="group"] {
  background-color: #f3f3f3;
  margin: 10px 0 10px 0;
  padding: 20px 0 20px 0;
}
.van-tag {
  margin: 10px 0 10px 20px;
}
.notice-group {
  border-bottom: solid 1px rgb(231, 231, 231);
}
.notice-item {
  font-size: 13px;
  padding: 1px 0 1px 0;
  margin: 0 0 3px 30px;
  /* background-color:blue; */
}
.btn-order {
  display: flex;
  justify-content: space-around;
  margin: 10px 10px 10px 10px;
}
.order-show{
  display: flex;
  justify-content: flex-start;
  margin:30px 10px 10px 40px;
  /* border-bottom: 2px solid green; */
}
.order-show-item{
/* padding:5px 10px; */
}
</style>