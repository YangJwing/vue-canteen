/*
 * @作者: Edwin Yeung
 * @Date: 2020-02-14 23:16:25
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-10-08 21:44:06
 * @描述: 
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//引入路由和Vuex
import router from './router/index.js'   
import store from './store/index.js'
import VueResource from 'vue-resource'

// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
// // import './assets/css/my-mint.scss'   //全局修改mint-UI样式

//引入vant
import Vant, { Col } from 'vant'
import 'vant/lib/index.css'

//引入日期时间格式化组件
import '@/utils/dateFormat.js'

Vue.use(VueResource)
// Vue.use(Mint)
Vue.use(Vant)

Vue.config.productionTip = false

Vue.http.headers.common['token'] = store.state.token
console.log('main 里面的 store.state.token :>> ', store.state.token);

new Vue({
  el:'#app',
  components:{App},
  // template:'<App/>',
  render:h=>h(App),
  store,
  router,
})

