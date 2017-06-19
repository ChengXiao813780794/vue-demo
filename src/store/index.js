import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from '../../plugins/logger'

/**logistic module **/
import  * as user from './user_modules'
import  * as auth from './auth_modules'

// import  * as lottory from './lottory_modules'
class Modules {
    constructor() { //构造函数
      this.modules = {};
    }
    addModules(obj){
      let self = this;
      Object.keys(obj).forEach(key => {
        self.modules[key] = obj[key];
      })
    }
    getModules(){
      return this.modules
    }
}

let modules = new Modules();
modules.addModules(user);
modules.addModules(auth);

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


console.log( 'modules', modules.getModules() );
export default new Vuex.Store({
  actions,
  getters,
  modules: modules.getModules(),
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
