/*
 * @作者: Edwin Yeung
 * @Date: 2020-03-12 22:45:41
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-04-06 13:53:00
 * @描述: 
 */
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
    // user: window.sessionStorage.getItem('user'),
    // token: window.sessionStorage.getItem('token')
    userid: window.localStorage.getItem('userid'),
    user: window.localStorage.getItem('user'),
    role:window.localStorage.getItem('role'),
    sex:window.localStorage.getItem('sex'),
    mobile:window.localStorage.getItem('mobile'),
    token: window.localStorage.getItem('token'),
    islogin: window.localStorage.getItem('islogin'),
    isShowBar: true,
}

//将token保存到sessionStorage里，token表示登陆状态
const mutations = {
    SET_TOKEN: (state, data) => {
        state.token = data
        // window.sessionStorage.setItem('token', data)
        window.localStorage.setItem('token', data)
    },
    //获取用户名
    GET_USER: (state, data) => {
        // 把用户名存起来
        state.user = data
        // window.sessionStorage.setItem('user', data)
        window.localStorage.setItem('user', data)
    },
    //获取用户ID
    GET_USERID: (state, data) => {
        // 把用户名存起来
        state.userid=data
        window.localStorage.setItem('userid', data)
    },
    //获取角色权限
    GET_ROLE: (state, data) => {
        // 把用户名存起来
        state.role = data
        window.localStorage.setItem('role', data)
    },
    //获取用户性别
    GET_SEX: (state, data) => {
        // 把用户名存起来
        state.sex = data
        window.localStorage.setItem('sex', data)
    },
    //获取用户手机
    GET_MOBILE:(state, data) => {
        // 把用户名存起来
        state.mobile = data
        window.localStorage.setItem('mobile', data)
    },
    SET_LOGIN:(state,data)=>{
        state.islogin=data
        window.localStorage.setItem('islogin', data)
    },
    SET_ISSHOWBAR:(state,data)=>{
        state.isShowBar=data
    },
    //登出
    LOGOUT: (state) => {
        // 登出的时候要清除token
        state.token = null
        state.user = null
        state.userid= null
        state.role= null
        state.sex= null
        state.mobile= null
        state.islogin=false
        // console.log('state.islogin :', state.islogin);
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userid')
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('role')
        window.localStorage.removeItem('sex')
        window.localStorage.removeItem('mobile')
        window.localStorage.removeItem('islogin')

    }
}

const actions = {
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store