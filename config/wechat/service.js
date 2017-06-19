var wechatConfig = require( './wechat.config' );
var fetch = require('node-fetch');

var httpService = {
	getAccessToken: function( code ){
		var url = wechatConfig.getAccessTokenUrl(code);
		var pGet = fetch( url );
		return pGet;
	},
	getRequestParams: function( urlPath ){
		var MG={"RF":"NULL"};
		var options = {
			url: urlPath,
			method: "GET",
			json:true,
			headers: {
				'Content-Type': 'application/json',
				"MG-REFERER": JSON.stringify(MG)
			}
		};
		//console.log( 'getRequestParams', urlPath);
		return options;
   }
};

module.exports = httpService;

