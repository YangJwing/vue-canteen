<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-15 13:59:31
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-04-05 22:23:26
 * @描述: 
 -->
<template>
  <div class="home">
    <!-- <h3>这是首页</h3> -->
    <van-nav-bar class="home-nav" title="企石电信食堂订餐小程序" fixed :right-text="this.$store.state.user1" />
    <div class="container">
      <!-- 人员信息 -->
      <div class="userinfo-group">
        <van-icon name="user-o" size="20px" />
        <div>{{getName}}</div>
      </div>

      <!-- 订餐登记 -->
      <div class="order-group">
        <div class="order-title">
          <van-tag class="tag-order" color="#f2826a" text-color="#fff" size="large">订餐登记</van-tag>
          <div>
            {{dineDate.Format("m月d日 D")}}
            <span v-if="canDine.dinner">订餐</span>
            <span style="color:red;" v-else="!canDine.dinner">订餐时间已过</span>
          </div>
        </div>
        <div class="order-btn">
          <van-button
            text="早餐"
            type="primary"
            hairline
            :disabled="!canDine.breakfast"
            :plain="!dining.breakfast"
            :icon="dining.breakfast?'success':''"
            @click="dine(0)"
          ></van-button>
          <van-button
            text="午餐"
            type="primary"
            hairline
            :disabled="!canDine.lunch"
            :plain="!dining.lunch"
            :icon="dining.lunch?'success':''"
            @click="dine(1)"
          ></van-button>
          <van-button
            text="晚餐"
            type="primary"
            hairline
            :disabled="!canDine.dinner"
            :plain="!dining.dinner"
            :icon="dining.dinner?'success':''"
            @click="dine(2)"
          ></van-button>
        </div>
        <div class="order-show">
          <van-icon name="cart-o" size="35px" color="#666" :badge="cartCount" />
          <van-tag class="order-show-tag" type="success" v-show="dining.breakfast">早餐</van-tag>
          <van-tag class="order-show-tag" type="primary" v-show="dining.lunch">午餐</van-tag>
          <van-tag class="order-show-tag" type="warning" v-show="dining.dinner">晚餐</van-tag>
          <van-tag
            class="order-show-tag"
            type="danger"
            v-show="!canDine.dinner"
            @click="tagOnClick"
          >今天订餐时间已过，6点后再开放订餐</van-tag>
        </div>
      </div>

      <!-- 订餐须知 -->
      <div class="notice-group">
        <van-tag class="tag-notice" color="#f2826a" size="large">订餐须知</van-tag>
        <div class="notice-item">
          <van-icon name="info" color="#fbe0dc" size="12px" />早餐当天 8:00 前订餐
        </div>
        <div class="notice-item">
          <van-icon name="info" color="#fbe0dc" size="12px" />午餐当天 10:00 前订餐
        </div>
        <div class="notice-item">
          <van-icon name="info" color="#fbe0dc" size="12px" />晚餐当天下午 4:00 前订餐
        </div>
        <div class="notice-item">
          <van-icon name="info" color="#fbe0dc" size="12px" />下午 6:00 后可订第二天餐
        </div>
      </div>

      <!-- 提交 -->
      <!-- <div class="dine-date">{{dineDateFormat}}</div> -->
      <div style="margin:16px">
        <van-button
          round
          block
          type="info"
          :disabled="!(dining.breakfast||dining.lunch||dining.dinner)"
          natve-type="submit"
          @click="onSubmit"
        >提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否选择就餐,
      dining: {
        breakfast: false,
        lunch: false,
        dinner: false
      },
      //能否订餐
      canDine: {
        breakfast: true,
        lunch: true,
        dinner: true
      },
      //显示购物车的数量
      cartCount: "",
      //用户信息
      user: {
        name: "",
        sex: ""
      },
      //就餐日期(格式显示)
      dineDate: new Date()
      // dineDateFormat: new Date().Format("yyyy年mm月dd日  D"),
    };
  },
  computed: {
    getName() {
      return (this.user.name = this.$store.state.user);
    }
  },

  methods: {
    test() {
      let d = new Date();
      console.log(d.getDayName());
      console.log(d.Format("yyyy年mm月dd日 hh:MM:ss HH a D"));
    },
    //登记就餐
    dine(index) {
      switch (index) {
        case 0:
          this.dining.breakfast = !this.dining.breakfast;
          this.dining.breakfast ? this.cartCount++ : this.cartCount--;
          break;
        case 1:
          this.dining.lunch = !this.dining.lunch;
          this.dining.lunch ? this.cartCount++ : this.cartCount--;
          break;
        case 2:
          this.dining.dinner = !this.dining.dinner;
          this.dining.dinner ? this.cartCount++ : this.cartCount--;
          break;
      }
      if (this.cartCount == 0) this.cartCount = "";
    },
    //判断能否登记订餐
    checkCanDine() {
      /* 判断：当前时间 > 18:00 登记日期=当前日期 + 1 = 明天
       * 　　　当前时间 < 16:00 登记日期=当前日期
       */
      let now = new Date();
      // now.setHours(9); //临时设成6点方便测试
      // now.setMinutes(59);
      const nowTime = now.getTime();
      let breakfast_time = new Date();
      let lunch_time = new Date();
      let dinner_time = new Date();
      let divider_time = new Date();

      //设置早餐时间为每天8点前
      breakfast_time.setHours(8);
      breakfast_time.setMinutes(0);
      //设置午餐时间为每天10点前
      lunch_time.setHours(10);
      lunch_time.setMinutes(0);
      //设置晚餐时间为每天16点前
      dinner_time.setHours(16);
      dinner_time.setMinutes(0);
      //-------日期分隔线 --------
      divider_time.setHours(18);
      divider_time.setMinutes(0);

      // //判断各餐段是否在截止前能登记
      // //当前时间 < 16:00 登记当天的订餐记录
      // if (nowTime < dinner_time.getTime()) {
      //   this.canDine.breakfast = (nowTime >= breakfast_time.getTime()) ? false : true;
      //   this.canDine.lunch = nowTime >= lunch_time.getTime() ? false : true;
      //   this.canDine.dinner = nowTime >= dinner_time.getTime() ? false : true;

      //   // console.log('nowTime: %s , breakfast_time: %s',new Date().getHours(),breakfast_time.getHours());
      //   // console.log('breakfast:%s ,lunch:%s , dinner: %s', this.canDine.breakfast,this.canDine.lunch,this.canDine.dinner);
      // } else if (nowTime>divider_time.getTime()) {
      //   //当前时间 > 18:00 登记翌日的订餐记录(日期+1)
      //   this.dineDate.setDate(this.dineDate.getDate() + 1);
      //   //重置订餐标志
      //   this.canDine.breakfast = true;
      //   this.canDine.lunch = true;
      //   this.canDine.dinner = true;
      //   console.log("--------重置为TRUE ------");
      // }

      this.canDine.breakfast =
        nowTime >= breakfast_time.getTime() ? false : true;
      this.canDine.lunch = nowTime >= lunch_time.getTime() ? false : true;
      this.canDine.dinner = nowTime >= dinner_time.getTime() ? false : true;

      if (nowTime >= divider_time.getTime()) { //登记在第二天
        //当前时间 >= 18:00 登记翌日的订餐记录(日期 + 1)
          this.dineDate.setDate(new Date().getDate() + 1);

        // if (this.dineDate.getDate() == new Date().getDate()) {
        //   // this.dineDate.setDate(this.dineDate.getDate() + 1);
        //   //排除星期六日（星期六日不订餐）
        //   if (this.dineDate.getDay() == 5) {
        //     this.dineDate.setDate(this.dineDate.getDate() + 3);
        //   }else if (this.dineDate.getDay() == 6) {
        //     this.dineDate.setDate(this.dineDate.getDate() + 2);
        //   } else {
        //     this.dineDate.setDate(this.dineDate.getDate() + 1);
        //   }
        // }
        //重置订餐标志
        this.canDine.breakfast = true;
        this.canDine.lunch = true;
        this.canDine.dinner = true;
        // console.log("--------重置为TRUE ------");
      } 

      console.log(
        "当前日期： %s , 登记日期： %s",
        new Date().getDate(),
        this.dineDate.getDate()
      );
      // console.log('nowTime: %s , b_time: %s, l_time: %s, d_time : %s',new Date().getHours(),breakfast_time.getHours(),lunch_time.getHours(),dinner_time.getHours());
      // console.log('can.breakfast: %s ,can.lunch: %s , can.dinner: %s', this.canDine.breakfast,this.canDine.lunch,this.canDine.dinner);
    },
    //创建定时器
    currentTime() {
      setInterval(this.checkCanDine, 1000 * 60);
    },
    //点击标签
    tagOnClick() {},
    //提交
    onSubmit() {
      console.log("submitClick");
      let cancel = false;
      let order = {
        userid: Number(this.$store.state.userid),
        name: this.$store.state.user,
        // 为了确保一天只能有一条记录,userid 和 orderdate 做了 unique ,所以不能有时间,否则不能唯一
        orderdate: this.dineDate.Format("yyyy-mm-dd"),
        breakfast: Number(this.dining.breakfast),
        lunch: Number(this.dining.lunch),
        dinner: Number(this.dining.dinner)
      };
      //不是当天的订单要确认
      var msg = "";
      var o = this.dining;
      if (o.breakfast) msg = "早餐";
      if (o.lunch) msg = msg + (o.breakfast ? "、" : "") + "午餐";
      if (o.dinner) msg = msg + (o.breakfast || o.lunch ? "、" : "") + "晚餐";
      if (this.dineDate.getDate() > new Date().getDate()) {
        console.log("明天的餐");
      } else {
        console.log("今天的餐");
      }
      this.$dialog
        .confirm({
          title: "请确认订单",
          cancelButtonColor: "#e00",
          cancelButtonText: "再想想",
          message:
            "是否要订: " + this.dineDate.Format("yyyy年m月d日 D \n\n") + msg
        })
        .then(() => {
          //on confirm
          //订单入库
          this.$http
            .post("/api/user/adddine", order, {})
            .then(response => {
              console.log("订单写入成功 OK");
              this.$notify({ type: "success", message: "订餐成功!" });
            })
            .catch(err => {
              console.log("错误:", err);
              alert("错误代码: " + err.status + ", 错误信息:" + err.statusText);
            });
        })
        .catch(() => {
          // on Cancel
          console.log("Dialog Cancel :");
        });
    }
  },

  created() {
    this.checkCanDine();
    this.currentTime();
    // this.test()
  }
};
</script>

