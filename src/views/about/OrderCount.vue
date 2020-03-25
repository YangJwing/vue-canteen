<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-25 21:22:40
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-26 01:32:19
 * @描述: 
 -->
<template>
  <div class="order-count">
    <van-nav-bar title="订餐情况统计" left-arrow left-text="返回" @click-left="$router.go(-1)" />
    <div class="count-group">
      <!-- <div class="count-item" style="margin:10px;color:#666;">{{dineDate}} 订餐情况</div> -->
      <van-cell :title="dineDate" is-link value="详情" @click="orderDetails">
        <template #right-icon>
          <van-icon name="orders-o" style="line-height: inherit;" />
        </template>
      </van-cell>
      <van-grid :column-num="3">
        <van-grid-item
          :icon="require('@/assets/img/breakfast.png')"
          text="早餐"
          :badge="count.breakfast"
        />
        <van-grid-item :icon="require('@/assets/img/lunch.png')" text="午餐" :badge="count.lunch" />
        <van-grid-item :icon="require('@/assets/img/dinner.png')" text="晚餐" :badge="count.dinner" />
      </van-grid>
      <van-tag v-for="(name,i) in names" key="name" type="primary" plain >{{name.name}}</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dineDate: new Date().Format("m月dd日（D）"),
      count: { breakfast: 0, lunch: 0, dinner: 0 },
      names: []
    };
  },
  methods: {
    ordercount() {
      let orderdate = new Date().Format("yyyy/mm/dd");
      this.$http
        .get("/api/user/ordercount", { params: { orderdate: orderdate } })
        .then(response => {
          // console.log('response :', response);
          var body = response.body[0];
          this.count.breakfast = response.body[0].breakfast;
          this.count.lunch = response.body[0].lunch;
          this.count.dinner = response.body[0].dinner;
        });
    },
    //分类查找订餐人员清单
    orderDetails(dining) {
      let obj = {
        dining: dining,
        orderdate: new Date().Format("yyyy/mm/dd")
      };
      this.$http
        .get("/api/user/orderdetails", {params: obj})
        .then(response => {
          console.log("人员response :", response);
          this.names = response.body;
          console.log('this.names :', this.names);
        });
    }
  },
  created() {
    this.ordercount();
    this.orderDetails("lunch");
  }
};
</script>

<style scope>
.van-nav-bar__title {
  color: #000;
}
</style>