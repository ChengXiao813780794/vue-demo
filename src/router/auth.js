import VueRouter from 'vue-router'

const AuthView = { template: '<router-view class="view"></router-view>' }
//const Login = resolve => require(['src/pages/auth/login/Login.vue'], resolve)
export default{
  path: '/auth',
  component: AuthView,
  children: [
    // {
    // 	path: 'login',
    //   name: 'login',
    // 	component: Login,
    // 	meta: { title: '登录',requiresOpenId: true }
    // }
  ]
}
