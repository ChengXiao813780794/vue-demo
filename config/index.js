// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var prefixes='/';
var envObj={};
try{
     envObj= require( '../Env' );
     if(envObj.CDN_URL) prefixes=envObj.CDN_URL+'/'+envObj.P_NAME+'/';
}catch(e){
    console.log( 'error', e.message );
   //a
}
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../production/index.html'),
    assetsRoot: path.resolve(__dirname, '../production'),
    assetsSubDirectory: 'static',
    assetsPublicPath: prefixes,
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    port: process.env.PORT || 7575,
  },
  dev: {
    env: require('./dev.env'),
    port: 8181,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
