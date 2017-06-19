import Util from './Util'

export default {
      genderVal: function(value){
            if (!value) {
                Util.popup({content:"请选择性别"});
                return false;
            }
            return true;
        },
        nameVal: function( value ){
            if (!value) {
                Util.popup({content:"请输入姓名"});
                return false;
            }
            return true;
        },
        mobileVal:function(value){
            var reg = /^\d{11}$/;
            if (!value) {
                Util.popup({content:"请输入手机号"});
                return false;
            } else if (!reg.test(value)) {
                Util.popup({content:"请输入正确的手机号码"});
                return false;
            }
            return true;
        },
        birthdayVal: function( value ){
            if (!value) {
                Util.popup({content:"请选择出生日期"});
                return false;
            }
            return true;
        }

}
