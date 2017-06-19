/**
 * @author Flower
 * @description Common Util
 */
import { SessionStorage } from './Storage' 
import HttpService from './HttpService' 
  let loadingModal = undefined;
  let modal = document.createElement("div");
  let initLoadingModal = function(){
    loadingModal = document.createElement("div");
    loadingModal.setAttribute( 'id', 'loadingModal' );
    loadingModal.setAttribute( 'class', 'weui_loading_toast' );
    loadingModal.innerHTML = `<div class="weui_mask_transparent"></div>
      <div class="weui_toast">
         <!--<img src="/static/loading_blue.gif" />-->
      </div>`;
  };

export default {
    isObject: input => (typeof input === 'object') && !(input instanceof Array),
    /**
     * @param  input
     * @return true: input is not empty; false: input is empty
     * @description input != ('' || undefined || null)
     */
    notEmpty: function(input){
       return !!input;
    },
    /**
     * @param  input
     * @return input is an Array
     */
    isArray: function( input){
      return typeof input === 'object' && (input instanceof Array);
    },
    isEmptyObj:  input => {
        let isEmpty = true;
        Object.keys( input ).forEach( key =>{
          isEmpty = false;
        })
        return isEmpty;
    },
    encodeHtml : function(str){
      if(!str) return '';
      let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,(all,t)=>arrEntities[t]);
    },
    /**
     * transfer '\n' to <br/>
     */
    toHtml : function(str){
      if(!str) return [];
      if ( !this.isArray(str) ) {
        var strArr = str.split('\n');
        return strArr;
      }else{
        return str;
      }
    },
    loading: function(){
      if( !loadingModal ){
        initLoadingModal();
      };
      var closeLoading = function(){
        var model = document.getElementById('loadingModal');
        if( model ){
          document.body.removeChild(loadingModal);
        }
      };
      var startLoading = function(){
        var model = document.getElementById('loadingModal');
        if( !model ){
          document.body.appendChild(loadingModal);
        }
      };
      var isLoading = function(){
        return !!document.getElementById('loadingModal');
      }
      return{
        start: startLoading,
        close: closeLoading,
        isLoading: isLoading
      }
    },
    popup: function( opts ){
      if( !this.isObject(opts) ) opts = {};
      var dispearTime = opts.time || 1000,
      //default
      content = opts.content || '已完成',
      //default icon for toast
      icon = opts.icon || '';
      // var defer = $.Deferred();
      modal.setAttribute( 'id', 'loadingToast' );
      modal.setAttribute( 'class', 'weui_loading_toast' );
      modal.innerHTML = `<div id="toast" >
          <div class="weui_mask_transparent2"></div>
          <div class="weui_toast weui_toast2 error_message">
              <p class="weui_toast_content" id="toastContent"></p>
          </div>
      </div>`;
      document.body.appendChild(modal);
      $( '#toastContent' ).html(content);
      $( '#toastIcon' ).addClass(icon);
        setTimeout(function(){
          document.body.removeChild(modal);
        },dispearTime)
    },
    /**
     * @description Timer count
     * @usage  new Util.timer( id );
     *
     */
    timer: function( id ){
      var defaultCount = 60;
      var count = defaultCount;
      var timeout = 0;
      var timeInterval = 1000;
      var _text = $('#'+id ).html();
      var timeCount;

      function cancel( callback ){
        clearInterval( timeCount );
        count = defaultCount;
        $('#'+id ).html( _text );
        if( typeof callback === 'function' ){
          callback.call(this);
        }
      }
      this.cancel = cancel;
      this.start = function( callback, cancelCallback ){
        $('#'+id ).html(count);
        timeCount = setInterval( function(){

          if( count <= timeout ){
            cancel( cancelCallback );
          }else{
            count = count - 1;
            $('#'+id ).html(count)
          }
        }, timeInterval );
        callback.call(this);
      }
    },
    dialogSubmit : function(opts, callback){
      if( !this.isObject(opts) ) opts = {};
      let title = opts.title,
          content = opts.content;
      // $.get( 'tpl/dialogSubmit.html', function( data ){
        modal.innerHTML = `<div class="weui_dialog_alert" id="dialog2">
            <div class="weui_mask"></div>
            <div class="weui_dialog">
                <div class="weui_dialog_hd"><strong class="weui_dialog_title" id="dialogSubmit_title"></strong></div>
                <div class="weui_dialog_bd" id="dialogSubmit_content" style="color: #333333;font-size: .32rem;"></div>
                <div class="weui_dialog_ft">
                    <a href="javascript:;" class="weui_btn_dialog primary" id="dialogSubmit" style="color: #34BE40;font-size: .28rem;">知道了</a>
                </div>
            </div>
        </div>`;
        document.body.appendChild(modal);
        $('#dialogSubmit_title').text(title);
        $('#dialogSubmit_content').html(content);
        $('#dialogSubmit').on('click',function(){
          document.body.removeChild(modal);
          if( callback ){
            callback.call(this);
          }
        });
      // });
    },
    //判断是否微信浏览器
    isWeiXin: function(){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
      }else{
        return false;
      }
    },
    //判断是否支付宝浏览器
    isAlipay:function(){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.indexOf('aliapp')>-1){
        return true;
      }else{
        return false;
      }
    },
    /**
     * @description 获取当前的平台参数
     * @author Flower
     */
     dateToUnix:function(dateStr){
          var dateFullArr = dateStr.split( ' ',2 ),
              dateArr = ( dateFullArr[0] ? dateFullArr[0] : '' ).split( '-',3 ),
              timeArr = ( dateFullArr[1] ? dateFullArr[1] : '' ).split( ':',3 );
          var date= new Date(
              parseInt(dateArr[0], 10) || null,
              ( parseInt(dateArr[1], 10) || 1 ) - 1,
              parseInt(dateArr[2], 10) || null,
              parseInt(timeArr[0], 10) || null,
              parseInt(timeArr[1], 10) || null,
              parseInt(timeArr[2], 10) || null
            );
          //处理精确到日的夏令时问题
          var str=date.toUTCString();  
          if(str.endsWith('15:00:00 GMT')&&!timeArr[0]){
            return date.getTime()/1000 + 60*60;
          }else{
            return date.getTime()/1000;
          }
      },
    dialog : function(opts,callback1,callback2){
      if( !this.isObject(opts) ) opts = {};
      var title = opts.title,
        content = opts.content,
        confirm = opts.confirmTexting || '确定',
        cancel = opts.cancelTexting || '取消';
      
      modal.innerHTML=`<div class="weui_dialog_confirm">
                          <div class="weui_mask"></div>
                          <div class="weui_dialog" style="width: 5rem;">
                              <div class="weui_dialog_hd"><strong class="weui_dialog_title" id="dialog_title"></strong></div>
                              <div class="weui_dialog_bd" id="dialog_content" style="color: #333333;font-size: .32rem;"></div>
                              <div class="weui_dialog_ft" >
                                  <a class="weui_btn_dialog default" id="cancel_dialog" style="color: #2EDAB8;font-size: .28rem;">`+cancel+`</a>
                                  <a class="weui_btn_dialog primary" id="submit_dialog" style="color: #34BE40;font-size: .28rem;">`+confirm+`</a>
                              </div>
                          </div>
                      </div>`;
      document.body.appendChild(modal);
      $('#dialog_title').html(title);
      $('#dialog_content').html(content);
      $('#submit_dialog').on('click',function(){
        console.log('0-0--099000-0')
        document.body.removeChild(modal);
        callback1.call(this);
      });
      $('#cancel_dialog').on('click',function(){
        document.body.removeChild(modal);
        if( callback2 && (typeof a == 'function')){
          callback2.call(this);
        }
      });
    },
    getBackUrlObj: function(){
      let backUrl = this.getWindowsParams('back_url') || '';
      let returnObj = {};
      if( backUrl ){
        returnObj.name = backUrl;
        let query = this.getWindowsParams( 'query' ) || '';
        if( query ){
          returnObj.query = {};
          query = decodeURIComponent(query);
          returnObj.query = JSON.parse(query);
        }
        let params =  this.getWindowsParams( 'params' ) || '';
        if( params ){
          returnObj.params = {};
          params = decodeURIComponent(params);
          returnObj.params = JSON.parse(params);
        }
      }
      return returnObj;
    },
    deepCopy:function(obj, cache = []){
        // just return if obj is immutable value
        if (obj === null || typeof obj !== 'object') {
          return obj
        }

        // if obj is hit, it is in circular structure
        const hit = find(cache, c => c.original === obj)
        if (hit) {
          return hit.copy
        }

        const copy = Array.isArray(obj) ? [] : {}
        // put the copy into cache at first
        // because we want to refer it in recursive deepCopy
        cache.push({
          original: obj,
          copy
        })

        Object.keys(obj).forEach(key => {
          copy[key] = this.deepCopy(obj[key], cache)
        })

        return copy
      },
    setBackUrlObj: function(obj){

    },

    modalShare:function(callback){
        this.hideModal();
        this.blur();
        var modal = document.createElement("div"),
            modalPage = document.createElement("div");
        modal.setAttribute('class','user_modal');
        modalPage.setAttribute('class','modal_page');

        document.body.appendChild(modal);
        document.body.appendChild(modalPage);
        modalPage.innerHTML = `<div class="share_page">
                <img src="/static/share.png" alt="">
              </div>`;
        callback.call(this);      
     },

      /**
       * hide modal
       */
    hideModal:function(){
        $('.user_modal').remove();
        $('.modal_page').remove();
        $('#app').removeClass('user_blur');
      },
    blur:function(){
        $('#app').addClass('user_blur');
      },
    /**
     * @usage
     * transfer unix to date format
     */
    unixToDate:function(timestamp,isTime){
      var time = new Date( timestamp * 1000),
          date = '',
          month = time.getMonth() + 1,
          day = time.getDate();
      if( time == 'Invalid Date') return timestamp;

      date += time.getFullYear() + "-";
      date += (month < 10 ?'0' + month : month) + "-";
      date += (day < 10 ?'0' + day : day) ;
      if(isTime){
        date +=" "+(time.getHours() < 10 ?'0' + time.getHours() : time.getHours()) + ":";
        date += (time.getUTCMinutes() < 10 ? '0' + time.getUTCMinutes() : time.getUTCMinutes()) + ":";
        date += time.getUTCSeconds() < 10 ? '0' + time.getUTCSeconds() : time.getUTCSeconds();
      }

      return date;
    },
    //时间戳转截止时间
    unixToEndTime:function(timestamp){
            var time = timestamp * 1000;
            var nowTime=new Date().getTime();
            if(time>=nowTime){
               var t=time-nowTime;
               if(t>86400000){
                  return  '剩余'+ Math.ceil(t/86400000) + '天';
               }else{
                  return  '剩余' + Math.ceil(t/3600000)+'小时';
               }
            }else{
              var t=nowTime-time;
               if(t>86400000){
                  return  '延期'+Math.ceil(t/86400000)+'天';
               }else{
                  return  '延期'+Math.ceil(t/3600000)+'小时';
               }
            }
    },
    toWxConfig:function(cb){
       let self=this;
       HttpService.getShareInfo(function(result){
            SessionStorage.set( 'shareObj', {mainUri:result.data.mainUri,shareImg:result.data.shareImg,ticket:result.data.ticket,appId:result.data.appId} );
            if(cb) cb.call(this);
       },function(){

       },{ticket:SessionStorage.get('shareObj')['ticket']});
    },
    shareWxConfig:function(data){
        let self=this;
        function preConfig(){
          var jsapi_ticket=SessionStorage.get('shareObj')['ticket'];
          var noncestr=Math.random().toString(36).substr(2, 15);
          var signUrl=window.location.href;
          var time=""+new Date().getTime();
          var timestamp=time.substr(0,10);
          var str="jsapi_ticket="+jsapi_ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+signUrl;
          var signature=hex_sha1(str);
          console.log('signUrl===='+signUrl);
          return new Promise( function(resolve, reject){
            wx.config({
                debug: false,
                appId: SessionStorage.get('shareObj')['appId'],
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','scanQRCode','hideAllNonBaseMenuItem','showAllNonBaseMenuItem'] // 功能列表，我们要使用JS-SDK的什么功能
            }); 
            resolve();
          })
        }
        return new Promise(function(resolve, reject){
         preConfig().then(function(){
            wx.ready(function(){
              console.log('shareWxConfig====');
              self.shareWxInfo(data);
              resolve();
            }); 
            let errorCount = 1;
            wx.error(function(res){
             
              if( errorCount >=2 ){
                  reject();
              }else{
                self.toWxConfig(function(){
                  errorCount ++;
                })
              }
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });         
         });
        })
    },
    hideAllNonBaseMenuItem:function(){
        setTimeout(function(){
          wx.hideAllNonBaseMenuItem();
                  console.log('hideAllNonBaseMenuItem====');
        },1500);
    },
   showAllNonBaseMenuItem:function(){
        setTimeout(function(){
             wx.showAllNonBaseMenuItem();
                  console.log('showAllNonBaseMenuItem====');
        },1500);
    },
    shareWxInfo:function(data){
      var title=data.title||'量康，持续改善人类健康水平';
      var desc=data.desc||'"为您提供全面便捷的健康筛查、专业快速的健康咨询服务"';
      var url=data.shareUrl|| SessionStorage.get('shareObj')['mainUri'];
      var shareImg=SessionStorage.get('shareObj')['shareImg'];
      console.log('shareUrl===='+url);
      console.log('shareImg===='+shareImg);
      wx.onMenuShareTimeline({
              title: title,
              desc:  desc,
              link: url,
              imgUrl: shareImg,
              success: function () {
              },
              cancel: function () {
              }
      });
      wx.onMenuShareAppMessage({
              title: title,
              desc:  desc,
              link: url,
              imgUrl: shareImg,
              success: function () {
              },
              cancel: function () {
              }
      });
      wx.onMenuShareQQ({
              title: title,
              desc:  desc,
              link: url,
              imgUrl: shareImg,
              success: function () {
              },
              cancel: function () {
              }
      });
    },
    isAndroid:function() {
        var ua = navigator.userAgent;
        var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        return isAndroid;
    },
    isIos:function() {
        var ua = navigator.userAgent;
        var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        return isiOS;
    },
    // 获取当前时间戳
    getCurrentUnix:function(){
      return Math.round(new Date() / 1000);
    }
}