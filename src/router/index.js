/*
 * @作者: Edwin Yeung
 * @Date: 2020-03-12 00:27:32
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-04-05 22:33:53
 * @描述: 
 */

 import Vue from "vue";
 import VueRouter from "vue-router"
 import store from "@/store/index.js"

 Vue.use(VueRouter)

 //懒加载
const Home = () => import('views/Home')
const Register = () => import('views/Register')
const Login = () => import('views/Login')
const TestMint = () => import('views/TestMint')
const About = () => import('views/about/About')
const MyOrders = () => import('views/about/MyOrders')
const OrderCount = () => import('views/about/OrderCount')
const Suggest = () => import('views/about/Suggest')
const Setup = () => import('views/about/Setup')
const Help = () => import('views/about/help')
const AboutMe = () => import('views/about/aboutme')

const routes=[
     {
        path:'',
        redirect:"/home"
    },
    {
        path:'/home',
        component:Home,
        meta:{
            requireAuth:true     // 添加该字段，表示进入这个路由是需要登录的
        }
    },
    {
        path:"/about",
        component:About,
        meta:{
            requireAuth:true     // 添加该字段，表示进入这个路由是需要登录的
        }
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:"/myorders",
        component:MyOrders
    },
    {
        path:"/ordercount",
        component:OrderCount
    },
    {
        path:"/suggest",
        component:Suggest
    },
    {
        path:"/help",
        component:Help
    },
    {
        path:"/setup",
        component:Setup
    },
    {
        path:"/aboutme",
        component:AboutMe
    },
]

const router=new VueRouter({
    routes,
    // mode:"history",
    base:"/canteen"  //为何加这句，参看：https://blog.csdn.net/lmy0111ly/article/details/83055627
})

//注册全局钩子用来拦截导航
router.beforeEach((to,from,next)=>{
    const token=store.state.token
    const user=store.state.user
    if (to.meta.requireAuth){  // 判断该路由是否需要登录权限
        // if (token) {           // 通过vuex state获取当前的token是否存在
        if (user) {           // 通过vuex state获取当前的user是否存在
            next()
        } else {
            console.log('该页面需要登录!');
            // alert('该页面需要登录后才能使用!');
            next({
                path:'/login'
                // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {    //不用登录权限的页面直接显示
        next()
    }
})

export default router