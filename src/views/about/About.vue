<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-15 12:01:36
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-04-06 15:40:27
 * @描述: 
 -->
<template>
  <div id="about">
        <!-- 占位符 44px -->
     <div style="height:44px;"></div> 
    <!-- <van-notice-bar mode="closeable">中国电信东莞企石分公司食堂订餐小程序 Beta 1.0 开放测试，使用过程中欢迎提出宝贵建议，请到“意见反馈里”提交 ，谢谢！</van-notice-bar> -->
    <van-notice-bar mode="closeable" scrollable left-icon="volume-o" speed=30 >{{notice}}</van-notice-bar>
    <!-- <van-card :thumb="require('@/assets/img/avatar.jpg')" :title="getName" /> -->

    <!-- 头像 -->
    <div class="avatar">
      <van-image
        class="avatar-item"
        v-show="sex"
        round
        cover
        width="4.5rem"
        height="4.5rem"
        :src="require('@/assets/img/nanzhi.svg')"
      />
      <van-image
        class="avatar-item"
        v-show="!sex"
        round
        cover
        width="4.5rem"
        height="4.5rem"
        :src="require('@/assets/img/nvzhi.svg')"
      />
      <!-- 用户信息 -->
      <div class="avatar-item">
        <div class="avatar-item userinfo user">
          {{name}}
          <span v-show="role" style="font-size:12px;color:#666">（管理员)</span>
        </div>
        <div class="avatar-item userinfo mobile">
          <van-icon name="phone-o" />
          {{mobile}}
        </div>
      </div>
    </div>
    <!-- 积分和等级 -->
    <div class="level">
      <div class="level-item" @click="onClick(1)">
        <div>18</div>
        <div>积分</div>
      </div>
      <div class="level-item" @click="onClick(2)">
        <div>0</div>
        <div>等级</div>
      </div>
    </div>

    <!-- 关于... -->
    <van-cell-group>
      <van-cell v-if="role" title="订餐情况统计表" icon="cart-o" value="管理员可进入" is-link to="/orderCount" />
      <van-cell title="订餐记录" icon="todo-list-o" is-link to="/myorders" />
      <van-cell title="设置" icon="setting-o" is-link to="/setup" />
      <van-cell title="帮助" icon="question-o" is-link to="/help" />
      <van-cell title="问题与建议" icon="records" is-link to="/suggest" />
      <van-cell title="关于" icon="info-o" is-link to="/aboutme" />
      <van-cell title="注销我的登录" icon="close" is-link @click.native="logout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      role:null, 
      sex:'',
      mobile:'',
      notice:'中国电信东莞企石分公司食堂订餐小程序 Beta 1.0 正式开放测试，欢迎使用！使用过程如有问题或有宝贵建议，请到“问题与建议”里提交 ，谢谢！',
    };
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: "你确定要注销吗",
          cancelButtonColor: "#e00",
          cancelButtonText: "不要",
          message: "注销我的登录，下次必须登录才能使用订餐程序！"
        })
        .then(() => {
          //on confirm
          //订单入库
          this.$store.commit("LOGOUT");
          this.$router.push("/login");
          this.isLogin = false;
          console.log("logout click");
          console.log("logout() this.$store.islogin :", this.$store.islogin);
        })
        .catch(() => {
          // on Cancel
        });
    },
    getName() {
      this.name = this.$store.state.user ? this.$store.state.user : "";
      this.role = this.$store.state.role==1?true:false;
      this.sex = this.$store.state.sex=='男' ? 1:0;
      this.mobile = this.$store.state.mobile //? this.$store.state.mobile : "";
    },
    showNotice(){
      this.$http
        .get("/api/user/shownotice", { params: {}})
        .then(response => {
          this.notice = response.body[0].content || '中国电信东莞企石分公司食堂订餐小程序 Beta 1.0 正式开放测试，欢迎使用！使用过程如有问题或有宝贵建议，请到“问题与建议”里提交 ，谢谢！'
          console.log('response.body :', response.body[0].content);
        });
    },
    onClick(index){
      if (index==1){
        this.$toast('积分功能暂未开放，敬请期待')
      } else {
        this.$toast('等级功能暂未开放，敬请期待')
      }
    }
  },
  created() {
    this.getName();
    this.showNotice()
    console.log('this.role :', this.role);
    console.log('typeof(role) :', typeof(this.role));
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
.van-image__img{
  background-color: rgb(220, 244, 247);
  border-color: red;
}
.user {
  font-size: 20px;
}
.mobile {
  background-color: rgba(142, 194, 224, 0.418);
  padding: 2px 8px 2px 8px;
  font-size: 12px;
  border-radius: 5px;
}
.level {
  display: flex;
  justify-content: space-around;
  border-bottom: 8px solid #eee;
}
.level-item {
  /* background-color: #666; */
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}
.level-item > div:last-child {
  color: #999;
  font-size: 13px;
}
</style>