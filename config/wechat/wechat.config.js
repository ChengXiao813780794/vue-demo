

var wechatConfig = {};

try{
    wechatConfig = require( '../../Env' );
}catch(e){
	console.log( 'error', e.message );
	wechatConfig = {};
	env = 'develop'
}
const API_HOST = wechatConfig.API_HOST || '';
const REDIRECT_URI = wechatConfig.WECHAT_REDIRECT_URI || '';//verification/callback
const APPID = wechatConfig.WECHAT_APPID || '';
const SECRET = wechatConfig.WECHAT_SECRET || '';
const MAIN_URI=REDIRECT_URI.split('/wechat/verification')[0];
const SCOPE = 'snsapi_base';
const STATE = ':STATE';

console.log( 'REDIRECT_URI', REDIRECT_URI );

var getCodeUrl = function(){
    var redirectUri = encodeURIComponent( REDIRECT_URI );
	return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+redirectUri+'&response_type=code&scope='+SCOPE+'&state='+STATE+'#wechat_redirect';
};

var getAccessTokenUrl = function( _code ){
	return 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+APPID+'&secret='+SECRET+'&code='+_code+'&grant_type=authorization_code';
};

var getCommonToken = function(){
    return 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+SECRET;
};
var getJsapiTicket = function(access_token){
	return 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token+'&type=jsapi';
};
var getUserInfo= function(access_token,openId){
	return 'https://api.weixin.qq.com/cgi-bin/user/info?access_token='+access_token+'&openid='+openId+'&lang=zh_CN';
};


module.exports = {
	getCodeUrl: getCodeUrl,
	getAccessTokenUrl: getAccessTokenUrl,
	getCommonToken:getCommonToken,
	getJsapiTicket:getJsapiTicket,
	getUserInfo:getUserInfo,
	MAIN_URI:MAIN_URI,
	APPID:APPID,
	API_HOST:API_HOST
};
