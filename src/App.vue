<!--
 * @作者: Edwin Yeung
 * @Date: 2020-02-14 23:16:25
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-25 01:15:50
 * @描述: 
 -->
<template>
  <div id="app">
    <!-- <div class="nav" v-show="islogin">
      <div class="nav-left">
        <router-link class="nav-left-item" to="/home">首页</router-link>
        <router-link class="nav-left-item" to="/login">登录</router-link>
      </div>
      <div class="nav-right">
        <span class="nav-right-item">{{getName}}</span>
        <router-link class="nav-right-item" v-show="islogin" @click.native="logout" to>登出</router-link>
      </div>
    </div> -->

    <!-- NavBar -->
    <van-nav-bar class="home-nav" :title="nav_title" fixed :right-text="this.$store.state.user1" />
    <!-- TabBar -->
    <van-tabbar v-model="active" fiexed safe-area-inset-bottom @change="onChange">
      <!-- <van-tabbar-item to="/home" info="3" icon="home-o">主页</van-tabbar-item> -->
      <van-tabbar-item to="/home" dot icon="shopping-cart-o">订餐</van-tabbar-item>
      <van-tabbar-item to="/About" icon="user-o" >我的</van-tabbar-item>
    </van-tabbar>


    <div style="height:44px;"></div>
    <router-view></router-view>
    <div style="height:49px;"></div>

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: "",
      islogin:false,
      active:0,
      nav_title:"企石电信食堂订餐小程序",
    };
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/login")
      this.isLogin=false
      console.log("logout click");
      console.log('logout() this.$store.islogin :', this.$store.islogin);
    },
    getlogin(){
      this.islogin=this.$store.state.islogin
      // console.log('getlogin() this.$store.state.islogin :', this.$store.state.islogin);
    },
    onChange(index){
      if(index==1) this.nav_title="个人中心"
    },
  },
  computed: {
    getName() {
      console.log('name :',this.$store.state.user);
      return this.name=this.$store.state.user?"【" + this.$store.state.user +"】"+this.$store.state.userid:''
    },
    
  },
  updated(){
    this.getlogin()
  }
};
</script>

<style>
/* navbar 的颜色和底色 */
  .home-nav{
    background-color: #398dee;
  }
  .van-nav-bar__title {
  color: #fff;
}
  .van-tabbar{
    background-color:rgb(247,247,247);
  }
</style>
