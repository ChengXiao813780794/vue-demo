import VueRouter from 'vue-router'

const App = resolve => require(['src/pages/home/App.vue'], resolve)
const AppView = { template: `<div>
                                <router-view class=""></router-view>
                                </div>` }


export default {
  path: '/',
  component: App,
  meta: {},
  // children:[{
  //   path: 'summary',
  //   name: 'summary',
  //   component:Summary,
  //   meta: { title: '量康C端简介' }
  // }]
}