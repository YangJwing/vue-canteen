<!--
 * @作者: Edwin Yeung
 * @Date: 2020-02-14 23:16:25
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-03-20 01:26:16
 * @描述: 
 -->
<template>
  <div id="app">
    <div class="nav" v-show="islogin">
      <div class="nav-left">
        <!-- <router-link class="nav-left-item" to="/home">首页</router-link> -->
        <!-- <router-link class="nav-left-item" to="/login">登录</router-link> -->
      </div>
      <div class="nav-right">
        <span class="nav-right-item">{{getName}}</span>
        <router-link class="nav-right-item" v-show="islogin" @click.native="logout" to>登出</router-link>
      </div>
    </div>

    <!-- TabBar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">订餐</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>

    </van-tabbar>


    <router-view></router-view>
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
      console.log('getlogin() this.$store.state.islogin :', this.$store.state.islogin);
    }
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
#app {
  font-family: "微软雅黑", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* margin-top: 60px; */
}
.nav {
  display: flex;
  flex: 1;
  padding-bottom: 5px;
  border-bottom: 1px solid rgb(243, 240, 240);
  margin: 10px 0 15px 10px;
  justify-content:flex-end;
}

.nav-left {
  background-color: #eee;
}
.nav-right {
  /* background-color: #eee; */
  margin-right: 10px;
}
.nav-left-item {
  margin-right: 10px;
}
span.nav-right-item{
  color:steelblue;
}
</style>
