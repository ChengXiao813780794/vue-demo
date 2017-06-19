import HttpService from 'src/service/HttpService'
import ApiUrl from 'src/service/ApiUrl'
import Util from 'src/service/Util'
import { UserDataStorage } from 'src/service/Storage'

const Types = {
  GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCEED:'GET_USERINFO_SUCCEED',
  GET_PROFILE_FAILED:'GET_USERINFO_FAILED',
}

const state = {
  profile:{},
  customers: [],
  customerDetail: {},
  customersPage:{}
}

const getters = {
  profile : state => state.profile,
  customers : state => state.customers,
  customersPage : state => state.customersPage,
  customerDetail : state => state.customerDetail
}
let loading = Util.loading()
let isGetCustomer = false;
const actions = {
  /**
   * @description 获取个人信息
   * @author Flower
   */
  getProfile( {commit,state} ){
     return new Promise(function(resolve, reject){
       commit( Types.GET_PROFILE_REQUEST )
       if( Util.isEmptyObj( state.profile ) ){
          loading.start()
       }
       let opts = {
         apiObj: ApiUrl.profile,
         query:{
           entry: 'qcs'
         }
       }
       HttpService.accessAPI( opts, result =>{
          loading.close()
          commit( Types.GET_PROFILE_SUCCEED, {result} )
          resolve(result);
       }, reason => {
          loading.close()
          commit( Types.GET_PROFILE_FAILED, {reason} )
          reject(reason);
       })
     })
  },
  /**
   * @description 重新设置密码
   * @param options{ oldPwd, pwd, pwdConfirm }
   * @author Flower
   */
  resetPassword( {commit,state}, options ){
    return new Promise(function(resolve, reject){
       let opts = {
          apiObj: ApiUrl.resetPassword,
          body:{
            old_password: options.oldPwd,
            password: options.pwd,
            password_confirmation: options.pwdConfirm
          }
       }
       HttpService.accessAPI( opts, result =>{
          commit( Types.RESET_PASSWORD_SUCCEED, {result} )
          resolve()
       }, reason => {
          commit( Types.RESET_PASSWORD_FAILED, {reason} )
          reject()
       })
    })
  }
}
const mutations = {
  
  //获取个人信息（请求）
  [Types.GET_PROFILE_REQUEST] ( state ){
     if( Util.isEmptyObj( state.profile ) ){
       state.profile = UserDataStorage.get('profile') || {};
     }
  },
  //获取个人信息（成功）
  [Types.GET_PROFILE_SUCCEED] ( state, {result} ){
     state.profile = result
     UserDataStorage.set( 'profile', result );
     console.log( 'get profile success', result );
  },
  //获取个人信息（失败）
  [Types.GET_PROFILE_FAILED] ( state, {reason} ){
     console.log( 'get profile failed', reason );
  },
  //重新设置密码（成功）
  [Types.RESET_PASSWORD_SUCCEED]( state, {result}){
    console.log( 'set password success', result );
  },
  //重新设置密码（失败）
  [Types.RESET_PASSWORD_FAILED]( state, {reason}){
    console.log( 'set password failed', reason );
  },
}
export default {
  state,
  getters,
  actions,
  mutations
}
