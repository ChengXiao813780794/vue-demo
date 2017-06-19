import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './home' //首页项目
import user from './user' //
import HttpService from '../service/HttpService'
import { SessionStorage } from '../service/Storage'
import Auth from '../service/UserAuth'
import AuthPage from './auth' //登陆注册页面
import Util from '../service/Util'

Vue.use(VueRouter)


//Create the router
const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    // to 和 from 都是 路由信息对象
  },
  mode: 'history',
  base: __dirname,
  routes: [
    Home,
    user,
    AuthPage
  ]
})

router.beforeEach((to, from, next) => {
  //刷新路由title
  document.title = to.meta.title;

  //当路径为空是，跳转到profile页面上
  if( to.path == '/' ){
    router.replace({name:'profile'});
    return;
  }

  //当前页面需要userAuth校验
  if (to.matched.some(record => record.meta.requiresAuth)) {
  }
  next()
})


export default router
