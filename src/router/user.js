import VueRouter from 'vue-router'

const UserView = { template: `<div>
                              <router-view class=""></router-view>
                              </div>` }
const Profile = resolve => require(['src/pages/user/profile/Profile.vue'], resolve);

export default{
  path: '/user',
  component: UserView,
  meta: { requiresAuth: true },
  children: [{
      path:'profile',
      name:'profile',
      components:{
        default:Profile,
        //nav:Nav
      },
      meta: { title: '个人中心' }
    }
  ]
}
