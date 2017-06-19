import Vue from 'vue'
import router from 'src/router/'
import VueRouter from 'vue-router'
import filters from 'src/service/Filters'
import components from 'src/service/Components'
import HttpService from 'src/service/HttpService'
import Util from 'src/service/Util'
import VueResource from 'vue-resource'
import store from 'src/store'
import { sync } from 'vuex-router-sync'
import { SessionStorage } from 'src/service/Storage'

sync(store, router) // done.

Vue.use(VueResource);
//test
//If your web server can't handle requests encoded as application/json, you can enable the emulateJSON option. This will send the request as application/x-www-form-urlencoded MIME type, as if from an normal HTML form.
// Vue.http.options.emulateJSON = true;
//If your web server can't handle REST/HTTP requests like PUT, PATCH and DELETE, you can enable the emulateHTTP option. This will set the X-HTTP-Method-Override header with the actual HTTP method and use a normal POST request.
Vue.http.options.emulateHTTP = true;

new Vue({
    router,
    store,
    el: '#app',
    template: `<router-view class="view"></router-view>`,
})

var attachFastClick = require('fastclick');
attachFastClick.attach(document.body);


