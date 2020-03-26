<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-25 21:22:40
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-26 13:08:11
 * @描述: 
 -->
<template>
  <div class="order-count">
    <van-nav-bar title="订餐情况统计" left-arrow left-text="返回" @click-left="$router.go(-1)" />
    <div class="count-group">
      <!-- <van-cell :title="dineDate" is-link value="详情" @click="selectDate"> -->
      <van-cell :title="showdate" value="详情" is-link @click="show = true">
        <template #right-icon>
          <van-icon name="orders-o" style="line-height: inherit;" />
        </template>
      </van-cell>
      <!--选择日期 -->
      <van-calendar v-model="show" :show-confirm="false" :min-date="minDate" :default-date="defaultDate" @confirm="onConfirm" />

      <van-grid :column-num="3">
        <van-grid-item
          :icon="require('@/assets/img/breakfast.png')"
          text="早餐"
          :badge="count.breakfast"
          @click="orderDetails('breakfast')"
        />
        <van-grid-item
          :icon="require('@/assets/img/lunch.png')"
          text="午餐"
          :badge="count.lunch"
          @click="orderDetails('lunch')"
        />
        <van-grid-item
          :icon="require('@/assets/img/dinner.png')"
          text="晚餐"
          :badge="count.dinner"
          @click="orderDetails('dinner')"
        />
      </van-grid>
      <!-- 显示各餐段人员姓名 -->
      <div class="select-dining">{{selectDining}}</div>
      <van-tag v-for="(item,i) in names" key="item" type="primary" plain>{{item.name}}</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: { breakfast: 0, lunch: 0, dinner: 0 },
      selectDining:'',
      names: [],
      show: false,
      orderdate: new Date().Format('yyyy/mm/dd'),
      showdate:new Date().Format('m月d日 D'),
      minDate:new Date(2020,0,1),
      defaultDate:new Date(),
    };
  },
  methods: {
    onConfirm(date) {
      console.log('date :', date);
      this.show = false;
      this.orderdate = date.Format('yyyy/mm/dd')
      this.showdate=date.Format('m月d日 D')
      //调用
      this.orderCount()
    },
    orderCount() {
      let orderdate = this.orderdate
      console.log('this.orderdate :', this.orderdate);
      this.$http
        .get("/api/user/ordercount", { params: { orderdate: orderdate } })
        .then(response => {
          // console.log('response :', response);
          var body = response.body[0];
          this.count.breakfast = response.body[0].breakfast||0;
          this.count.lunch = response.body[0].lunch||0;
          this.count.dinner = response.body[0].dinner||0;
        });
    },
    //分类查找订餐人员清单
    orderDetails(dining) {
      let obj = {
        orderdate: this.orderdate
      };
      let s;
      if (dining == "breakfast") {s = "/api/user/orderdetails_b",this.selectDining='早餐'}
      if (dining == "lunch") {s = "/api/user/orderdetails_l",this.selectDining='午餐'}
      if (dining == "dinner") {s = "/api/user/orderdetails_d",this.selectDining='晚餐'}
      // console.log("s :", s);
      this.$http.get(s, { params: obj }).then(response => {
        // console.log("人员response :", response);
        this.names = response.body;
        // console.log("this.names :", this.names);
      });
    },
    selectDate() {}
  },
  created() {
    this.orderCount();
    // this.orderDetails("breakfast");
  }
};
</script>

<style scope>
.van-nav-bar__title {
  color: #000;
}
.select-dining{
  margin:10px 0 10px 10px;
  color:#666;
  border-bottom: 1px solid #eee;
}
.van-tag.van-tag--plain.van-tag--primary.van-hairline--surround{
  margin:5px 5px 5px 5px;
}
</style>