<style >
/* nav-bar 标题颜色和底色 */
/* .home-nav {
  background-color: #398dee;
}
.van-nav-bar__title {
  color: #fff;
} */
.container {
  color: grey;
}
[class$="group"] {
  background-color: #fff;
  margin: 5px 0 5px 0;
  padding: 0px 0 15px 0;
  border-bottom: 8px solid #eee;
}
.userinfo-group {
  display: flex;
  padding: 10px 0 10px 10px;
}
.userinfo-group.van-icon {
  margin: 5px 0 0 10px;
}
.userinfo-group div {
  margin-left: 5px;
  /* color: #0088dd; */
}

.order-group {
  height: 150px;
}
.order-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #eee;
}
.order-title div {
  padding: 10px 20px 10px 10px;
}

.van-tag {
  margin: 10px 0 10px 10px;
}
.notice-item {
  font-size: 13px;
  padding: 1px 0 1px 0;
  margin: 0 0 3px 30px;
  /* background-color:blue; */
}
.order-btn {
  display: flex;
  justify-content: space-around;
  width: 280px;
  margin: 10px auto 10px auto;
}
.order-show {
  display: flex;
  justify-content: flex-start;
  margin: 25px 0px 10px 40px;
  /* border-bottom: 2px solid green; */
}
.order-show-tag {
  margin: 8px 5px 15px 2px;
}
</style>