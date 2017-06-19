/**
 * @author Flower
 * @description api url setting
 */
let HostName = '';
if( window.location.href.indexOf('mqcs.quantumhealth.cn')>=0 ){
    HostName = 'https://api.quantumhealth.cn/business/wap';
}else{
    HostName = 'https://apitest.quantumhealth.cn/business/wap';
}
const serverHost = '/';

const ApiUrl = {

}

export default ApiUrl;
