<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-25 00:40:22
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-04-05 21:44:56
 * @描述: 
 -->

<template>
  <div class="my-orders">
    <van-nav-bar title="订餐记录" left-arrow left-text="返回" @click-left="onClickLeft" />
    <div class="orderdetail">
      <van-cell title="日期" icon="clock-o" value="订餐情况">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <!-- <template #right-icon>
          <van-icon name="eye-o" style="line-height: inherit;" />
        </template> -->
      </van-cell>
      <van-cell v-for="item in orders" key="item" label :title="item.orderdate">
        <!-- 用 title 插槽来自定义标题 -->
        <template #default>
          <van-tag class="right-tag" v-show="item.breakfast" type="success">早餐</van-tag>
          <van-tag class="right-tag" v-show="!item.breakfast" plain >早餐</van-tag>
          <van-tag class="right-tag" v-show="item.lunch" type="primary">午餐</van-tag>
          <van-tag class="right-tag" v-show="!item.lunch" plain >午餐</van-tag>
          <van-tag class="right-tag" v-show="item.dinner" type="warning">晚餐</van-tag>
          <van-tag class="right-tag" v-show="!item.dinner" plain >晚餐</van-tag>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderDate: null,
      dining: "",
      orders: {}
    };
  },
  methods: {
    onClickLeft() {
      //返回上一页
      this.$router.go(-1);
    },
    myorders() {
      let userid = this.$store.state.userid;
      console.log("userid :", userid);
      this.$http
        .get("/api/user/myorders", { params: { userid: userid } })
        .then(response => {
          let o = response.body;
          // for (let i = 0; i < o.length; i++) {
          //   //从数据库取出来的日期是字符串,必须先转换为日期类型,再作后续处理
          //   o[i].orderdate = new Date(o[i].orderdate).Format("yyyy-mm-dd D");
          //   o[i].breakfast = o[i].breakfast ? "早餐 " : "";
          //   o[i].lunch = o[i].lunch ? "午餐 " : "";
          //   o[i].dinner = o[i].dinner ? "晚餐 " : "";
          // }
          for (let p of o) {
            //从数据库取出来的日期是字符串,必须先转换为日期类型,再作后续处理
            p.orderdate = new Date(p.orderdate).Format("yyyy-mm-dd D");
            // p.breakfast = p.breakfast ? "早餐 " : "";
            // p.lunch = p.lunch ? "午餐 " : "";
            // p.dinner = p.dinner ? "晚餐 " : "";
          }
          this.orders = o;
          // console.log("response.body :", o);
        });
    }
  },
  created() {
    this.myorders();
  }
};
</script>

<style scope>
.van-nav-bar__title {
  color: #000;
}
/* 解决订餐记录标签不能上对齐 */
.van-tag.right-tag {
  margin: -5px 5px 0 -5px;
}
</style>