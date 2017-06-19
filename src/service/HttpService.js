/**
 * @author Flower
 * @description Http Service
 */
import Util from './Util'
import Auth from './UserAuth'
import Vue from 'vue'
import ApiUrl from './ApiUrl'
import Router from '../router'

function login( openId, successCallback, failedCallback ){
    if( !Util.isWeiXin() ) return;
    let _body = {
        wechat_id: openId
    };
    let apiObj=ApiUrl.wechatLogin;
    let options = {
        url: apiObj.url,
        method: apiObj.method,
        timemout: '5000',
        body: _body
    };
    Vue.http( options ).then( response =>{
        console.log( 'wechat login login success', response.body );
        if( response.body.token ){
            Auth.setUserAuth({
                token: response.body.token
            });
            successCallback.call(this, response.body);
        };
    }, response => {
        console.log( 'login failed', response.body );
        failedCallback.call(this, response.body);
    } )
}

export default {
    accessAPI: ( opts, cb, errorCb ) => {
        let self = this;
        let apiObj = opts.apiObj || {},
        apiUrl = apiObj.url,
        _method = apiObj.method,
        _noAuth = apiObj.noAuth || '',
        _body = opts.body || {},
        _path = opts.path,
        _query = opts.query || {};
        if( Util.isObject(_path) ){
            Object.keys(_path).forEach(key => {
                apiUrl = apiUrl.replace( ':'+key, _path[key] );
            })
        }

        // add query params
        if( _query && !Util.isEmptyObj(_query) ){
            if( apiUrl.indexOf('?')<0 ){
                apiUrl += '?'
            }else{
                let urlQuery = apiUrl.split('?')[1];
                if( urlQuery ){
                    let queryArr = urlQuery.split('&');
                    queryArr.map( value => {
                        if( value.indexOf('=')>=0 ){
                            let tempArr = value.split('=');
                            if( tempArr[0] && tempArr[1] ){
                                _query[tempArr[0]] = tempArr[1];
                            }
                        }
                    })
                }
                apiUrl = apiUrl.split('?')[0] + '?';
            }
            let queryCount = 0;
            Object.keys(_query).forEach(key => {
                let value = _query[key];
                if( queryCount>0 ){
                    apiUrl += '&';
                }
                apiUrl += (key+'='+value);
                queryCount ++;
            })
        }

        let ajaxFun = (config={})=>{
            console.log( 'Router', Router.currentRoute );
            let userAuth = Auth.getUserAuth();//获取当前的userAuth信息
            console.log( 'userAuth', userAuth.token );
            let options = {
                url: apiUrl,
                method: _method,
                timemout: '5000',
                headers:{},
                body: _body
            };

            !_noAuth? options.headers.Authorization = 'Bearer ' + (config.token || userAuth.token) : '';
            Vue.http( options ).then( response => cb(response.body.meta ? response.body : response.body.data), response =>{
                if( response.body == null ){
                    if( !config.count ){
                        config.count = 1;
                    }else{
                        config.count += 1;
                    }
                    if( config.count <= 3 ){
                        setTimeout(function(){
                            ajaxFun({count:config.count});
                        },1000)
                    }else{
                        Util.popup({content: '系统出现错误，请稍后再试'});
                        errorCb(response.body)
                    }
                    return;
                }
                console.log( 'ajaxFun failed', response.body );
                let data = response.body;
                if(data.status_code=='422'){
                    for (var key in data.errors) {
                        Util.popup({content: data.errors[key][0]});
                    }
                    errorCb(response.body)
                }else if(data.status_code=='400'){
                    if(data.message){
                        Util.popup({content: data.message});
                    }
                    errorCb(response.body)
                }else if(data.status_code=='500'){
                    Util.popup({content: "服务器出错，请您退出后重新再试！"});
                    errorCb(response.body)
                }else if(data.status_code=='401'){
                    console.log( '401 error');
                    if( _noAuth ){
                        errorCb(response.body)
                    }else{
                        login( Auth.getOpenId(), function(response){
                            console.log( 'api 401 and login success', response );
                            ajaxFun(response.token);
                        }, function(response){
                            console.log( 'api 401 and login failed', response );
                            let queryObj = {};
                            if( Router.currentRoute.name ){
                                queryObj.back_url = Router.currentRoute.name;
                            }
                            if( !Util.isEmptyObj( Router.currentRoute.query ) ){
                                queryObj.query = JSON.stringify(Router.currentRoute.query);
                            }
                            if( !Util.isEmptyObj( Router.currentRoute.params ) ){
                                queryObj.params = JSON.stringify(Router.currentRoute.params);
                            }
                            Router.push({name:'login', query:queryObj});
                            // Util.popup( {content:'系统出现错误，请退出后重新登录'} );
                            errorCb(response)
                        } )
                    }
                }else{
                    errorCb(response.body)
                }
            })
        };
        ajaxFun();
    },
    login: login
}


