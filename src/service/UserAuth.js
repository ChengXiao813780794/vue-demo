/**
 * @author Flower
 * @description this is an Auth tool
 */

function getUserAuth(){
	let userAuth = localStorage.getItem( 'userAuth' ) || JSON.stringify( { userName: '', userId: '', token: '',mobile:'',terminal:''} );
        userAuth = JSON.parse(userAuth);
	return userAuth;
}

export default {
	getUserAuth: getUserAuth,
	setUserAuth: ( userObj ) => {
	    if( typeof userObj !== 'object' || userObj instanceof Array )
	    	return console.error( 'the user auth must be an object' );
	    let _userAuth = getUserAuth();
	    for(let pro in userObj){
	    	_userAuth[pro] = userObj[pro];
	    }
	    localStorage.setItem( 'userAuth', JSON.stringify( _userAuth ) ) ;
	    return _userAuth;
	},
	getOpenId: ()=> sessionStorage.getItem('openId'),
	setOpenId: (openId)=> sessionStorage.setItem( 'openId', openId ),
	hasOpenId: ()=> !!sessionStorage.getItem( 'openId' ),
	isLogin: ()=>{
		let userAuth = getUserAuth();
        return !!userAuth.token
	},
	clear: ()=>{
		sessionStorage.clear();
		localStorage.clear();
	}
}
