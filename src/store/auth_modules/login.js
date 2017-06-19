/**
 * @author Flower
 * @description 用户注册模块
 */
import HttpService from '../../service/HttpService'
import ApiUrl from '../../service/ApiUrl'
import Auth from '../../service/UserAuth'
import Util from '../../service/Util'
import Router from '../../router'

// mutations-type config
const Types = {
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_FAILED: 'LOGIN_FAILED'
}

// init state
const state = {

}

// get filter data from state
const getters = {

}

// init actions 
const actions = {
	/**
	 * @description 用户手机号和密码登录
	 * @param options:{ phone, password }
	 */
    userLogin: function({ commit, state }, options){
		return new Promise(function(resolve, reject){
			let opts = {
				apiObj: ApiUrl.login,
				body:{
					username: options.phone,
					password: options.password
				}
			}
			if( Util.isWeiXin() ){
				if( Auth.hasOpenId() ){
					opts.body.wechat_id = Auth.getOpenId()
				}
			}
			HttpService.accessAPI( opts, result =>{
				commit( Types.LOGIN_SUCCESS, {result} )
				resolve()
			}, reason => {
				commit( Types.LOGIN_FAILED, {reason} )
				reject()
			})
		})
	},
	logOut:function({commit,state}){
		return new Promise((resolve,reject) => {
			let opts = {
				apiObj:ApiUrl.unbind,
				query:{
					entry:'wechat'
				}
			};
			HttpService.accessAPI(opts,() => {
				resolve();
			},() => {
				reject();
			})
		})
	}
}

// init mutations 
const mutations = {
	//用户登录（成功）
	[Types.LOGIN_SUCCESS] ( state, { result } ){
		Auth.setUserAuth({
			token: result
		});
	   console.log( 'user login success', result );
	},
	//用户登录（失败）
	[Types.LOGIN_FAILED] ( state, { reason } ){
		Util.popup({content:'用户名或密码错误'})
	    console.log( 'user login LOGIN_FAILED', reason );
	},
}

export default {
  state,
  getters,
  actions,
  mutations
}
