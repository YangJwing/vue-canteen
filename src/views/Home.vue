<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-15 13:59:31
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-23 00:06:29
 * @描述: 
 -->
<template>
  <div class="home">
    <!-- <h3>这是首页</h3> -->
    <van-nav-bar class="home-nav" title="企石电信食堂报餐系统" fixed :right-text="this.$store.state.user1" />
    <div class="container">
      <!-- 人员信息 -->
      <div class="userinfo-group">
        <van-icon name="user-o" size="20px" />
        <div>{{getName}}</div>
      </div>

      <!-- 订餐登记 -->
      <div class="order-group">
        <div class="order-title">
          <van-tag class="tag-order" color="#f2826a" text-color="#fff" size="large">就餐登记</van-tag>
          <div>{{dineDateFormat}}</div>
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
          <!-- <div v-show="dining.breakfast||dining.lunch||dining.dinner">你订了:</div> -->
          <!-- <van-icon :dot="dining.breakfast||dining.lunch||dining.dinner" name="cart-o" size="35px" color="red" /> -->
          <van-icon name="cart-o" size="35px" color="#666" :badge="count" />
          <van-tag class="order-show-tag" type="success" v-show="dining.breakfast">早餐</van-tag>
          <van-tag class="order-show-tag" type="success" v-show="dining.lunch">午餐</van-tag>
          <van-tag class="order-show-tag" type="success" v-show="dining.dinner">晚餐</van-tag>
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

      <!-- 报餐日期 -->
      <div class="dine-date">{{dineDate}}</div>
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
      count: "",
      //用户信息
      user: {
        name: "",
        sex: ""
      },
      //就餐日期(格式显示)
      dineDateFormat: new Date(),
      dineDate: new Date()
    };
  },
  methods: {
    //提交
    onSubmit() {
      console.log("submitClick");
      let order = {
        userid: Number(this.$store.state.userid),
        name: this.$store.state.user,
        orderdate: this.dineDate.toLocaleDateString() ,
        breakfast: Number(this.dining.breakfast),
        lunch: Number(this.dining.lunch),
        dinner: Number(this.dining.dinner)
      };
      //入库
      this.$http
        .post("/api/user/adddine", order, {})
        .then(response => {
          console.log("order OK");
        })
        .catch(err => {
          console.log("错误:", err);
          alert("错误代码: " + err.status + ", 错误信息:" + err.statusText);
        });
    },
    //登记就餐
    dine(index) {
      switch (index) {
        case 0:
          this.dining.breakfast = !this.dining.breakfast;
          this.dining.breakfast ? this.count++ : this.count--;
          break;
        case 1:
          this.dining.lunch = !this.dining.lunch;
          this.dining.lunch ? this.count++ : this.count--;
          break;
        case 2:
          this.dining.dinner = !this.dining.dinner;
          this.dining.dinner ? this.count++ : this.count--;
          break;
      }
      if (this.count == 0) this.count = "";
    },

    //判断能否登记订餐
    checkCanDine() {
      /* 判断：当前时间 > 18:00 登记日期=当前日期 + 1 = 明天
       * 　　　当前时间 < 16:00 登记日期=当前日期
       *
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

      //判断各餐段是否在截止前能登记
      //判断当天
      if (nowTime && nowTime < dinner_time.getTime()) {
        this.canDine.breakfast =
          nowTime >= breakfast_time.getTime() ? false : true;
        this.canDine.lunch = nowTime >= lunch_time.getTime() ? false : true;
        this.canDine.dinner = nowTime >= dinner_time.getTime() ? false : true;
      } else if (nowTime > divider_time.getTime()) {
        //日期+1
        this.dineDate.setDate(this.dineDate.getDate() + 1);

        //重置标志
        this.canDine.breakfast = true;
        this.canDine.lunch = true;
        this.canDine.dinner = true;
        console.log("--------重置为TRUE ------");
      }
    },

    //取得当前日期时间
    showTime() {
      var _this = this;
      // let now=new Date()
      let now = this.dineDate;
      let yy = now.getFullYear();
      let mm = now.getMonth() + 1;
      let dd = now.getDate();
      let hh = now.getHours();
      let mf =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
      let ss =
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
      let day = now.getDay();
      let format = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      day = format[day];

      _this.dineDateFormat =
        "就餐日期: " + /*yy + "年" +*/ mm + "月" + dd + "日  " + day; // + hh + ":" + mf + ":" + ss;
    },
    //创建定时器
    currentTime() {
      setInterval(this.showTime, 500);
    }
  },
  created() {
    this.currentTime();
    this.checkCanDine();
  },
  computed: {
    getName() {
      return (this.user.name = this.$store.state.user);
    }
  }
};
</script>

<style >
.home-nav {
  background-color: rgb(247, 247, 247);
}
/* nav-bar 标题颜色 */
.van-nav-bar__title {
  color: #0088ff;
}
.container {
  color: grey;
}
[class$="group"] {
  background-color: #fff;
  margin: 5px 0 5px 0;
  padding: 0px 0 15px 0;
  border-bottom: 6px solid #eee;
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